import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "@/components/ui/SkipLink";

describe("SkipLink", () => {
  it("renders a link targeting #main-content", () => {
    render(<SkipLink />);
    const link = screen.getByText("Skip to main content");
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("is initially visually hidden (sr-only)", () => {
    render(<SkipLink />);
    const link = screen.getByText("Skip to main content");
    expect(link.className).toContain("sr-only");
  });
});
