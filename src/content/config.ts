import { defineCollection, z, } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    author: z.string(),
    layout: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};