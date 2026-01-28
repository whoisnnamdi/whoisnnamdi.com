import Link from "next/link";

export default function FooterRedesign() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: "Content",
      links: [
        { href: "/essays", label: "Essays" },
        { href: "/notes", label: "Notes" },
        { href: "/talks", label: "Talks" },
      ],
    },
    {
      title: "Social",
      links: [
        { href: "https://x.com/whoisnnamdi", label: "X", external: true },
        {
          href: "https://www.linkedin.com/in/nnamdiiregbulem/",
          label: "LinkedIn",
          external: true,
        },
        {
          href: "https://github.com/whoisnnamdi/",
          label: "GitHub",
          external: true,
        },
      ],
    },
    {
      title: "Info",
      links: [
        { href: "/about-me", label: "whoami" },
        { href: "/portfolio", label: "Portfolio" },
      ],
    },
  ];

  return (
    <footer className="mt-20 border-t border-neutral-300 bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr,1fr,1fr,1fr,0.8fr] gap-8 px-6 lg:px-10 py-12">
        <div>
          <Link
            href="/"
            className="font-serif text-xl font-bold text-neutral-900"
          >
            Nnamdi.
          </Link>
          <p className="mt-3 text-sm text-neutral-500 font-mono uppercase tracking-[0.2em]">
            &copy; {currentYear} Nnamdi.
            <br />
            San Francisco, CA.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
              {column.title}
            </h4>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="hidden md:flex items-start justify-end">
          <div className="w-24 h-24 border border-neutral-300 flex items-center justify-center">
            <svg
              viewBox="0 0 80 80"
              className="w-12 h-12 text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polygon points="40,6 68,22 74,52 52,74 22,68 6,40 22,12" />
              <polygon points="40,16 60,28 64,50 50,64 28,60 16,40 28,20" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
