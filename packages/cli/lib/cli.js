import {
  DEFAULT_CATALOG_URL,
  DEFAULT_DOCS_URL,
  DEFAULT_PACKS_URL,
  DEFAULT_TARBALL_URL,
  SITE_URL,
  defaultSkillDest,
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
import { AGENT_ROOTS } from "./config.js";
import { installSkill } from "./install.js";
import { access } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";

const HELP = `knackbox — install open Agent Skills from shinzoxD/knackbox

Usage:
  knackbox add <skill> [<skill>...] [options]
  knackbox pack <pack-slug> [options]
  knackbox list [--category <name>] [--json]
  knackbox search <query> [--limit N] [--json]
  knackbox packs [--json]
  knackbox doctor
  knackbox help

Options:
  --dest <dir>       Install directory for a single skill (default: agent skills root + name)
  --agent <name>     Target agent skills root: claude-code | codex | cursor | opencode
  --force            Replace an existing skill folder
  --catalog <url>    Catalog JSON URL or local path (default: GitHub raw catalog.json)
  --packs <url>      Packs JSON URL or local path
  --tarball <url>    Repo tarball URL or local .tar.gz path
  --limit <n>        Max search results (default 15)
  -h, --help         Show help
  -v, --version      Show version

Examples:
  npx knackbox add commit-messages
  npx knackbox add code-review security-review --agent cursor
  npx knackbox pack developer-essentials --force
  npx knackbox search "security terraform"
  npx knackbox list --category coding
  npx knackbox doctor

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
    case "packs":
      return runPacks(flags);
    case "doctor":
      return runDoctor(flags);
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

  // Validate paths against catalog so we fail fast before download when possible.
  for (const name of skillNames) {
    const skill = findSkill(catalog, name);
    if (!skill?.path) {
      console.error(`Catalog entry for ${name} is missing path`);
      return 1;
    }
  }

  let failures = 0;
  for (const name of skillNames) {
    const dest = flags.dest || defaultSkillDest(name, flags.agent);
    try {
      const result = await installSkill(name, {
        dest,
        force: Boolean(flags.force),
        agent: flags.agent,
        tarballSource: flags.tarball || DEFAULT_TARBALL_URL,
        docsUrl: DEFAULT_DOCS_URL,
        onProgress: (msg) => {
          if (process.env.KNACKBOX_QUIET === "1") {
            return;
          }
          console.error(`→ ${msg}`);
        },
      });
      console.log(`Installed ${result.skill} to ${result.dest}`);
      console.log(`Docs: ${result.docsUrl}`);
      console.log(`Catalog: ${SITE_URL}/skills/`);
    } catch (error) {
      failures += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to install ${name}: ${message}`);
    }
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
  skills.sort((a, b) => a.name.localeCompare(b.name));

  if (flags.json) {
    console.log(JSON.stringify(skills, null, 2));
    return 0;
  }

  console.log(`${skills.length} skill(s)${flags.category ? ` in ${flags.category}` : ""}`);
  console.log(`${"NAME".padEnd(32)} ${"TIER".padEnd(10)} CATEGORY`);
  for (const skill of skills) {
    console.log(formatSkillRow(skill));
  }
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

  for (const [agent, root] of Object.entries(AGENT_ROOTS)) {
    // de-dupe identical roots
    if (agent === "claude" || agent === "open-code") continue;
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
      arg === "--limit"
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
