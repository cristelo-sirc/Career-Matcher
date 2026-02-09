import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

describe("ThemeToggle", () => {
  it("renders a button", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    // Initial state should indicate what it switches to
    expect(btn).toHaveAttribute("aria-label", expect.stringContaining("Switch to"));
  });

  it("toggles theme on click", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    const initialLabel = btn.getAttribute("aria-label");

    fireEvent.click(btn);

    const newLabel = btn.getAttribute("aria-label");
    expect(newLabel).not.toBe(initialLabel);
  });

  it("meets minimum touch target (44x44px class)", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("min-h-[44px]");
    expect(btn.className).toContain("min-w-[44px]");
  });
});
