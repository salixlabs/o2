import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://salixlabs.github.io/officetwo/',
  base: '/officetwo',
  vite: {
    plugins: [tailwindcss(), mdx()],
  },
});