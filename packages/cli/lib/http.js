import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Load bytes from an http(s) URL, file:// URL, or local filesystem path.
 */
export async function loadBytes(source, { label = "resource" } = {}) {
  if (!source) {
    throw new Error(`Missing ${label} source`);
  }

  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(source, {
      headers: {
        "user-agent": "knackbox-cli",
        accept: "*/*",
      },
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${label}: HTTP ${response.status} (${source})`);
    }
    return Buffer.from(await response.arrayBuffer());
  }

  if (source.startsWith("file:")) {
    return readFile(fileURLToPath(source));
  }

  // Bare paths for tests and offline mirrors.
  return readFile(source);
}

export async function loadJson(source, { label = "json" } = {}) {
  const bytes = await loadBytes(source, { label });
  try {
    return JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid ${label} from ${source}: ${detail}`);
  }
}

/** Build a file:// URL for a local path (tests). */
export function toFileUrl(absolutePath) {
  return pathToFileURL(absolutePath).href;
}
