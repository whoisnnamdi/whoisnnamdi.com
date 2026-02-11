import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Fathom from "fathom-client";

export default function LinkConverter({ content }) {
  const router = useRouter();

  useEffect(() => {
    // Convert internal links to use Next.js router
    const links = document.querySelectorAll("a");
    const clickHandlers = [];

    try {
      links.forEach((link) => {
        // Handle internal links (whoisnnamdi.com)
        if (link.href.includes("whoisnnamdi.com")) {
          const url = new URL(link.href);
          link.href = url.pathname;
          const handler = (e) => {
            e.preventDefault();
            router.push(e.target.href);
          };
          link.addEventListener("click", handler, false);
          clickHandlers.push({ link, handler });
        }
      });
    } catch {
      // Ignore errors
    }

    // Track form submissions
    const forms = document.querySelectorAll("form");
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
  }, [router]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
