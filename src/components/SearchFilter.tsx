import { useState, useMemo } from "preact/hooks";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  content?: string; // Raw markdown content for search
}

interface Props {
  posts: Post[];
  allTags: string[];
  collection: "projects" | "research";
}

export default function SearchFilter({ posts, allTags, collection }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query (search in title, description, and content)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const descMatch = post.description.toLowerCase().includes(query);
        const contentMatch = post.content?.toLowerCase().includes(query);
        const tagMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(query),
        );

        return titleMatch || descMatch || contentMatch || tagMatch;
      });
    }

    // Filter by selected tags (AND logic - post must have all selected tags)
    if (selectedTags.size > 0) {
      filtered = filtered.filter((post) => {
        return Array.from(selectedTags).every((tag) => post.tags.includes(tag));
      });
    }

    return filtered;
  }, [posts, searchQuery, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags(new Set());
  };

  const hasActiveFilters = searchQuery.trim() !== "" || selectedTags.size > 0;

  return (
    <div>
      {/* Search Bar */}
      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            placeholder="Search posts by title, content, or tags..."
            value={searchQuery}
            onInput={(e) =>
              setSearchQuery((e.target as HTMLInputElement).value)
            }
            class="w-full px-5 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tags Filter */}
      <div class="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Filter by Tags
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div class="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              class={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-all
                ${
                  selectedTags.has(tag)
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-600"
                }
              `}
            >
              <span class="opacity-60">#</span>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div class="mb-6 flex items-center justify-between">
        <p class="text-gray-600 text-sm">
          {filteredPosts.length === posts.length ? (
            <span>
              {posts.length} {posts.length === 1 ? "post" : "posts"} total
            </span>
          ) : (
            <span>
              Found {filteredPosts.length} of {posts.length}{" "}
              {posts.length === 1 ? "post" : "posts"}
              {searchQuery && (
                <span class="font-medium"> matching "{searchQuery}"</span>
              )}
            </span>
          )}
        </p>

        {selectedTags.size > 0 && (
          <div class="flex flex-wrap gap-1.5 items-center">
            <span class="text-xs text-gray-500">Active filters:</span>
            {Array.from(selectedTags).map((tag) => (
              <span
                key={tag}
                class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                #{tag}
                <button
                  onClick={() => toggleTag(tag)}
                  class="hover:text-blue-900"
                  aria-label={`Remove ${tag} filter`}
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${collection}/${post.slug}/`}
              class="block border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all"
            >
              {post.image && (
                <div class="h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    class="w-full h-full object-cover"
                  />
                </div>
              )}
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-900 line-clamp-1 mb-2">
                  {post.title}
                </h3>
                <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                  {post.description}
                </p>
                <div class="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div class="text-center py-20 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <svg
            class="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-gray-600 font-medium mb-1">No posts found</p>
          <p class="text-gray-500 text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
