import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  site: "https://knackbox.pages.dev",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === "/") {
          return { ...item, priority: 1, changefreq: "daily" };
        }
        if (path === "/skills/" || path === "/packs/" || path === "/faq/") {
          return { ...item, priority: 0.9, changefreq: "weekly" };
        }
        if (path.startsWith("/skills/") || path === "/why/" || path.startsWith("/docs/")) {
          return { ...item, priority: 0.8, changefreq: "weekly" };
        }
        return { ...item, priority: 0.6, changefreq: "monthly" };
      },
    }),
  ],
  vite: {
    define: {
      __REPO_ROOT__: JSON.stringify(repoRoot),
    },
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
  },
});
