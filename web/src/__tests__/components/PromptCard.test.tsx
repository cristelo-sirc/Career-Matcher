import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PromptCard } from "@/components/prompts/PromptCard";
import type { SituationalPrompt } from "@core/types.js";

const mockPrompt: SituationalPrompt = {
  id: "test-prompt",
  scenario: "You get to pick where you work.",
  options: [
    { text: "A quiet room", dimension: "peopleDensity", nudgeToward: "solo", weight: 1.0 },
    { text: "A small table", dimension: "peopleDensity", nudgeToward: "small-group", weight: 1.0 },
    { text: "A busy cafe", dimension: "peopleDensity", nudgeToward: "crowd", weight: 1.0 },
  ],
};

describe("PromptCard", () => {
  it("renders scenario text", () => {
    render(
      <PromptCard prompt={mockPrompt} selectedOption={undefined} onSelectOption={() => {}} />,
    );
    expect(
      screen.getByText("You get to pick where you work."),
    ).toBeInTheDocument();
  });

  it("renders all option buttons", () => {
    render(
      <PromptCard prompt={mockPrompt} selectedOption={undefined} onSelectOption={() => {}} />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByText("A quiet room")).toBeInTheDocument();
    expect(screen.getByText("A small table")).toBeInTheDocument();
    expect(screen.getByText("A busy cafe")).toBeInTheDocument();
  });

  it("calls onSelectOption with index when option clicked", () => {
    const onSelect = vi.fn();
    render(
      <PromptCard prompt={mockPrompt} selectedOption={undefined} onSelectOption={onSelect} />,
    );
    fireEvent.click(screen.getByText("A busy cafe"));
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it("marks selected option as pressed", () => {
    render(
      <PromptCard prompt={mockPrompt} selectedOption={1} onSelectOption={() => {}} />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
  });

  it("announces selection via live region", () => {
    render(
      <PromptCard prompt={mockPrompt} selectedOption={0} onSelectOption={() => {}} />,
    );
    const liveRegion = document.querySelector("[aria-live='polite']");
    expect(liveRegion?.textContent).toContain("A quiet room");
  });

  it("has a group role with aria-labelledby", () => {
    render(
      <PromptCard prompt={mockPrompt} selectedOption={undefined} onSelectOption={() => {}} />,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-labelledby", "scenario-heading");
  });
});
