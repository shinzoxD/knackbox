import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { DEFAULT_DOCS_URL, DEFAULT_TARBALL_URL, defaultSkillDest } from "./config.js";
import { loadBytes } from "./http.js";

/**
 * Install one skill from the Knackbox tarball into dest.
 * Resolves archive member as skills/<category>/<skill>/ (any category).
 */
export async function installSkill(skillName, options = {}) {
  const {
    dest = defaultSkillDest(skillName, options.agent),
    force = false,
    tarballSource = DEFAULT_TARBALL_URL,
    docsUrl = DEFAULT_DOCS_URL,
    onProgress = () => {},
  } = options;

  assertSafeDest(dest);

  if (await pathExists(dest)) {
    if (!force) {
      const error = new Error(
        `Refusing to overwrite existing path: ${dest}\nUse --force to replace it.`
      );
      error.code = "EEXIST";
      throw error;
    }
  }

  const work = await fs.mkdtemp(path.join(os.tmpdir(), "knackbox-install-"));
  const archivePath = path.join(work, "knackbox.tar.gz");
  const extractDir = path.join(work, "extract");

  try {
    onProgress(`Downloading skill archive…`);
    const archive = await loadBytes(tarballSource, { label: "tarball" });
    await fs.writeFile(archivePath, archive);
    await fs.mkdir(extractDir, { recursive: true });

    onProgress(`Inspecting archive…`);
    const listing = await tarList(archivePath);
    const { member, available } = findSkillMember(listing, skillName);

    if (!member) {
      const lines = available.length
        ? ["Available skills:", ...available.map((name) => `  ${name}`)]
        : ["No skills found in archive."];
      const error = new Error(`Unknown skill: ${skillName}\n${lines.join("\n")}`);
      error.code = "ENOTFOUND";
      throw error;
    }

    onProgress(`Extracting ${member}…`);
    await tarExtract(archivePath, extractDir, member);

    const sourceDir = path.join(extractDir, ...member.split("/"));
    const skillMd = path.join(sourceDir, "SKILL.md");
    if (!(await pathExists(skillMd))) {
      throw new Error(`Archive did not contain a valid ${skillName} skill folder.`);
    }

    if (await pathExists(dest)) {
      await fs.rm(dest, { recursive: true, force: true });
    }
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.cp(sourceDir, dest, { recursive: true });

    return {
      skill: skillName,
      dest,
      member,
      docsUrl,
    };
  } finally {
    await fs.rm(work, { recursive: true, force: true }).catch(() => {});
  }
}

export function findSkillMember(listing, skillName) {
  const availableSet = new Set();
  let member = "";

  for (const entry of listing) {
    const normalized = entry.replace(/\\/g, "/").replace(/^\.\//, "");
    // GitHub codeload prefixes with knackbox-<sha>/skills/...
    const match = normalized.match(/(?:^|\/)skills\/([^/]+)\/([^/]+)\/SKILL\.md$/);
    if (!match) {
      continue;
    }
    const name = match[2];
    availableSet.add(name);
    if (name === skillName) {
      member = normalized.slice(0, -"/SKILL.md".length);
    }
  }

  return {
    member,
    available: [...availableSet].sort((a, b) => a.localeCompare(b)),
  };
}

function assertSafeDest(dest) {
  const resolved = path.resolve(dest);
  const base = path.basename(resolved);
  if (!base || base === "." || base === "..") {
    throw new Error(`Refusing unsafe destination: ${dest}`);
  }
  // Avoid writing to filesystem root-ish paths accidentally
  const parent = path.dirname(resolved);
  if (parent === resolved) {
    throw new Error(`Refusing unsafe destination: ${dest}`);
  }
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function tarList(archivePath) {
  return runTar(["-tzf", archivePath]).then((stdout) =>
    stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
  );
}

function tarExtract(archivePath, outDir, member) {
  // member uses forward slashes as produced by tar -tzf
  return runTar(["-xzf", archivePath, "-C", outDir, member]).then(() => undefined);
}

function runTar(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("tar", args, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      if (error && error.code === "ENOENT") {
        reject(
          new Error(
            "The system `tar` command was not found. Install tar (or use Git for Windows) and retry."
          )
        );
        return;
      }
      reject(error);
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout);
        return;
      }
      reject(new Error(`tar ${args.join(" ")} failed (${code}): ${stderr || stdout}`));
    });
  });
}
