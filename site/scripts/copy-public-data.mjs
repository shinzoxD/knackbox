import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const siteDir = dirname(fileURLToPath(import.meta.url));
const root = join(siteDir, "..", "..");
const publicDir = join(siteDir, "..", "public");

mkdirSync(publicDir, { recursive: true });
copyFileSync(join(root, "catalog.json"), join(publicDir, "catalog.json"));
copyFileSync(join(root, "packs.json"), join(publicDir, "packs.json"));
console.log("Copied catalog.json and packs.json into site/public");
