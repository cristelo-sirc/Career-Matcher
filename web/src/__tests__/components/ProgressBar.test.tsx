import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "@/components/ui/ProgressBar";

describe("ProgressBar", () => {
  it("shows section label and step within section", () => {
    render(<ProgressBar currentIndex={5} />);
    // Index 5 → section 1 (Social), step 2
    expect(screen.getByText("Social (2 of 4)")).toBeInTheDocument();
  });

  it("shows first section at index 0", () => {
    render(<ProgressBar currentIndex={0} />);
    expect(screen.getByText("Energy (1 of 4)")).toBeInTheDocument();
  });

  it("shows last section at index 31", () => {
    render(<ProgressBar currentIndex={31} />);
    expect(screen.getByText("Values (4 of 4)")).toBeInTheDocument();
  });

  it("renders a progressbar role with correct aria attributes", () => {
    render(<ProgressBar currentIndex={16} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "50");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("has an accessible aria-label with section and overall info", () => {
    render(<ProgressBar currentIndex={8} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-label")).toContain("Interaction section");
    expect(bar.getAttribute("aria-label")).toContain("question 1 of 4");
    expect(bar.getAttribute("aria-label")).toContain("25% complete");
  });

  it("shows percentage text", () => {
    render(<ProgressBar currentIndex={8} />);
    expect(screen.getByText("25%")).toBeInTheDocument();
  });
});
