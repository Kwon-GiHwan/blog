import type { CollectionEntry } from "astro:content";
import readingTime from "reading-time";

// Generic type for content collections
type ContentCollection = "projects" | "research" | "experiences";
type AnyContentEntry =
  | CollectionEntry<"projects">
  | CollectionEntry<"research">;

/**
 * Filter out draft posts in production
 */
export function filterDrafts<T extends AnyContentEntry>(posts: T[]): T[] {
  return posts.filter((post) => {
    return import.meta.env.DEV || !post.data.draft;
  });
}

/**
 * Sort posts by date (newest first)
 */
export function sortByDate<T extends AnyContentEntry>(posts: T[]): T[] {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Calculate reading time for a post
 */
export function getReadingTime(content: string): string {
  const stats = readingTime(content);
  return stats.text;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Get unique tags from posts
 */
export function getAllTags<T extends AnyContentEntry>(posts: T[]): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Paginate array into chunks
 */
export function paginate<T>(array: T[], pageSize: number) {
  const totalPages = Math.ceil(array.length / pageSize);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: i + 1,
    data: array.slice(i * pageSize, (i + 1) * pageSize),
  }));
}

/**
 * Get year from date
 */
export function getYear(date: Date): number {
  return date.getFullYear();
}

/**
 * Get all unique skills from experiences
 */
export function getAllSkillsFromExperiences<
  T extends CollectionEntry<"experiences">,
>(experiences: T[]): string[] {
  const skills = new Set<string>();
  experiences.forEach((exp) => {
    exp.data.skills.forEach((skill) => skills.add(skill));
  });
  return Array.from(skills).sort();
}
