import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import * as Fathom from "fathom-client";

export default function LinkConverter({ content }) {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Convert internal links in rendered content to use Next.js router
    const links = container.querySelectorAll("a");
    const clickHandlers = [];

    try {
      links.forEach((link) => {
        const rawHref = link.getAttribute("href");
        if (!rawHref) return;

        let url;

        try {
          url = new URL(rawHref, document.baseURI);
        } catch {
          return;
        }

        const isInternalLink =
          url.hostname === "whoisnnamdi.com" ||
          url.hostname === window.location.hostname;

        if (!isInternalLink) return;

        const isInPageAnchor =
          url.pathname === window.location.pathname &&
          url.search === window.location.search &&
          Boolean(url.hash);

        if (isInPageAnchor) return;

        const normalizedHref = `${url.pathname}${url.search}${url.hash}`;
        link.setAttribute("href", normalizedHref);

        const handler = (e) => {
          // Preserve default browser behaviors (new tab/window, download, etc)
          if (e.defaultPrevented) return;
          if (e.button !== 0) return;
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          if (link.target && link.target !== "_self") return;
          if (link.hasAttribute("download")) return;

          e.preventDefault();
          router.push(normalizedHref);
        };

        link.addEventListener("click", handler, false);
        clickHandlers.push({ link, handler });
      });
    } catch {
      // Ignore errors
    }

    // Track form submissions in rendered content
    const forms = container.querySelectorAll("form");
    const submitHandlers = [];

    try {
      forms.forEach((form) => {
        const handler = () => {
          Fathom.trackGoal("8O6T9QOR", 0);
        };
        form.addEventListener("submit", handler);
        submitHandlers.push({ form, handler });
      });
    } catch {
      // Ignore errors
    }

    return () => {
      clickHandlers.forEach(({ link, handler }) => {
        link.removeEventListener("click", handler, false);
      });
      submitHandlers.forEach(({ form, handler }) => {
        form.removeEventListener("submit", handler);
      });
    };
  }, [router, content]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: content }} />;
}
