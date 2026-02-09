import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MatchCard } from "@/components/results/MatchCard";
import type { FormattedMatch } from "@core/results.js";

const mockMatch: FormattedMatch = {
  rank: 1,
  title: "Software Developer",
  description: "Design and build apps and websites.",
  fitPercent: 92,
  fitBand: "Strong fit",
  fitReasons: [
    "Matches your preference for solo work",
    "Fits your interest in analytical work",
  ],
  frictionPoints: ["Moderate error pressure"],
  typicalEducation: "Bachelor's degree in CS",
  outlookNote: "Very strong demand",
};

describe("MatchCard", () => {
  it("renders job title and rank", () => {
    render(<MatchCard match={mockMatch} />);
    expect(screen.getByText(/#1 Software Developer/)).toBeInTheDocument();
  });

  it("renders fit badge", () => {
    render(<MatchCard match={mockMatch} />);
    expect(screen.getByText("Strong fit")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<MatchCard match={mockMatch} />);
    expect(
      screen.getByText("Design and build apps and websites."),
    ).toBeInTheDocument();
  });

  it("shows details when expand button is clicked", async () => {
    const user = userEvent.setup();
    render(<MatchCard match={mockMatch} />);

    const expandBtn = screen.getByRole("button", {
      name: /why this fits you/i,
    });
    expect(expandBtn).toHaveAttribute("aria-expanded", "false");

    await user.click(expandBtn);

    expect(expandBtn).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Matches your preference for solo work"),
    ).toBeInTheDocument();
    expect(screen.getByText("Moderate error pressure")).toBeInTheDocument();
    expect(
      screen.getByText("Bachelor's degree in CS"),
    ).toBeInTheDocument();
    expect(screen.getByText("Very strong demand")).toBeInTheDocument();
  });

  it("collapses when clicked again", async () => {
    const user = userEvent.setup();
    render(<MatchCard match={mockMatch} />);

    const expandBtn = screen.getByRole("button", {
      name: /why this fits you/i,
    });
    await user.click(expandBtn);
    await user.click(
      screen.getByRole("button", { name: /collapse details/i }),
    );

    expect(
      screen.queryByText("Matches your preference for solo work"),
    ).not.toBeInTheDocument();
  });
});
