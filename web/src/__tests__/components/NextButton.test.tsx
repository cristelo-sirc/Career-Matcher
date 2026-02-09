import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextButton } from "@/components/prompts/NextButton";

describe("NextButton", () => {
  it("renders nothing when not visible", () => {
    const { container } = render(
      <NextButton visible={false} isLast={false} onNext={() => {}} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders 'Next' when not last prompt", () => {
    render(<NextButton visible={true} isLast={false} onNext={() => {}} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("renders 'See Results' on last prompt", () => {
    render(<NextButton visible={true} isLast={true} onNext={() => {}} />);
    expect(
      screen.getByRole("button", { name: "See Results" }),
    ).toBeInTheDocument();
  });

  it("calls onNext when clicked", () => {
    const onNext = vi.fn();
    render(<NextButton visible={true} isLast={false} onNext={onNext} />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onNext).toHaveBeenCalledOnce();
  });
});
