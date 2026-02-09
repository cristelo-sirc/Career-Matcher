import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SectionReplay } from "@/components/results/SectionReplay";

describe("SectionReplay", () => {
  it("renders heading", () => {
    render(<SectionReplay onReplaySection={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /something feel off/i }),
    ).toBeInTheDocument();
  });

  it("renders buttons for all 8 sections", () => {
    render(<SectionReplay onReplaySection={() => {}} />);
    expect(screen.getByRole("button", { name: /redo: energy/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redo: social/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redo: interaction/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redo: schedule/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redo: structure/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redo: work type/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redo: pressure/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /redo: values/i })).toBeInTheDocument();
  });

  it("calls onReplaySection with correct index", async () => {
    const user = userEvent.setup();
    const onReplay = vi.fn();
    render(<SectionReplay onReplaySection={onReplay} />);

    await user.click(screen.getByRole("button", { name: /redo: social/i }));
    expect(onReplay).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole("button", { name: /redo: pressure/i }));
    expect(onReplay).toHaveBeenCalledWith(6);
  });
});
