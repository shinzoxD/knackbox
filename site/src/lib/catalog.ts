import { readFileSync } from "node:fs";
import { join } from "node:path";
import catalogData from "../../../catalog.json";
import jobsData from "../../../jobs.json";
import packsData from "../../../packs.json";
import { githubFileLinkBase, githubOrg, githubRepoUrl } from "./github";
import { renderMarkdown, stripFrontmatter } from "./markdown";

export { githubOrg, githubRepoUrl } from "./github";

declare const __REPO_ROOT__: string;

export type Tier = "core" | "verified" | "community";

export type SkillMetrics = {
  efficiency: number | null;
  trigger_accuracy: number | null;
  quality_uplift: number | null;
  skill_score: number | null;
  installs_30d: number | null;
  measured_at?: string | null;
  model?: string | null;
};

export type Skill = {
  name: string;
  description: string;
  category: string;
  path: string;
  tier: Tier;
  updated: string;
  context_tokens: number;
  reference_tokens: number;
  has_scripts: boolean;
  has_benchmarks: boolean;
  source_url: string;
  license: string;
  compatibility: string;
  content_digest: string;
  security_profile: "instructions-only" | "includes-scripts";
  permissions: {
    network: "none" | "optional" | "required";
    filesystem: "none" | "read" | "read-write";
    execution: "none" | "optional" | "required";
  };
  metrics: SkillMetrics;
};

type Catalog = {
  generated: string;
  score_version: string;
  count: number;
  skills: Skill[];
};

export type SkillPack = {
  slug: string;
  name: string;
  description: string;
  skills: string[];
};

export type JobGuide = {
  slug: string;
  title: string;
  blurb: string;
  keywords: string[];
  skills: string[];
};

const repoRoot = __REPO_ROOT__;

export const catalog = catalogData as Catalog;
export const packs = packsData.packs as SkillPack[];
export const jobs = (jobsData as { jobs: JobGuide[] }).jobs;
export const allSkills = [...catalog.skills].sort((a, b) =>
  a.tier === b.tier
    ? a.name.localeCompare(b.name)
    : tierRank(a.tier) - tierRank(b.tier)
);
export const categories = [...new Set(allSkills.map((skill) => skill.category))].sort();
export const tiers: Tier[] = ["core", "verified", "community"];
/** Primary Knackbox npm CLI (packages/cli). */
export const knackboxCliCommand = "npx knackbox add";
/** Ecosystem Skills CLI. */
export const installCommand = `npx skills add ${githubOrg}/knackbox --skill`;
export const legacyInstallCommand =
  `curl -fsSL https://raw.githubusercontent.com/${githubOrg}/knackbox/main/install.sh | bash -s`;

export function byTier(tier: Tier): Skill[] {
  return allSkills.filter((skill) => skill.tier === tier);
}

export function byCategory(category: string): Skill[] {
  return allSkills.filter((skill) => skill.category === category);
}

export function getSkill(category: string, name: string): Skill | undefined {
  return allSkills.find((skill) => skill.category === category && skill.name === name);
}

export function tierRank(tier: Tier): number {
  return { core: 0, verified: 1, community: 2 }[tier];
}

export function fmt(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "\u2014";
  }
  return String(value);
}

export function fmtPercent(value: number | null | undefined): string {
  return value === null || value === undefined ? "\u2014" : `${value.toFixed(1)}%`;
}

export function skillUrl(skill: Skill): string {
  return `/skills/${skill.category}/${skill.name}/`;
}

export function relatedSkills(skill: Skill, limit = 6): Skill[] {
  const scores = new Map<string, number>();
  const bump = (name: string, amount: number) => {
    if (name === skill.name) {
      return;
    }
    scores.set(name, (scores.get(name) || 0) + amount);
  };
  for (const job of jobs) {
    if (job.skills.includes(skill.name)) {
      for (const name of job.skills) {
        bump(name, 8);
      }
    }
  }
  for (const pack of packs) {
    if (pack.skills.includes(skill.name)) {
      for (const name of pack.skills) {
        bump(name, 3);
      }
    }
  }
  for (const other of allSkills) {
    if (other.category === skill.category) {
      bump(other.name, 1);
    }
  }
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => allSkills.find((entry) => entry.name === name))
    .filter((entry): entry is Skill => Boolean(entry))
    .slice(0, limit);
}

export function getSkillHtml(skill: Skill): string {
  const markdown = readFileSync(join(repoRoot, skill.path, "SKILL.md"), "utf-8");
  return renderMarkdown(stripFrontmatter(markdown), {
    linkBase: githubFileLinkBase(`${skill.path}/SKILL.md`),
    demoteHeadings: true,
  });
}

export function getRepoMarkdownHtml(
  fileName: string,
  options: { demoteHeadings?: boolean } = {}
): string {
  const markdown = readFileSync(join(repoRoot, fileName), "utf-8");
  return renderMarkdown(markdown, {
    linkBase: githubFileLinkBase(fileName),
    demoteHeadings: options.demoteHeadings,
  });
}

export function tierCounts(): Record<Tier, number> {
  return {
    core: byTier("core").length,
    verified: byTier("verified").length,
    community: byTier("community").length,
  };
}
