import { useState, useMemo } from "preact/hooks";

interface Post {
  slug: string;
  title: string;
  description: string;
  abstract?: string;
  date: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  collection: "projects" | "research";
}

interface Props {
  posts: Post[];
}

export default function FeaturedSplitView({ posts }: Props) {
  const [selectedPost, setSelectedPost] = useState<Post>(posts[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.abstract?.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    if (selectedTags.size > 0) {
      filtered = filtered.filter((post) => {
        return Array.from(selectedTags).every((tag) => post.tags.includes(tag));
      });
    }

    return filtered;
  }, [posts, searchQuery, selectedTags]);

  // Update selected post when filtered posts change
  useMemo(() => {
    if (
      filteredPosts.length > 0 &&
      !filteredPosts.find((p) => p.slug === selectedPost?.slug)
    ) {
      setSelectedPost(filteredPosts[0]);
    }
  }, [filteredPosts]);

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags(new Set());
  };

  return (
    <div>
      {/* Search and Filter Section */}
      <div class="mb-6 pb-6 border-b border-gray-200">
        {/* Search Bar */}
        <div class="mb-4">
          <div class="relative max-w-md">
            <input
              type="text"
              placeholder="Search featured content..."
              value={searchQuery}
              onInput={(e) =>
                setSearchQuery((e.target as HTMLInputElement).value)
              }
              class="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Tags */}
        <div class="flex items-center gap-3 flex-wrap">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Filter:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              class={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTags.has(tag)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              #{tag}
            </button>
          ))}
          {(searchQuery || selectedTags.size > 0) && (
            <button
              onClick={clearFilters}
              class="text-xs text-blue-600 hover:text-blue-700 font-medium ml-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div class="text-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p class="text-gray-600 font-medium">
            No content matches your filters
          </p>
          <p class="text-gray-500 text-sm mt-1">
            Try adjusting your search or tags
          </p>
        </div>
      ) : (
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Scrollable List */}
          <div class="h-[600px] overflow-y-auto pr-4 space-y-3 scrollable-list">
            {filteredPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => setSelectedPost(post)}
                class={`
              w-full text-left p-4 rounded-lg border-2 transition-all duration-200
              ${
                selectedPost.slug === post.slug
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }
            `}
              >
                <div class="flex items-start gap-3">
                  {post.image && (
                    <div class="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <img
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        class="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span
                        class={`
                    text-xs px-2 py-0.5 rounded-full font-medium capitalize
                    ${
                      post.collection === "projects"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }
                  `}
                      >
                        {post.collection}
                      </span>
                      <span class="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 class="font-semibold text-gray-900 line-clamp-1">
                      {post.title}
                    </h3>

                    <p class="text-sm text-gray-600 line-clamp-2 mt-1">
                      {post.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Preview (Hidden on mobile) */}
          <div class="hidden lg:block lg:sticky lg:top-8 lg:self-start h-[600px]">
            <a
              key={selectedPost.slug}
              href={`/blog/${selectedPost.collection}/${selectedPost.slug}/`}
              class="block h-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-200 cursor-pointer group"
            >
              {/* Hero Image */}
              {selectedPost.image && (
                <div class="aspect-video bg-gray-100 overflow-hidden">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.imageAlt || selectedPost.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div class="p-8">
                {/* Category & Date */}
                <div class="flex items-center gap-3 mb-4">
                  <span
                    class={`
                px-3 py-1 rounded-full text-sm font-medium capitalize
                ${
                  selectedPost.collection === "projects"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }
              `}
                  >
                    {selectedPost.collection}
                  </span>
                  <span class="text-sm text-gray-500">
                    {new Date(selectedPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Title */}
                <h2 class="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {selectedPost.title}
                </h2>

                {/* Abstract */}
                <p
                  class="text-gray-700 leading-relaxed mb-6"
                  style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;"
                >
                  {selectedPost.abstract || selectedPost.description}
                </p>

                {/* Tags */}
                {selectedPost.tags.length > 0 && (
                  <div class="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
