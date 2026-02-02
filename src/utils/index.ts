import type { CollectionEntry } from 'astro:content';
import readingTime from 'reading-time';

/**
 * Filter out draft posts in production
 */
export function filterDrafts(posts: CollectionEntry<'projects'>[]): CollectionEntry<'projects'>[] {
  return posts.filter(post => {
    return import.meta.env.DEV || !post.data.draft;
  });
}

/**
 * Sort posts by date (newest first)
 */
export function sortByDate(posts: CollectionEntry<'projects'>[]): CollectionEntry<'projects'>[] {
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
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Get unique tags from posts
 */
export function getAllTags(posts: CollectionEntry<'projects'>[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.data.tags.forEach(tag => tags.add(tag));
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
