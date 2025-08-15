import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";

export default defineConfig({
  site: 'https://www.officetwo.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
  vite: {
    plugins: [tailwindcss(), mdx()],
  },
});