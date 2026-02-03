import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://kwon-gihwan.github.io",
  base: "/blog",
  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
    }),
    mdx(),
    preact(),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light", // Changed from 'dracula'
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
