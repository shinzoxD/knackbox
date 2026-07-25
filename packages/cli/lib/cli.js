import {
  AGENT_ROOTS,
  DEFAULT_CATALOG_URL,
  DEFAULT_DOCS_URL,
  DEFAULT_PACKS_URL,
  DEFAULT_TARBALL_URL,
  PRIMARY_AGENTS,
  SITE_URL,
  defaultSkillDest,
  resolveAgents,
} from "./config.js";
import {
  fetchCatalog,
  fetchPacks,
  findPack,
  findSkill,
  formatSkillRow,
  listSkillNames,
  searchSkills,
  suggestSkills,
} from "./catalog.js";
import { installSkill } from "./install.js";
import { access } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";

const HELP = `knackbox — quality-first Agent Skills (better defaults than a popularity board)

Usage:
  knackbox add <skill> [<skill>...] [options]
  knackbox pack <pack-slug> [options]
  knackbox list [--category <name>] [--sort tier|name|context|score] [--json]
  knackbox search <query> [--limit N] [--json]
  knackbox compare <skill-a> <skill-b>
  knackbox packs [--json]
  knackbox doctor
  knackbox why
  knackbox help

Options:
  --dest <dir>       Install path for a single skill (implies one agent)
  --agent <name>     claude-code|codex|cursor|opencode|windsurf|gemini|…
                     Use --agent * or comma lists: codex,cursor
  --force            Replace an existing skill folder
  --catalog <url>    Catalog JSON URL or local path
  --packs <url>      Packs JSON URL or local path
  --tarball <url>    Repo tarball URL or local .tar.gz path
  --sort <key>       list sort: tier (default) | name | context | score
  --limit <n>        Max search results (default 15)
  -h, --help         Show help
  -v, --version      Show version

Quality > installs:
  Every skill ships benchmarks + trust digests. Scores stay "—" until measured.
  See ${SITE_URL}/why/ and STANDARD.md

Examples:
  npx knackbox add commit-messages --agent codex,cursor
  npx knackbox add security-review --agent *
  npx knackbox pack developer-essentials --force
  npx knackbox list --sort tier
  npx knackbox compare code-review security-review
  npx knackbox why

Docs: ${DEFAULT_DOCS_URL}
Site: ${SITE_URL}
`;

export async function main(argv) {
  const { command, positionals, flags } = parseArgs(argv);

  if (flags.version) {
    console.log(await readVersion());
    return 0;
  }

  if (!command || command === "help" || flags.help) {
    console.log(HELP);
    return 0;
  }

  switch (command) {
    case "add":
      return runAdd(positionals, flags);
    case "pack":
      return runPack(positionals, flags);
    case "list":
      return runList(flags);
    case "search":
      return runSearch(positionals, flags);
    case "compare":
      return runCompare(positionals, flags);
    case "packs":
      return runPacks(flags);
    case "doctor":
      return runDoctor(flags);
    case "why":
      return runWhy();
    default:
      console.error(`Unknown command: ${command}`);
      console.error(`Run \`knackbox help\` for usage.`);
      return 2;
  }
}

