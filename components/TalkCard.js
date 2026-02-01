import Link from "next/link";

// Renders either an internal post (with slug) or an external link (with href)
export default function TalkCard({ item }) {
  const isInternal = !!item.slug;
  const content = (
    <>
      {item.feature_image ? (
        <img
          src={item.feature_image}
          alt={item.title}
          className="w-full h-auto"
        />
      ) : null}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900">
          {item.title}
        </h3>
        {item.excerpt ? (
          <p className="text-gray-600 text-base mb-3">{item.excerpt}</p>
        ) : null}
        {item.dateFormatted ? (
          <span className="inline-block text-sm font-semibold text-white bg-blue-500 rounded-full px-2 py-1">
            {item.dateFormatted}
          </span>
        ) : null}
      </div>
    </>
  );

  if (isInternal) {
    return (
      <Link
        href={`/${item.slug}/`}
        className="block group rounded-xl border border-black border-opacity-10 overflow-hidden bg-white"
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group rounded-xl border border-black border-opacity-10 overflow-hidden bg-white"
    >
      {content}
    </a>
  );
}
