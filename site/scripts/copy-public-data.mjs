import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const siteDir = dirname(fileURLToPath(import.meta.url));
const root = join(siteDir, "..", "..");
const publicDir = join(siteDir, "..", "public");

mkdirSync(publicDir, { recursive: true });
copyFileSync(join(root, "catalog.json"), join(publicDir, "catalog.json"));
copyFileSync(join(root, "packs.json"), join(publicDir, "packs.json"));
copyFileSync(join(root, "jobs.json"), join(publicDir, "jobs.json"));

const catalog = JSON.parse(readFileSync(join(root, "catalog.json"), "utf8"));
const packs = JSON.parse(readFileSync(join(root, "packs.json"), "utf8"));
const site = "https://knackbox.pages.dev";
const skills = Array.isArray(catalog.skills) ? catalog.skills : [];
const categories = [...new Set(skills.map((skill) => skill.category))].sort();

const llms = `# Knackbox

> Open, auditable library of Agent Skills (SKILL.md) for Claude Code, Codex, Cursor, OpenCode, and any runtime that loads the Agent Skills format.

Knackbox ranks skills with independent measurement columns (trigger accuracy, quality uplift, context cost) and ships every skill with a benchmark suite. Source of truth is the GitHub repository; this site is a static catalog.

- Catalog version: ${catalog.score_version ?? "v0"}
- Generated: ${catalog.generated ?? "unknown"}
- Skills: ${skills.length} across ${categories.length} categories

## Site

- Home: ${site}/
- Start with a job: ${site}/start/
- Skill leaderboard: ${site}/skills/
- Starter packs: ${site}/packs/
- Install docs: ${site}/docs/
- Metrics methodology: ${site}/docs/metrics/
- FAQ: ${site}/faq/
- Why Knackbox: ${site}/why/
- Changelog: ${site}/changelog/
- Contribute: ${site}/contribute/
- Machine-readable catalog: ${site}/catalog.json
- Starter packs JSON: ${site}/packs.json
- Job guides JSON: ${site}/jobs.json
- Full skill list for crawlers: ${site}/llms-full.txt

## Repository

- GitHub: https://github.com/shinzoxD/knackbox
- License: Apache-2.0
- Skills tree: https://github.com/shinzoxD/knackbox/tree/main/skills

## Install

\`\`\`bash
npx knackbox add commit-messages
npx skills add shinzoxD/knackbox --skill commit-messages
\`\`\`

Dependency-free:

\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/shinzoxD/knackbox/main/install.sh | bash -s commit-messages
\`\`\`

## Categories

${categories.join(", ")}

## Starter packs

${(packs.packs ?? []).map((pack) => `- ${pack.name} (\`${pack.slug}\`): ${pack.description}`).join("\n")}

## Optional

- Sitemap: ${site}/sitemap-index.xml
- Full skill pages follow \`/skills/{category}/{name}/\`
`;

const byCategory = new Map();
for (const skill of skills) {
  if (!byCategory.has(skill.category)) {
    byCategory.set(skill.category, []);
  }
  byCategory.get(skill.category).push(skill);
}

const fullSections = [...byCategory.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([category, entries]) => {
    const lines = entries
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((skill) => {
        const url = `${site}/skills/${skill.category}/${skill.name}/`;
        const desc = String(skill.description ?? "").replace(/\s+/g, " ").trim();
        return `- [${skill.name}](${url}) (${skill.tier}): ${desc}`;
      });
    return `## ${category}\n\n${lines.join("\n")}`;
  })
  .join("\n\n");

const llmsFull = `# Knackbox — full Agent Skills catalog

> ${skills.length} SKILL.md packages for Claude Code, Codex, Cursor, and OpenCode.

This file is generated from catalog.json for AI crawlers. Prefer the live pages for humans.

- Home: ${site}/
- Leaderboard: ${site}/skills/
- Compact index: ${site}/llms.txt
- JSON: ${site}/catalog.json
- GitHub: https://github.com/shinzoxD/knackbox

Install one skill: \`npx knackbox add <name>\`

${fullSections}
`;

writeFileSync(join(publicDir, "llms.txt"), llms, "utf8");
writeFileSync(join(publicDir, "llms-full.txt"), llmsFull, "utf8");
console.log("Copied catalog.json, packs.json, jobs.json; wrote llms.txt and llms-full.txt");