async function runAdd(skillNames, flags) {
  if (skillNames.length === 0) {
    console.error("Usage: knackbox add <skill> [<skill>...]");
    return 2;
  }

  if (flags.dest && skillNames.length > 1) {
    console.error("--dest can only be used when installing a single skill");
    return 2;
  }

  let agents;
  try {
    agents = flags.dest ? ["claude-code"] : resolveAgents(flags.agent);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }

  if (flags.dest && flags.agent && flags.agent !== "claude-code" && !String(flags.agent).includes(",")) {
    // dest overrides agent root; still allow explicit dest
    agents = ["custom"];
  }

  const catalog = await fetchCatalog(flags.catalog || DEFAULT_CATALOG_URL);
  const known = listSkillNames(catalog);
  const missing = skillNames.filter((name) => !findSkill(catalog, name));
  if (missing.length) {
    console.error(`Unknown skill(s): ${missing.join(", ")}`);
    for (const bad of missing) {
      const suggestions = suggestSkills(catalog, bad);
      if (suggestions.length) {
        console.error(`  Did you mean for "${bad}": ${suggestions.join(", ")}?`);
      }
    }
    console.error(`Browse all: knackbox list  (${known.length} skills)`);
    console.error(`Search: knackbox search <words>`);
    return 1;
  }

  for (const name of skillNames) {
    const skill = findSkill(catalog, name);
    if (!skill?.path) {
      console.error(`Catalog entry for ${name} is missing path`);
      return 1;
    }
  }

  let failures = 0;
  for (const name of skillNames) {
    const skill = findSkill(catalog, name);
    for (const agent of agents) {
      const dest =
        flags.dest ||
        (agent === "custom" ? flags.dest : defaultSkillDest(name, agent));
      try {
        const result = await installSkill(name, {
          dest,
          force: Boolean(flags.force),
          agent,
          tarballSource: flags.tarball || DEFAULT_TARBALL_URL,
          docsUrl: DEFAULT_DOCS_URL,
          onProgress: (msg) => {
            if (process.env.KNACKBOX_QUIET === "1") {
              return;
            }
            console.error(`→ [${agent}] ${msg}`);
          },
        });
        const tier = skill?.tier || "community";
        const digest = skill?.content_digest
          ? String(skill.content_digest).slice(0, 12)
          : "—";
        console.log(
          `Installed ${result.skill} [${tier}] digest:${digest}… → ${result.dest}`
        );
      } catch (error) {
        failures += 1;
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to install ${name} for ${agent}: ${message}`);
      }
    }
  }

  if (failures === 0) {
    console.log(`Docs: ${DEFAULT_DOCS_URL}`);
    console.log(`Quality leaderboard: ${SITE_URL}/skills/`);
    console.log(`Why Knackbox: ${SITE_URL}/why/`);
  }
  return failures === 0 ? 0 : 1;
}

async function runPack(positionals, flags) {
  const slug = positionals[0];
  if (!slug) {
    console.error("Usage: knackbox pack <pack-slug>");
    return 2;
  }

  const packsDoc = await fetchPacks(flags.packs || DEFAULT_PACKS_URL);
  const pack = findPack(packsDoc, slug);
  if (!pack) {
    console.error(`Unknown pack: ${slug}`);
    console.error("Available packs:");
    for (const entry of packsDoc.packs) {
      console.error(`  ${entry.slug.padEnd(24)} ${entry.name}`);
    }
    return 1;
  }

  console.error(`Pack ${pack.slug}: ${pack.skills.length} skill(s)`);
  return runAdd(pack.skills, { ...flags, dest: undefined });
}

async function runList(flags) {
  const catalog = await fetchCatalog(flags.catalog || DEFAULT_CATALOG_URL);
  let skills = [...catalog.skills];
  if (flags.category) {
    const category = String(flags.category).toLowerCase();
    skills = skills.filter((skill) => skill.category === category);
  }
  const sortKey = String(flags.sort || "tier").toLowerCase();
  skills.sort((a, b) => compareSkills(a, b, sortKey));

  if (flags.json) {
    console.log(JSON.stringify(skills, null, 2));
    return 0;
  }

  const suiteN = skills.filter((s) => s.has_benchmarks).length;
  console.log(
    `${skills.length} skill(s)${flags.category ? ` in ${flags.category}` : ""} · sorted by ${sortKey} · suites ${suiteN}/${skills.length}`
  );
  console.log(
    `${"NAME".padEnd(32)} ${"TIER".padEnd(10)} ${"CAT".padEnd(12)} ${"CTX".padStart(5)} ${"SUITE".padEnd(6)} SCORE`
  );
  for (const skill of skills) {
    const ctx = String(skill.context_tokens ?? "—").padStart(5);
    const suite = skill.has_benchmarks ? "yes" : "no";
    const score =
      skill.metrics?.skill_score == null ? "—" : String(skill.metrics.skill_score);
    console.log(
      `${skill.name.padEnd(32)} ${(skill.tier || "community").padEnd(10)} ${(skill.category || "?").padEnd(12)} ${ctx} ${suite.padEnd(6)} ${score}`
    );
  }
  console.log(`\nPopularity boards rank installs. We rank tier + evidence. ${SITE_URL}/why/`);
  return 0;
}

function compareSkills(a, b, sortKey) {
  const tierRank = { core: 0, verified: 1, community: 2 };
  if (sortKey === "name") {
    return a.name.localeCompare(b.name);
  }
  if (sortKey === "context") {
    return (a.context_tokens || 0) - (b.context_tokens || 0) || a.name.localeCompare(b.name);
  }
  if (sortKey === "score") {
    const sa = a.metrics?.skill_score;
    const sb = b.metrics?.skill_score;
    if (sa == null && sb == null) return a.name.localeCompare(b.name);
    if (sa == null) return 1;
    if (sb == null) return -1;
    return sb - sa || a.name.localeCompare(b.name);
  }
  // tier default
  const tr =
    (tierRank[a.tier] ?? 9) - (tierRank[b.tier] ?? 9) || a.name.localeCompare(b.name);
  return tr;
}

async function runCompare(positionals, flags) {
  const [aName, bName] = positionals;
  if (!aName || !bName) {
    console.error("Usage: knackbox compare <skill-a> <skill-b>");
    return 2;
  }
  const catalog = await fetchCatalog(flags.catalog || DEFAULT_CATALOG_URL);
  const a = findSkill(catalog, aName);
  const b = findSkill(catalog, bName);
  if (!a || !b) {
    console.error(`Unknown skill: ${!a ? aName : bName}`);
    return 1;
  }
  const fields = [
    ["name", a.name, b.name],
    ["tier", a.tier, b.tier],
    ["category", a.category, b.category],
    ["context_tokens", a.context_tokens, b.context_tokens],
    ["has_benchmarks", a.has_benchmarks, b.has_benchmarks],
    ["security_profile", a.security_profile, b.security_profile],
    ["skill_score", a.metrics?.skill_score ?? "—", b.metrics?.skill_score ?? "—"],
    ["trigger_f1", a.metrics?.trigger_accuracy ?? "—", b.metrics?.trigger_accuracy ?? "—"],
    ["uplift", a.metrics?.quality_uplift ?? "—", b.metrics?.quality_uplift ?? "—"],
    ["digest", shortDigest(a.content_digest), shortDigest(b.content_digest)],
    ["permissions", fmtPerms(a), fmtPerms(b)],
  ];
  console.log(`Compare (quality fields — not install counts)\n`);
  console.log(`${"FIELD".padEnd(18)} ${String(a.name).padEnd(22)} ${b.name}`);
  for (const [label, left, right] of fields) {
    console.log(`${label.padEnd(18)} ${String(left).padEnd(22)} ${right}`);
  }
  console.log(`\nInstall: npx knackbox add ${a.name}  |  npx knackbox add ${b.name}`);
  return 0;
}

function shortDigest(d) {
  return d ? `${String(d).slice(0, 12)}…` : "—";
}

function fmtPerms(skill) {
  const p = skill.permissions || {};
  return `n=${p.network || "?"} fs=${p.filesystem || "?"} x=${p.execution || "?"}`;
}

function runWhy() {
  console.log(`Knackbox vs popularity boards (skills.sh)
==========================================
skills.sh answers: what did people download?
Knackbox answers:  what is reviewed, suite-covered, and measurable?

| Dimension     | skills.sh              | Knackbox                          |
|---------------|------------------------|-----------------------------------|
| Ranking       | Installs / trending    | Tier + benchmarks + metrics       |
| Quality gate  | Repo author's choice    | CI + STANDARD.md review           |
| Benchmarks    | Optional               | Required for every skill          |
| Scores        | Popularity             | Null until measured (honest —)    |
| Trust         | Varies                 | Digest + permissions every skill  |
| Jobs          | Per package            | Curated packs + recipes           |

Compatible: npx skills add shinzoxD/knackbox --skill commit-messages
Better UX:  npx knackbox pack developer-essentials
            npx knackbox list --sort tier
            npx knackbox compare code-review security-review

Read more: ${SITE_URL}/why/
Standard:  https://github.com/shinzoxD/knackbox/blob/main/STANDARD.md
`);
  return 0;
}

async function runPacks(flags) {
  const packsDoc = await fetchPacks(flags.packs || DEFAULT_PACKS_URL);
  if (flags.json) {
    console.log(JSON.stringify(packsDoc.packs, null, 2));
    return 0;
  }
  console.log(`${packsDoc.packs.length} pack(s)`);
  for (const pack of packsDoc.packs) {
    console.log(`\n${pack.slug} — ${pack.name}`);
    console.log(`  ${pack.description}`);
    console.log(`  skills: ${pack.skills.join(", ")}`);
    console.log(`  install: npx knackbox pack ${pack.slug}`);
  }
  return 0;
}

async function runSearch(positionals, flags) {
  const query = positionals.join(" ").trim();
  if (!query) {
    console.error("Usage: knackbox search <query>");
    return 2;
  }
  const catalog = await fetchCatalog(flags.catalog || DEFAULT_CATALOG_URL);
  const limit = flags.limit ? Number(flags.limit) : 15;
  const hits = searchSkills(catalog, query, {
    limit: Number.isFinite(limit) && limit > 0 ? limit : 15,
  });

  if (flags.json) {
    console.log(JSON.stringify(hits, null, 2));
    return hits.length ? 0 : 1;
  }

  if (!hits.length) {
    console.error(`No skills matched ${JSON.stringify(query)}.`);
    console.error("Try: knackbox list");
    return 1;
  }

  console.log(`${hits.length} match(es) for ${JSON.stringify(query)}`);
  console.log(`${"NAME".padEnd(32)} ${"TIER".padEnd(10)} CATEGORY`);
  for (const skill of hits) {
    console.log(formatSkillRow(skill));
  }
  console.log(`\nInstall: npx knackbox add ${hits[0].name}`);
  return 0;
}

async function runDoctor(flags) {
  const checks = [];
  const nodeVersion = process.versions.node;
  checks.push({
    ok: true,
    name: "node",
    detail: `v${nodeVersion}`,
  });

  const tar = spawnSync("tar", ["--version"], { encoding: "utf8", windowsHide: true });
  checks.push({
    ok: tar.status === 0,
    name: "tar",
    detail: tar.status === 0 ? "available" : "missing — install tar (or Git for Windows)",
  });

  for (const agent of PRIMARY_AGENTS) {
    const root = AGENT_ROOTS[agent];
    let exists = false;
    try {
      await access(root);
      exists = true;
    } catch {
      exists = false;
    }
    checks.push({
      ok: true,
      name: `agent:${agent}`,
      detail: exists ? `skills root exists → ${root}` : `skills root not created yet → ${root}`,
    });
  }

  try {
    const catalog = await fetchCatalog(flags.catalog || DEFAULT_CATALOG_URL);
    checks.push({
      ok: true,
      name: "catalog",
      detail: `${catalog.skills.length} skills from ${flags.catalog || DEFAULT_CATALOG_URL}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    checks.push({ ok: false, name: "catalog", detail: message });
  }

  let failed = 0;
  console.log("knackbox doctor");
  console.log(`platform: ${process.platform} ${os.arch()}  home: ${os.homedir()}`);
  for (const check of checks) {
    const mark = check.ok ? "ok " : "ERR";
    if (!check.ok) failed += 1;
    console.log(`[${mark}] ${check.name.padEnd(16)} ${check.detail}`);
  }
  console.log(
    failed
      ? `\n${failed} check(s) failed. Fix the errors above, then retry install.`
      : "\nAll critical checks passed. Try: npx knackbox add commit-messages"
  );
  return failed ? 1 : 0;
}

function parseArgs(argv) {
  const flags = {
    help: false,
    version: false,
    force: false,
    json: false,
    dest: undefined,
    agent: undefined,
    catalog: undefined,
    packs: undefined,
    tarball: undefined,
    category: undefined,
    limit: undefined,
    sort: undefined,
  };
  const positionals = [];
  let command;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") {
      positionals.push(...argv.slice(i + 1));
      break;
    }
    if (arg === "-h" || arg === "--help") {
      flags.help = true;
      continue;
    }
    if (arg === "-v" || arg === "--version") {
      flags.version = true;
      continue;
    }
    if (arg === "--force") {
      flags.force = true;
      continue;
    }
    if (arg === "--json") {
      flags.json = true;
      continue;
    }
    if (
      arg === "--dest" ||
      arg === "--agent" ||
      arg === "--catalog" ||
      arg === "--packs" ||
      arg === "--tarball" ||
      arg === "--category" ||
      arg === "--limit" ||
      arg === "--sort"
    ) {
      const value = argv[i + 1];
      if (!value || value.startsWith("-")) {
        throw new Error(`Missing value for ${arg}`);
      }
      const key = arg.slice(2);
      flags[key] = value;
      i += 1;
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (!command) {
      command = arg;
    } else {
      positionals.push(arg);
    }
  }

  return { command, positionals, flags };
}

async function readVersion() {
  try {
    const { readFile } = await import("node:fs/promises");
    const { fileURLToPath } = await import("node:url");
    const { dirname, join } = await import("node:path");
    const here = dirname(fileURLToPath(import.meta.url));
    const raw = await readFile(join(here, "..", "package.json"), "utf8");
    return JSON.parse(raw).version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}
