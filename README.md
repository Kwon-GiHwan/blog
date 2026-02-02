# Developer Portfolio & Blog

A production-ready static developer portfolio and blog built with **Astro 5**, **TypeScript**, and **Tailwind CSS**.

## Features

- ✅ **Content Collections** - Type-safe markdown with Zod schema validation
- ✅ **Draft Posts** - Visible only in development mode
- ✅ **Pagination** - 6 posts per page on archive
- ✅ **Tag System** - Auto-generated tag pages for filtering
- ✅ **Syntax Highlighting** - Shiki with Dracula theme
- ✅ **Table of Contents** - Sticky sidebar with scroll spy (H2/H3)
- ✅ **Reading Time** - Automatic calculation
- ✅ **View Transitions** - Smooth SPA-like navigation
- ✅ **Giscus Comments** - GitHub Discussions integration (placeholder)
- ✅ **Dark Mode First** - GitHub-inspired dark theme
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **GitHub Pages Ready** - Automated deployment workflow

## Project Structure

```
blog/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── GiscusComments.astro
│   │   ├── ProjectCard.astro
│   │   └── TableOfContents.astro
│   ├── content/
│   │   ├── config.ts      # Content Collections schema
│   │   └── projects/      # Blog posts (markdown)
│   ├── layouts/
│   │   ├── Base.astro     # Global layout
│   │   └── BlogPost.astro # Blog post layout
│   ├── pages/
│   │   ├── index.astro    # Homepage
│   │   ├── projects/
│   │   │   ├── index.astro      # Archive with pagination
│   │   │   └── [...slug].astro  # Individual posts
│   │   └── tags/
│   │       ├── index.astro      # All tags
│   │       └── [tag].astro      # Tag filter
│   ├── styles/
│   │   └── global.css     # Tailwind + custom styles
│   └── utils/
│       ├── index.ts       # Helper functions
│       └── toc.ts         # Table of contents generation
├── public/                # Static assets
├── .github/workflows/     # GitHub Actions deployment
└── astro.config.mjs       # Astro configuration
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure for Deployment

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/blog', // Match your repo name
  // ...
});
```

### 3. Development

```bash
npm run dev
```

Visit `http://localhost:4321/blog`

### 4. Build

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Creating Content

Add new blog posts in `src/content/projects/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2026-02-02
tags: ["tag1", "tag2"]
draft: false
---

## Your Content Here

Write your post content using markdown...
```

### Draft Posts

Set `draft: true` to make posts visible only in development:

```markdown
---
draft: true
---
```

## Deployment to GitHub Pages

### 1. Enable GitHub Pages

1. Go to repository **Settings → Pages**
2. Source: **GitHub Actions**

### 2. Push to Main Branch

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy your site.

### 3. Configure Giscus Comments

1. Enable **GitHub Discussions** in your repository
2. Visit https://giscus.app
3. Enter your repository details
4. Copy the generated configuration
5. Update `src/components/GiscusComments.astro` with your values

## Customization

### Update Personal Info

- **Homepage**: Edit `src/pages/index.astro` (change "Your Name")
- **Footer**: Edit `src/layouts/Base.astro`
- **Navigation**: Edit `src/layouts/Base.astro`

### Change Syntax Theme

Update `astro.config.mjs`:

```javascript
markdown: {
  shikiConfig: {
    theme: 'github-dark', // or any Shiki theme
  },
}
```

### Modify Colors

Edit `tailwind.config.mjs` to customize the dark theme colors.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run sync` - Sync Astro content collections

## Tech Stack

- **Astro 5** - Static site generator
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **@tailwindcss/typography** - Beautiful prose styling
- **Shiki** - Syntax highlighting
- **github-slugger** - Consistent slug generation
- **reading-time** - Reading time estimation

## Browser Support

- Modern browsers with ES2020+ support
- View Transitions API (progressive enhancement)

## License

MIT

## Notes

- The blog uses **query parameter pagination** (`?page=2`) for simplicity
- **Draft posts** are excluded from production builds automatically
- All routes are **statically generated** at build time
- **View Transitions** provide smooth navigation between pages
- **Table of Contents** only displays on desktop (hidden on mobile)

---

Built with ❤️ using Astro
