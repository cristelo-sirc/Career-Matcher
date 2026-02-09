import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, type FitBandVariant } from "@/components/ui/Badge";

describe("Badge", () => {
  const variants: { variant: FitBandVariant; label: string; icon: string }[] = [
    { variant: "strong", label: "Strong fit", icon: "\u2713" },
    { variant: "possible", label: "Possible fit", icon: "~" },
    { variant: "stretch", label: "Stretch", icon: "\u2197" },
    { variant: "unlikely", label: "Unlikely fit", icon: "\u25CB" },
  ];

  for (const { variant, label, icon } of variants) {
    it(`renders "${label}" with icon for ${variant} variant`, () => {
      render(<Badge variant={variant} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(icon)).toBeInTheDocument();
    });
  }

  it("renders icon as aria-hidden", () => {
    render(<Badge variant="strong" />);
    const icon = screen.getByText("\u2713");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("always shows both text and icon (triple-coded, not color alone)", () => {
    for (const { variant } of variants) {
      const { container } = render(<Badge variant={variant} />);
      const spans = container.querySelectorAll("span");
      // outer span + icon span + text node — at least icon + text exist
      expect(spans.length).toBeGreaterThanOrEqual(2);
    }
  });
});
