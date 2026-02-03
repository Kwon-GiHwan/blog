import { useState, useMemo } from "preact/hooks";

interface Post {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  collection: "projects" | "research";
}

interface Props {
  allPosts: Post[];
  allSkills: string[];
}

export default function SkillsFilter({ allPosts, allSkills }: Props) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Calculate skill counts
  const skillCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allSkills.forEach((skill) => {
      counts[skill] = allPosts.filter((post) =>
        post.tags.includes(skill),
      ).length;
    });
    return counts;
  }, [allPosts, allSkills]);

  // Filter posts by selected skill
  const filteredPosts = useMemo(() => {
    if (!selectedSkill) return [];
    return allPosts.filter((post) => post.tags.includes(selectedSkill));
  }, [selectedSkill, allPosts]);

  return (
    <div class="space-y-8">
      {/* Skills Grid */}
      <div>
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Skills & Technologies
        </h3>
        <div class="flex flex-wrap gap-3">
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() =>
                setSelectedSkill(skill === selectedSkill ? null : skill)
              }
              class={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  selectedSkill === skill
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
                }
              `}
            >
              {skill}{" "}
              <span class="text-xs opacity-75">({skillCounts[skill]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Results */}
      {selectedSkill && (
        <div class="mt-8 pt-8 border-t border-gray-200">
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-xl font-bold text-gray-900">
              Evidence for "{selectedSkill}"
            </h4>
            <button
              onClick={() => setSelectedSkill(null)}
              class="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear filter
            </button>
          </div>

          {filteredPosts.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.collection}/${post.slug}`}
                  class="block p-5 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all group"
                >
                  <div class="flex items-start justify-between mb-2">
                    <h5 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h5>
                    <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                      {post.collection}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                    {post.description}
                  </p>
                  <div class="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        class={`text-xs px-2 py-1 rounded-full ${
                          tag === selectedSkill
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p class="text-gray-500 text-center py-8">
              No posts or projects found with this skill.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
