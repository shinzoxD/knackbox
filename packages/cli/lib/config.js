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

/**
 * Agent skill roots (directory that contains one folder per skill).
 * Covers the major agents listed on skills.sh plus common aliases.
 */
export const AGENT_ROOTS = {
  "claude-code": path.join(os.homedir(), ".claude", "skills"),
  claude: path.join(os.homedir(), ".claude", "skills"),
  codex: path.join(os.homedir(), ".codex", "skills"),
  cursor: path.join(os.homedir(), ".cursor", "skills"),
  opencode: path.join(os.homedir(), ".config", "opencode", "skills"),
  "open-code": path.join(os.homedir(), ".config", "opencode", "skills"),
  windsurf: path.join(os.homedir(), ".codeium", "windsurf", "skills"),
  gemini: path.join(os.homedir(), ".gemini", "skills"),
  "github-copilot": path.join(os.homedir(), ".copilot", "skills"),
  copilot: path.join(os.homedir(), ".copilot", "skills"),
  antigravity: path.join(os.homedir(), ".antigravity", "skills"),
  cline: path.join(os.homedir(), ".cline", "skills"),
  roo: path.join(os.homedir(), ".roo", "skills"),
  amp: path.join(os.homedir(), ".amp", "skills"),
  zed: path.join(os.homedir(), ".zed", "skills"),
  vscode: path.join(os.homedir(), ".vscode", "skills"),
};

/** Canonical agent ids (no aliases) for --agent * expansion. */
export const PRIMARY_AGENTS = [
  "claude-code",
  "codex",
  "cursor",
  "opencode",
  "windsurf",
  "gemini",
  "github-copilot",
  "antigravity",
  "cline",
  "roo",
];

export function resolveAgents(agentFlag) {
  if (!agentFlag || agentFlag === "claude-code") {
    return ["claude-code"];
  }
  const raw = String(agentFlag).trim();
  if (raw === "*" || raw.toLowerCase() === "all") {
    return [...PRIMARY_AGENTS];
  }
  return raw
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .map((key) => {
      if (key === "*" || key === "all") {
        return null;
      }
      if (!AGENT_ROOTS[key]) {
        throw new Error(
          `Unknown agent "${key}". Try: ${PRIMARY_AGENTS.join(", ")} (or --agent *)`
        );
      }
      // Normalize aliases to a primary-ish key for dest paths
      return key;
    })
    .filter(Boolean);
}

export function defaultSkillDest(skillName, agent = "claude-code") {
  const key = String(agent || "claude-code").toLowerCase();
  const root = AGENT_ROOTS[key] || AGENT_ROOTS["claude-code"];
  return path.join(root, skillName);
}
