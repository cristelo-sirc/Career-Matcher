import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ExplorationPrompts } from "@/components/results/ExplorationPrompts";

describe("ExplorationPrompts", () => {
  it("renders heading", () => {
    render(<ExplorationPrompts />);
    expect(
      screen.getByRole("heading", { name: /explore further/i }),
    ).toBeInTheDocument();
  });

  it("renders all 5 suggestions", () => {
    render(<ExplorationPrompts />);
    expect(screen.getByText(/counselor or mentor/)).toBeInTheDocument();
    expect(screen.getByText(/Bureau of Labor Statistics/)).toBeInTheDocument();
    expect(screen.getByText(/job-shadow day/)).toBeInTheDocument();
    expect(screen.getByText(/Holland RIASEC/)).toBeInTheDocument();
    expect(screen.getByText(/6–12 months/)).toBeInTheDocument();
  });
});
