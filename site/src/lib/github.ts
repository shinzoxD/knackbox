export const githubOrg = "shinzoxD";
export const githubRepoUrl = `https://github.com/${githubOrg}/knackbox`;
export const githubRepoContentUrl = `${githubRepoUrl}/blob/main`;

/** Return the GitHub content directory used to resolve links from a repository file. */
export function githubFileLinkBase(filePath: string): string {
  const normalized = filePath
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "");
  const lastSlash = normalized.lastIndexOf("/");
  const directory = lastSlash === -1 ? "" : normalized.slice(0, lastSlash);
  return directory ? `${githubRepoContentUrl}/${directory}` : githubRepoContentUrl;
}
