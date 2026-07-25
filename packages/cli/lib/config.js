import os from "node:os";
import path from "node:path";

export const ORG = "shinzoxD";
export const REPO = "knackbox";
export const BRANCH = "main";

export const DEFAULT_CATALOG_URL =
  process.env.KNACKBOX_CATALOG_URL ||
  `https://raw.githubusercontent.com/${ORG}/${REPO}/${BRANCH}/catalog.json`;

export const DEFAULT_PACKS_URL =
  process.env.KNACKBOX_PACKS_URL ||
  `https://raw.githubusercontent.com/${ORG}/${REPO}/${BRANCH}/packs.json`;

export const DEFAULT_TARBALL_URL =
  process.env.KNACKBOX_TARBALL_URL ||
  `https://codeload.github.com/${ORG}/${REPO}/tar.gz/refs/heads/${BRANCH}`;

export const DEFAULT_DOCS_URL =
  process.env.KNACKBOX_DOCS_URL ||
  `https://github.com/${ORG}/${REPO}#install-a-skill`;

export const SITE_URL = process.env.KNACKBOX_SITE_URL || "https://knackbox.pages.dev";

/** Agent skill roots (directory that contains one folder per skill). */
export const AGENT_ROOTS = {
  "claude-code": path.join(os.homedir(), ".claude", "skills"),
  claude: path.join(os.homedir(), ".claude", "skills"),
  codex: path.join(os.homedir(), ".codex", "skills"),
  cursor: path.join(os.homedir(), ".cursor", "skills"),
  opencode: path.join(os.homedir(), ".config", "opencode", "skills"),
  "open-code": path.join(os.homedir(), ".config", "opencode", "skills"),
};

export function defaultSkillDest(skillName, agent = "claude-code") {
  const key = String(agent || "claude-code").toLowerCase();
  const root = AGENT_ROOTS[key] || AGENT_ROOTS["claude-code"];
  return path.join(root, skillName);
}
