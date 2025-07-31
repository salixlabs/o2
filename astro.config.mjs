// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: "standalone" }),
  output: 'server',
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss(), mdx()],
  },
});