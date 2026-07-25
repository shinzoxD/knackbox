import { DEFAULT_CATALOG_URL, DEFAULT_PACKS_URL } from "./config.js";
import { loadJson } from "./http.js";

export async function fetchCatalog(source = DEFAULT_CATALOG_URL) {
  const data = await loadJson(source, { label: "catalog" });
  if (!data || !Array.isArray(data.skills)) {
    throw new Error("Catalog is missing a skills array");
  }
  return data;
}

export async function fetchPacks(source = DEFAULT_PACKS_URL) {
  const data = await loadJson(source, { label: "packs" });
  if (!data || !Array.isArray(data.packs)) {
    throw new Error("Packs document is missing a packs array");
  }
  return data;
}

export function listSkillNames(catalog) {
  return catalog.skills.map((skill) => skill.name).sort((a, b) => a.localeCompare(b));
}

export function findSkill(catalog, name) {
  const needle = String(name || "").trim();
  if (!needle) {
    return undefined;
  }
  return catalog.skills.find((skill) => skill.name === needle);
}

export function findPack(packsDoc, slugOrName) {
  const needle = String(slugOrName || "").trim().toLowerCase();
  if (!needle) {
    return undefined;
  }
  return packsDoc.packs.find(
    (pack) =>
      pack.slug.toLowerCase() === needle || pack.name.toLowerCase() === needle
  );
}

export function formatSkillRow(skill) {
  const tier = skill.tier || "community";
  const category = skill.category || "?";
  return `${skill.name.padEnd(32)} ${tier.padEnd(10)} ${category}`;
}

/**
 * Simple relevance search over name, category, description, and path.
 * Returns skills sorted by score descending, then name.
 */
export function searchSkills(catalog, query, { limit = 20 } = {}) {
  const q = String(query || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (!q.length) {
    return [];
  }

  const scored = [];
  for (const skill of catalog.skills) {
    const name = (skill.name || "").toLowerCase();
    const category = (skill.category || "").toLowerCase();
    const description = (skill.description || "").toLowerCase();
    const path = (skill.path || "").toLowerCase();
    let score = 0;
    for (const token of q) {
      if (name === token) score += 50;
      else if (name.includes(token)) score += 25;
      if (category === token) score += 15;
      else if (category.includes(token)) score += 8;
      if (description.includes(token)) score += 5;
      if (path.includes(token)) score += 3;
    }
    if (score > 0) {
      scored.push({ skill, score });
    }
  }

  scored.sort(
    (a, b) => b.score - a.score || a.skill.name.localeCompare(b.skill.name)
  );
  return scored.slice(0, Math.max(1, limit)).map((row) => row.skill);
}

/** Suggest close skill names (edit distance / substring) for typos. */
export function suggestSkills(catalog, name, { limit = 5 } = {}) {
  const needle = String(name || "").toLowerCase();
  if (!needle) {
    return [];
  }
  const ranked = catalog.skills
    .map((skill) => {
      const candidate = skill.name.toLowerCase();
      let score = 0;
      if (candidate.includes(needle) || needle.includes(candidate)) score += 10;
      score -= Math.abs(candidate.length - needle.length) * 0.1;
      // shared prefix bonus
      let prefix = 0;
      while (
        prefix < candidate.length &&
        prefix < needle.length &&
        candidate[prefix] === needle[prefix]
      ) {
        prefix += 1;
      }
      score += prefix * 2;
      return { name: skill.name, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return ranked.slice(0, limit).map((row) => row.name);
}
