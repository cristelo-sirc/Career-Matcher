import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(<Card data-testid="card">Default</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("rounded-xl");
    expect(card.className).toContain("shadow-sm");
  });

  it("applies interactive variant styles", () => {
    render(
      <Card variant="interactive" data-testid="card">
        Interactive
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("cursor-pointer");
    expect(card.className).toContain("hover:shadow-md");
  });

  it("applies selected variant styles", () => {
    render(
      <Card variant="selected" data-testid="card">
        Selected
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("border-primary-500");
  });

  it("passes through additional className", () => {
    render(
      <Card className="my-custom-class" data-testid="card">
        Custom
      </Card>,
    );
    expect(screen.getByTestId("card").className).toContain("my-custom-class");
  });
});
