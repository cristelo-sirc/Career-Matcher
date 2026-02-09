import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DimensionBar } from "@/components/ui/DimensionBar";

const ordinalLevels = [
  { value: "solo", label: "Solo", description: "Mostly alone" },
  { value: "small-group", label: "Small Group", description: "A handful nearby" },
  { value: "crowd", label: "Crowd", description: "Lots of people" },
] as const;

const categoricalLevels = [
  { value: "steady", label: "Steady", description: "Same pace all day" },
  { value: "burst", label: "Burst", description: "Intense pushes" },
  { value: "mixed", label: "Mixed", description: "Varies day to day" },
] as const;

describe("DimensionBar", () => {
  it("renders ordinal dimension as segmented bar with all levels", () => {
    render(
      <DimensionBar
        label="People Density"
        levels={ordinalLevels}
        selectedValue="solo"
        ordinal={true}
      />,
    );
    expect(screen.getByText("People Density")).toBeInTheDocument();
    expect(screen.getByText("Solo")).toBeInTheDocument();
    expect(screen.getByText("Small Group")).toBeInTheDocument();
    expect(screen.getByText("Crowd")).toBeInTheDocument();
  });

  it("renders categorical dimension as chips", () => {
    render(
      <DimensionBar
        label="Energy Rhythm"
        levels={categoricalLevels}
        selectedValue="steady"
        ordinal={false}
      />,
    );
    expect(screen.getByText("Energy Rhythm")).toBeInTheDocument();
    expect(screen.getByText("Steady")).toBeInTheDocument();
    expect(screen.getByText("Burst")).toBeInTheDocument();
    expect(screen.getByText("Mixed")).toBeInTheDocument();
  });

  it("shows preference text for selected level", () => {
    render(
      <DimensionBar
        label="People Density"
        levels={ordinalLevels}
        selectedValue="crowd"
        ordinal={true}
      />,
    );
    expect(
      screen.getByText(/Your preference: Crowd/),
    ).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    render(
      <DimensionBar
        label="People Density"
        levels={ordinalLevels}
        selectedValue="solo"
        ordinal={true}
      />,
    );
    const el = screen.getByRole("img");
    expect(el).toHaveAttribute("aria-label", "People Density: Solo");
  });
});
