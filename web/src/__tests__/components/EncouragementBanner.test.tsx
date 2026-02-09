import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EncouragementBanner } from "@/components/prompts/EncouragementBanner";

describe("EncouragementBanner", () => {
  it("shows message for section 2", () => {
    render(<EncouragementBanner completedSections={2} />);
    expect(screen.getByText(/2 sections down/)).toBeInTheDocument();
  });

  it("shows message for section 4 (halfway)", () => {
    render(<EncouragementBanner completedSections={4} />);
    expect(screen.getByText("Halfway there.")).toBeInTheDocument();
  });

  it("shows message for section 6", () => {
    render(<EncouragementBanner completedSections={6} />);
    expect(screen.getByText(/just 2 sections left/)).toBeInTheDocument();
  });

  it("renders nothing for non-transition sections", () => {
    const { container } = render(
      <EncouragementBanner completedSections={1} />,
    );
    expect(container.innerHTML).toBe("");
  });
});
