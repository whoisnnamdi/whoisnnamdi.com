import React from "react";
import { render, screen } from "@testing-library/react";
import TalkCard from "../components/TalkCard";

describe("TalkCard", () => {
  test("renders internal Link for items with slug", () => {
    render(<TalkCard item={{ slug: "my-talk", title: "Talk" }} />);
    const link = screen.getByRole("link");
    const href = link.getAttribute("href");
    expect(href === "/my-talk/" || href === "/my-talk").toBe(true);
  });

  test("renders external anchor for items with href", () => {
    render(<TalkCard item={{ href: "https://example.com", title: "Ext" }} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://example.com");
  });
});
