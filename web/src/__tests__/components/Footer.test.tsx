import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";
import { SCOPE_DISCLAIMER } from "@/lib/constants";

describe("Footer", () => {
  it("renders the scope disclaimer", () => {
    render(<Footer />);
    expect(screen.getByText(SCOPE_DISCLAIMER)).toBeInTheDocument();
  });

  it("has a link to About & Methodology", () => {
    render(<Footer />);
    const aboutLink = screen.getByRole("link", {
      name: "About & Methodology",
    });
    expect(aboutLink.getAttribute("href")).toMatch(/^\/about\/?$/);
  });

  it("has a link to Privacy", () => {
    render(<Footer />);
    const privacyLink = screen.getByRole("link", { name: "Privacy" });
    expect(privacyLink.getAttribute("href")).toMatch(/^\/about\/?#privacy$/);
  });

  it("has footer navigation landmark", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Footer navigation" });
    expect(nav).toBeInTheDocument();
  });

  it("mentions Theory of Work Adjustment", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Theory of Work Adjustment/),
    ).toBeInTheDocument();
  });
});
