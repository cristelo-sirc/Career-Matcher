import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { EliminatedSection } from "@/components/results/EliminatedSection";
import type { FormattedMatch } from "@core/results.js";

const mockEliminated: FormattedMatch[] = [
  {
    rank: 1,
    title: "Surgeon",
    description: "Perform surgeries.",
    fitPercent: 30,
    fitBand: "Unlikely fit",
    fitReasons: [],
    frictionPoints: ["Very high error pressure", "Strict rules"],
  },
  {
    rank: 2,
    title: "Air Traffic Controller",
    description: "Direct aircraft.",
    fitPercent: 25,
    fitBand: "Unlikely fit",
    fitReasons: [],
    frictionPoints: ["Chaotic schedule"],
  },
];

describe("EliminatedSection", () => {
  it("renders nothing for empty list", () => {
    const { container } = render(<EliminatedSection eliminated={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders collapsed by default", () => {
    render(<EliminatedSection eliminated={mockEliminated} />);
    expect(
      screen.getByRole("heading", { name: /less likely fits/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Surgeon")).not.toBeInTheDocument();
  });

  it("expands to show eliminated jobs", async () => {
    const user = userEvent.setup();
    render(<EliminatedSection eliminated={mockEliminated} />);

    const toggle = screen.getByRole("button", { name: /show 2 less likely/i });
    await user.click(toggle);

    expect(screen.getByText("Surgeon")).toBeInTheDocument();
    expect(screen.getByText("Air Traffic Controller")).toBeInTheDocument();
    expect(
      screen.getByText("Very high error pressure"),
    ).toBeInTheDocument();
  });

  it("collapses when clicked again", async () => {
    const user = userEvent.setup();
    render(<EliminatedSection eliminated={mockEliminated} />);

    const toggle = screen.getByRole("button", { name: /show 2 less likely/i });
    await user.click(toggle);
    await user.click(
      screen.getByRole("button", { name: /hide 2 less likely/i }),
    );

    expect(screen.queryByText("Surgeon")).not.toBeInTheDocument();
  });
});
