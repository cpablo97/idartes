import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: process.env.PUBLIC_SITE_URL || "https://ciudadycuerpo.com",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "never" },
  compressHTML: true,
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});
