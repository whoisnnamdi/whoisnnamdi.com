import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Menu, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSubscribe } from "./subscribe";

export default function NavbarRedesign({ source, dateLabel, codeOverride }) {
  const input = useRef(null);
  const router = useRouter();
  const subscribe = useSubscribe();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await subscribe(input.current.value, "Navbar: " + source, input);
  };

  const navLinks = [
    { href: "/essays", label: "Essays" },
    { href: "/notes", label: "Notes" },
    { href: "/talks", label: "Talks" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about-me", label: "WHOAMI" },
  ];

  const contextMap = {
    Home: { code: "INDEX 01", label: "HOME." },
    essays: { code: "INDEX 02", label: "ESSAYS." },
    notes: { code: "INDEX 03", label: "NOTES" },
    talks: { code: "INDEX 04", label: "TALKS & MEDIA." },
    portfolio: { code: "INDEX 05", label: "PORTFOLIO." },
    about: { code: "INDEX 06", label: "ABOUT ME." },
  };

  const context = dateLabel
    ? { code: codeOverride || "EDITORIAL", label: dateLabel }
    : contextMap[source] || {
        code: "INDEX",
        label: String(source || "").toUpperCase(),
      };

  return (
    <nav className="flex items-center justify-between py-6 border-neutral-300">
      {/* Logo and timeline */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-neutral-900 hover:text-neutral-700 transition-colors"
        >
          Nnamdi.
        </Link>
        {/* Context indicator - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-neutral-500 font-mono uppercase tracking-[0.2em]">
          <span className="w-px h-5 bg-neutral-300" />
          <span>{context.code}</span>
          <span className="w-10 h-px bg-neutral-300" />
          <span className="text-accent">{context.label}</span>
        </div>
      </div>

      {/* Right side - navigation + subscribe */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const currentPath = (router.asPath || "/")
              .split("?")[0]
              .replace(/\/$/, "");
            const linkPath = link.href.replace(/\/$/, "");
            const isActive = currentPath === linkPath;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-1 text-[12px] font-mono uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? "text-accent border-b-2 border-accent"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`${
                    open ? "hidden" : ""
                  } px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white bg-neutral-900 rounded-none border border-neutral-900 hover:bg-accent transition-colors focus:outline-none`}
                >
                  Subscribe_
                </Popover.Button>
                <Popover.Panel className="absolute right-0 top-full mt-2 w-72 sm:w-96 z-50">
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-2 p-4 bg-white shadow-lg border border-neutral-300"
                  >
                    <input
                      id="email-input"
                      name="email"
                      placeholder="your@email.com"
                      ref={input}
                      type="email"
                      required
                      className="flex-1 px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white bg-neutral-900 hover:bg-accent transition-colors"
                    >
                      Join
                    </button>
                  </form>
                </Popover.Panel>
              </>
            )}
          </Popover>

          {/* Mobile menu */}
          <Menu as="div" className="relative md:hidden">
            <Menu.Button
              aria-label="Open Menu"
              className="p-2 text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors focus:outline-none"
            >
              <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
                {[{ href: "/", label: "Home" }, ...navLinks].map((link) => (
                  <Menu.Item key={link.href}>
                    {({ active }) => (
                      <Link
                        href={link.href}
                        className={`block px-4 py-2 text-sm ${
                          active
                            ? "bg-neutral-50 text-neutral-900"
                            : "text-neutral-700"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
