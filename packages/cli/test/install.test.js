import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { findSkillMember, installSkill } from "../lib/install.js";
import { recommendJobs } from "../lib/catalog.js";
import { main } from "../lib/cli.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(here, "..");
const repoRoot = path.resolve(cliRoot, "..", "..");
const bin = path.join(cliRoot, "bin", "knackbox.js");

async function makeSkillTarball() {
  const work = await mkdtemp(path.join(os.tmpdir(), "knackbox-tar-"));
  const staging = path.join(work, "knackbox-test");
  const skillSrc = path.join(repoRoot, "skills", "coding", "commit-messages");
  const skillDest = path.join(staging, "skills", "coding", "commit-messages");
  await mkdir(skillDest, { recursive: true });

  // Copy minimal skill tree
  const { cp } = await import("node:fs/promises");
  await cp(skillSrc, skillDest, { recursive: true });

  // Add a second skill name for available-list coverage
  const other = path.join(staging, "skills", "coding", "code-review");
  await mkdir(other, { recursive: true });
  await writeFile(path.join(other, "SKILL.md"), "---\nname: code-review\n---\n# x\n", "utf8");

  const tarball = path.join(work, "skills.tar.gz");
  const tar = spawnSync(
    "tar",
    ["-czf", tarball, "-C", work, "knackbox-test"],
    { encoding: "utf8" }
  );
  if (tar.status !== 0) {
    throw new Error(`failed to create test tarball: ${tar.stderr || tar.stdout}`);
  }
  return { work, tarball, staging };
}

test("findSkillMember resolves prefixed archive paths", () => {
  const listing = [
    "knackbox-abc/skills/coding/commit-messages/SKILL.md",
    "knackbox-abc/skills/coding/commit-messages/benchmarks/prompts.json",
    "knackbox-abc/skills/coding/code-review/SKILL.md",
  ];
  const found = findSkillMember(listing, "commit-messages");
  assert.equal(found.member, "knackbox-abc/skills/coding/commit-messages");
  assert.deepEqual(found.available, ["code-review", "commit-messages"]);
});

test("installSkill extracts into dest and refuses overwrite without force", async () => {
  const { work, tarball } = await makeSkillTarball();
  const destRoot = await mkdtemp(path.join(os.tmpdir(), "knackbox-dest-"));
  const dest = path.join(destRoot, "commit-messages");

  try {
    const result = await installSkill("commit-messages", {
      dest,
      tarballSource: tarball,
      force: false,
    });
    assert.equal(result.skill, "commit-messages");
    const skillMd = await readFile(path.join(dest, "SKILL.md"), "utf8");
    assert.match(skillMd, /name:\s*commit-messages/);

    await assert.rejects(
      () =>
        installSkill("commit-messages", {
          dest,
          tarballSource: tarball,
          force: false,
        }),
      /Refusing to overwrite/
    );

    const again = await installSkill("commit-messages", {
      dest,
      tarballSource: tarball,
      force: true,
    });
    assert.equal(again.skill, "commit-messages");
  } finally {
    await rm(work, { recursive: true, force: true });
    await rm(destRoot, { recursive: true, force: true });
  }
});

test("installSkill lists available skills on unknown name", async () => {
  const { work, tarball } = await makeSkillTarball();
  const destRoot = await mkdtemp(path.join(os.tmpdir(), "knackbox-dest-"));
  try {
    await assert.rejects(
      () =>
        installSkill("not-a-real-skill", {
          dest: path.join(destRoot, "x"),
          tarballSource: tarball,
        }),
      /Unknown skill: not-a-real-skill[\s\S]*commit-messages/
    );
  } finally {
    await rm(work, { recursive: true, force: true });
    await rm(destRoot, { recursive: true, force: true });
  }
});

test("cli list reads local catalog", async () => {
  const catalogPath = path.join(repoRoot, "catalog.json");
  const code = await main(["list", "--catalog", catalogPath, "--category", "coding"]);
  assert.equal(code, 0);
});

test("cli help exits 0", async () => {
  assert.equal(await main(["help"]), 0);
  assert.equal(await main(["--help"]), 0);
});

test("cli add installs from local catalog + tarball", async () => {
  const { work, tarball } = await makeSkillTarball();
  const destRoot = await mkdtemp(path.join(os.tmpdir(), "knackbox-cli-dest-"));
  const dest = path.join(destRoot, "commit-messages");
  const catalogPath = path.join(repoRoot, "catalog.json");

  const prevQuiet = process.env.KNACKBOX_QUIET;
  process.env.KNACKBOX_QUIET = "1";
  try {
    const code = await main([
      "add",
      "commit-messages",
      "--catalog",
      catalogPath,
      "--tarball",
      tarball,
      "--dest",
      dest,
    ]);
    assert.equal(code, 0);
    const skillMd = await readFile(path.join(dest, "SKILL.md"), "utf8");
    assert.match(skillMd, /commit-messages/);
  } finally {
    process.env.KNACKBOX_QUIET = prevQuiet;
    await rm(work, { recursive: true, force: true });
    await rm(destRoot, { recursive: true, force: true });
  }
});

test("bin is executable via node", () => {
  const result = spawnSync(process.execPath, [bin, "help"], { encoding: "utf8" });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /knackbox/);
});

test("recommendJobs ranks review-a-pr for a PR query", async () => {
  const { readFile } = await import("node:fs/promises");
  const jobsDoc = JSON.parse(await readFile(path.join(repoRoot, "jobs.json"), "utf8"));
  const hits = recommendJobs(jobsDoc, "review a pull request");
  assert.ok(hits.length > 0);
  assert.equal(hits[0].job.slug, "review-a-pr");
  assert.ok(hits[0].job.skills.includes("code-review"));
});

test("cli for matches a job from local jobs.json", async () => {
  const jobsPath = path.join(repoRoot, "jobs.json");
  const code = await main(["for", "review", "a", "PR", "--jobs", jobsPath, "--json"]);
  assert.equal(code, 0);
});

test("cli search finds skills by keyword", async () => {
  const catalogPath = path.join(repoRoot, "catalog.json");
  const code = await main(["search", "commit", "--catalog", catalogPath, "--limit", "5"]);
  assert.equal(code, 0);
});

test("cli doctor runs without throwing", async () => {
  const catalogPath = path.join(repoRoot, "catalog.json");
  const code = await main(["doctor", "--catalog", catalogPath]);
  assert.equal(code, 0);
});

test("cli why exits 0", async () => {
  assert.equal(await main(["why"]), 0);
});

test("cli compare two skills", async () => {
  const catalogPath = path.join(repoRoot, "catalog.json");
  const code = await main([
    "compare",
    "commit-messages",
    "code-review",
    "--catalog",
    catalogPath,
  ]);
  assert.equal(code, 0);
});
