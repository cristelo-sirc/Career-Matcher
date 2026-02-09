import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header", () => {
  it("renders the site name as a link to home", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: "Career-Matcher" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("has main navigation with About link", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeInTheDocument();
    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink.getAttribute("href")).toMatch(/^\/about\/?$/);
  });

  it("renders the theme toggle", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", {
      name: /switch to (dark|light) mode/i,
    });
    expect(toggle).toBeInTheDocument();
  });

  it("is a sticky header", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header.className).toContain("sticky");
    expect(header.className).toContain("top-0");
  });
});
