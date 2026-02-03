import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://YOUR_USERNAME.github.io",
  // base: "/blog", // Removed - using root path
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
