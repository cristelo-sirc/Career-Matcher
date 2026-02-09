import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FrictionList } from "@/components/results/FrictionList";

describe("FrictionList", () => {
  it("renders nothing for empty list", () => {
    const { container } = render(<FrictionList items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders all friction items", () => {
    render(<FrictionList items={["High pressure", "Strict rules"]} />);
    expect(screen.getByText("High pressure")).toBeInTheDocument();
    expect(screen.getByText("Strict rules")).toBeInTheDocument();
  });
});
