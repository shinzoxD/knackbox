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
} from "./catalog.js";
import { installSkill } from "./install.js";

const HELP = `knackbox — install open Agent Skills from shinzoxD/knackbox

Usage:
  knackbox add <skill> [<skill>...] [options]
  knackbox pack <pack-slug> [options]
  knackbox list [--category <name>] [--json]
  knackbox packs [--json]
  knackbox help

Options:
  --dest <dir>       Install directory for a single skill (default: agent skills root + name)
  --agent <name>     Target agent skills root: claude-code | codex | cursor | opencode
  --force            Replace an existing skill folder
  --catalog <url>    Catalog JSON URL or local path (default: GitHub raw catalog.json)
  --packs <url>      Packs JSON URL or local path
  --tarball <url>    Repo tarball URL or local .tar.gz path
  -h, --help         Show help
  -v, --version      Show version

Examples:
  npx knackbox add commit-messages
  npx knackbox add code-review security-review --agent cursor
  npx knackbox pack developer-essentials --force
  npx knackbox list --category coding

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
    case "packs":
      return runPacks(flags);
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
    console.error("Available skills:");
    for (const name of known) {
      console.error(`  ${name}`);
    }
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
  }
  return 0;
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
    if (arg === "--dest" || arg === "--agent" || arg === "--catalog" || arg === "--packs" || arg === "--tarball" || arg === "--category") {
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
