export default function EssaySidebar({ sections = [], post }) {
  const publishedDate = post?.published_at
    ? new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.published_at))
    : null;
  const updatedDate = post?.updated_at
    ? new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(post.updated_at))
    : null;
  const tags = post?.tags || [];
  const rawExcerpt =
    post?.excerpt ||
    "Independent analysis on technology, markets, and venture capital.";
  const excerpt =
    rawExcerpt.length > 140 ? `${rawExcerpt.slice(0, 140)}...` : rawExcerpt;

  return (
    <aside className="hidden lg:block w-60 flex-shrink-0">
      <div className="sticky top-8 space-y-4">
        <div className="border border-neutral-300 bg-white px-4 py-5">
          <div className="space-y-4 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            {publishedDate && (
              <div>
                <p className="text-neutral-400">Date</p>
                <p className="mt-1 text-neutral-900">{publishedDate}</p>
              </div>
            )}
            {tags.length > 0 && (
              <div>
                <p className="text-neutral-400">Categories</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.slug || tag.name}
                      className="px-2 py-1 border border-neutral-300 text-[10px] font-mono uppercase tracking-[0.2em] text-accent"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="border border-neutral-300 bg-white px-4 py-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
              Description
            </p>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              {excerpt}
            </p>
          </div>
          {updatedDate && (
            <div className="border border-neutral-300 bg-white px-4 py-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                Last Updated
              </p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {updatedDate}
              </p>
            </div>
          )}
        </div>

        {sections.length > 0 && (
          <nav className="space-y-2 border border-neutral-300 bg-white px-4 py-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-3">
              On this page
            </p>
            <ul className="space-y-1">
              {sections.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#${section.id}`}
                    className="block text-sm text-neutral-500 hover:text-neutral-900 transition-colors py-1"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </aside>
  );
}
