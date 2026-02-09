import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OptionCard } from "@/components/prompts/OptionCard";

describe("OptionCard", () => {
  it("renders option text", () => {
    render(
      <OptionCard text="Work alone" selected={false} onSelect={() => {}} />,
    );
    expect(screen.getByText("Work alone")).toBeInTheDocument();
  });

  it("renders as a button", () => {
    render(
      <OptionCard text="Work alone" selected={false} onSelect={() => {}} />,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows aria-pressed=true when selected", () => {
    render(
      <OptionCard text="Work alone" selected={true} onSelect={() => {}} />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("shows aria-pressed=false when not selected", () => {
    render(
      <OptionCard text="Work alone" selected={false} onSelect={() => {}} />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(
      <OptionCard text="Work alone" selected={false} onSelect={onSelect} />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("shows checkmark when selected", () => {
    render(
      <OptionCard text="Work alone" selected={true} onSelect={() => {}} />,
    );
    expect(screen.getByText("\u2713")).toBeInTheDocument();
  });
});
