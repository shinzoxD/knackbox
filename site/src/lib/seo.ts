import { allSkills, categories, githubRepoUrl, type Skill } from "./catalog";

/** Canonical production origin for the static catalog site. */
export const siteUrl = "https://knackbox.pages.dev";

export const defaultTitle =
  "Knackbox — Agent Skills Ranked by Quality, Not Installs";
export const defaultDescription =
  "Quality-first Agent Skills for Claude Code, Codex, Cursor, and OpenCode. Mandatory benchmarks, trust digests, honest metrics — better defaults than a popularity board.";

export const defaultKeywords = [
  "agent skills",
  "Claude Code skills",
  "Codex skills",
  "Cursor skills",
  "OpenCode skills",
  "SKILL.md",
  "AI agent library",
  "Claude skills",
  "AI coding skills",
  "knackbox",
].join(", ");

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteUrl).toString();
}

export function withSiteTitle(pageTitle: string): string {
  const trimmed = pageTitle.trim();
  if (!trimmed || trimmed === "Knackbox") {
    return defaultTitle;
  }
  if (/knackbox/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed} | Knackbox`;
}

export function truncateMeta(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) {
    return clean;
  }
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function skillMetaDescription(skill: Skill): string {
  return truncateMeta(
    `${skill.description} Install the ${skill.name} Agent Skill for Claude Code, Codex, Cursor, and compatible runtimes. Category: ${skill.category}. Tier: ${skill.tier}.`
  );
}

export function categoryMetaDescription(category: string, count: number): string {
  return truncateMeta(
    `Browse ${count} ${category} Agent Skills in Knackbox — open SKILL.md packages for AI coding agents with install commands, benchmarks, and source on GitHub.`
  );
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Knackbox",
    alternateName: ["Knackbox Agent Skills", "knackbox"],
    url: siteUrl,
    description: defaultDescription,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Knackbox",
      url: siteUrl,
      sameAs: [githubRepoUrl],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/skills/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareSourceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Knackbox",
    description: defaultDescription,
    url: siteUrl,
    codeRepository: githubRepoUrl,
    programmingLanguage: ["Markdown", "Python", "TypeScript"],
    runtimePlatform: ["Claude Code", "Codex", "Cursor", "OpenCode", "Agent Skills"],
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    keywords: defaultKeywords,
    isAccessibleForFree: true,
  };
}

export function skillJsonLd(skill: Skill, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${skill.name} — Agent Skill`,
    name: skill.name,
    description: skill.description,
    url: pageUrl,
    dateModified: skill.updated,
    author: {
      "@type": "Organization",
      name: "Knackbox",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Knackbox",
      url: siteUrl,
    },
    mainEntityOfPage: pageUrl,
    articleSection: skill.category,
    keywords: [skill.name, skill.category, "agent skills", "SKILL.md", skill.tier].join(", "),
    license: skill.license,
    isAccessibleForFree: true,
    codeRepository: skill.source_url,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(
  name: string,
  description: string,
  entries: { name: string; path: string; description?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: absoluteUrl(entry.path),
      description: entry.description,
    })),
  };
}

export function catalogStatsLine(): string {
  return `${allSkills.length} skills across ${categories.length} categories`;
}
