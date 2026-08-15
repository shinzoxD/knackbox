import { allSkills, categories, githubRepoUrl, type Skill } from "./catalog";

/** Canonical production origin for the static catalog site. */
export const siteUrl = "https://knackbox.pages.dev";

export const defaultTitle =
  "Knackbox — Agent Skills for Claude Code, Codex, and Cursor";
export const defaultDescription =
  "Open SKILL.md library of Agent Skills for Claude Code, Codex, Cursor, and OpenCode. Ranked by benchmarks, review, and honest metrics — not install counts.";

export const defaultKeywords = [
  "agent skills",
  "Claude Code skills",
  "Claude Code SKILL.md",
  "install Claude Code skills",
  "Codex skills",
  "Cursor skills",
  "OpenCode skills",
  "SKILL.md",
  "AI agent skills library",
  "Claude skills",
  "AI coding skills",
  "skills.sh alternative",
  "npx knackbox",
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
    `${skill.description} Install with npx knackbox add ${skill.name}. Open SKILL.md Agent Skill for Claude Code, Codex, Cursor, and OpenCode. Category: ${skill.category}. Tier: ${skill.tier}.`
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

export const defaultFaqs: { question: string; answer: string }[] = [
  {
    question: "What is Knackbox?",
    answer:
      "Knackbox is an open library of Agent Skills (SKILL.md folders) for Claude Code, Codex, Cursor, OpenCode, and any runtime that loads the Agent Skills format. Skills are ranked by review, benchmark coverage, and measured quality — not install counts.",
  },
  {
    question: "What are Agent Skills?",
    answer:
      "Agent Skills are portable folders with a SKILL.md file of YAML frontmatter plus instructions. Compatible agents load a skill when the description matches the user's task — commits, reviews, SQL, incidents, writing, and more.",
  },
  {
    question: "How is Knackbox different from skills.sh?",
    answer:
      "skills.sh is a discovery directory ranked by popularity. Knackbox is a curated quality layer on the same open format: every skill ships a benchmark suite, a content digest, declared permissions, and honest empty scores until measured.",
  },
  {
    question: "How do I install a skill for Claude Code?",
    answer:
      "Run npx knackbox add <skill-name>. The default destination is ~/.claude/skills. You can also use npx skills add shinzoxD/knackbox --skill <name> or the curl installer in the docs.",
  },
  {
    question: "Do these skills work with Cursor, Codex, and OpenCode?",
    answer:
      "Yes. Pass --agent cursor, --agent codex, or --agent opencode to the Knackbox CLI, or let the open Skills CLI detect installed agents. Any runtime that reads SKILL.md can load the folders as-is.",
  },
  {
    question: "Are Knackbox skills free?",
    answer:
      "Yes. The catalog is Apache-2.0. You can install, fork, and contribute skills under the same license with DCO sign-off.",
  },
  {
    question: "How are skills ranked?",
    answer:
      "Tiers are core, verified, and community. Measured columns include trigger accuracy, quality uplift, context cost, and a composite score. Unmeasured fields stay visibly empty instead of being estimated.",
  },
  {
    question: "How do I contribute a new Agent Skill?",
    answer:
      "Scaffold with python scripts/new_skill.py, replace every TODO, add at least five trigger and five near-miss prompts, run python scripts/validate.py, and open a pull request. See the contribute page and CONTRIBUTING.md.",
  },
];

export function faqJsonLd(faqs: { question: string; answer: string }[] = defaultFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function howToInstallJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Install a Knackbox Agent Skill",
    description:
      "Install an open SKILL.md Agent Skill into Claude Code, Cursor, Codex, or OpenCode.",
    totalTime: "PT1M",
    tool: [
      { "@type": "HowToTool", name: "Node.js 18+" },
      { "@type": "HowToTool", name: "npx" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Pick a skill",
        text: "Browse the leaderboard at knackbox.pages.dev/skills/ or search with npx knackbox search <job>.",
        url: `${siteUrl}/skills/`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Install with the Knackbox CLI",
        text: "Run npx knackbox add commit-messages. Add --agent cursor, --agent codex, or --agent opencode to choose another skills root.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Or use the open Skills CLI",
        text: "Run npx skills add shinzoxD/knackbox --skill commit-messages -y to install through the Agent Skills ecosystem.",
      },
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Knackbox",
    url: siteUrl,
    logo: absoluteUrl("/favicon.svg"),
    sameAs: [githubRepoUrl],
    foundingDate: "2026",
    description: defaultDescription,
  };
}
