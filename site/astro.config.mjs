import { fileURLToPath } from "node:url";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false })],
  vite: {
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
  },
});
