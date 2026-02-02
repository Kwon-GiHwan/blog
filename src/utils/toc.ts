import GithubSlugger from 'github-slugger';

export interface TocItem {
  text: string;
  slug: string;
  depth: number;
}

/**
 * Extract H2 and H3 headings from markdown content
 */
export function generateToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = slugger.slug(text);

    toc.push({ text, slug, depth });
  }

  return toc;
}
