import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProfileSummary } from "@/components/results/ProfileSummary";
import type { UserDimensionProfile } from "@core/types.js";

const mockProfile: UserDimensionProfile = {
  energyRhythm: "steady",
  peopleDensity: "solo",
  interactionDemand: "minimal",
  schedulePredictability: "predictable",
  ruleDensity: "loose",
  primaryLoadType: "analytical",
  errorPressure: "low",
  workValue: "autonomy",
};

describe("ProfileSummary", () => {
  it("renders heading", () => {
    render(<ProfileSummary profile={mockProfile} />);
    expect(
      screen.getByRole("heading", { name: /preference profile/i }),
    ).toBeInTheDocument();
  });

  it("renders all 8 dimensions", () => {
    render(<ProfileSummary profile={mockProfile} />);
    expect(screen.getByText("Energy Rhythm")).toBeInTheDocument();
    expect(screen.getByText("People Density")).toBeInTheDocument();
    expect(screen.getByText("Interaction Demand")).toBeInTheDocument();
    expect(screen.getByText("Schedule Predictability")).toBeInTheDocument();
    expect(screen.getByText("Rule Density")).toBeInTheDocument();
    expect(screen.getByText("Primary Load Type")).toBeInTheDocument();
    expect(screen.getByText("Error Pressure")).toBeInTheDocument();
    expect(screen.getByText("Work Value")).toBeInTheDocument();
  });

  it("has accessible section label", () => {
    render(<ProfileSummary profile={mockProfile} />);
    const section = screen.getByRole("region", {
      name: /preference profile/i,
    });
    expect(section).toBeInTheDocument();
  });
});
