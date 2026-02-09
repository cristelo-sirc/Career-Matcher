import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FitBadge } from "@/components/results/FitBadge";

describe("FitBadge", () => {
  it("renders Strong fit", () => {
    render(<FitBadge fitBand="Strong fit" />);
    expect(screen.getByText("Strong fit")).toBeInTheDocument();
  });

  it("renders Possible fit", () => {
    render(<FitBadge fitBand="Possible fit" />);
    expect(screen.getByText("Possible fit")).toBeInTheDocument();
  });

  it("renders Stretch", () => {
    render(<FitBadge fitBand="Stretch" />);
    expect(screen.getByText("Stretch")).toBeInTheDocument();
  });

  it("renders Unlikely fit for unknown band", () => {
    render(<FitBadge fitBand="something else" />);
    expect(screen.getByText("Unlikely fit")).toBeInTheDocument();
  });
});
