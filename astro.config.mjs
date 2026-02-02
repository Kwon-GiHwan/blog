import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://YOUR_USERNAME.github.io",
  base: "/blog", // Update to match your repo name (or remove if using username.github.io)
  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: "dracula", // Or 'github-dark'
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
