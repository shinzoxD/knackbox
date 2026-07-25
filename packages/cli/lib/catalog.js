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
