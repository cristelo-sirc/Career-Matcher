import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tooltip } from "@/components/ui/Tooltip";

describe("Tooltip", () => {
  it("renders trigger content", () => {
    render(<Tooltip content="Help text">Hover me</Tooltip>);
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not show tooltip content by default", () => {
    render(<Tooltip content="Help text">Hover me</Tooltip>);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on mouse enter", () => {
    render(<Tooltip content="Help text">Hover me</Tooltip>);
    fireEvent.mouseEnter(screen.getByText("Hover me").parentElement!);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help text");
  });

  it("shows tooltip on focus", () => {
    render(<Tooltip content="Help text">Hover me</Tooltip>);
    fireEvent.focus(screen.getByText("Hover me"));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help text");
  });

  it("sets aria-describedby on trigger when visible", () => {
    render(<Tooltip content="Help text">Hover me</Tooltip>);
    const trigger = screen.getByText("Hover me");
    expect(trigger).not.toHaveAttribute("aria-describedby");

    fireEvent.focus(trigger);
    expect(trigger).toHaveAttribute("aria-describedby");
    const tooltipId = trigger.getAttribute("aria-describedby")!;
    expect(screen.getByRole("tooltip")).toHaveAttribute("id", tooltipId);
  });
});
