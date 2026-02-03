import { defineCollection, z } from "astro:content";

// Shared schema for both projects and research
const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const projectsCollection = defineCollection({
  type: "content",
  schema: contentSchema,
});

const researchCollection = defineCollection({
  type: "content",
  schema: contentSchema,
});

// Experience schema for work history
const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(), // e.g., "2023.01 - Present"
  summary: z.string(),
  skills: z.array(z.string()), // Skills used in this role
  keyProjects: z.array(
    z.object({
      category: z.string(), // e.g., "Optimization", "Infrastructure"
      name: z.string(),
      techStack: z.array(z.string()),
    }),
  ),
  order: z.number(), // For sorting (lower = more recent)
  draft: z.boolean().default(false),
});

const experiencesCollection = defineCollection({
  type: "data", // JSON/YAML, not markdown
  schema: experienceSchema,
});

export const collections = {
  projects: projectsCollection,
  research: researchCollection,
  experiences: experiencesCollection,
};
