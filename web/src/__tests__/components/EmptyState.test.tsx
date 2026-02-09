import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "@/components/results/EmptyState";

describe("EmptyState", () => {
  it("renders no-matches message", () => {
    render(<EmptyState onStartOver={() => {}} onViewProfile={() => {}} />);
    expect(
      screen.getByText(/no strong matches found/i),
    ).toBeInTheDocument();
  });

  it("renders possible explanations", () => {
    render(<EmptyState onStartOver={() => {}} onViewProfile={() => {}} />);
    expect(screen.getByText(/niche we haven't covered/i)).toBeInTheDocument();
    expect(screen.getByText(/counselor/)).toBeInTheDocument();
    expect(screen.getByText(/shift over time/)).toBeInTheDocument();
  });

  it("calls onStartOver when Try Again clicked", async () => {
    const user = userEvent.setup();
    const onStartOver = vi.fn();
    render(<EmptyState onStartOver={onStartOver} onViewProfile={() => {}} />);

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(onStartOver).toHaveBeenCalled();
  });

  it("calls onViewProfile when View your profile clicked", async () => {
    const user = userEvent.setup();
    const onViewProfile = vi.fn();
    render(<EmptyState onStartOver={() => {}} onViewProfile={onViewProfile} />);

    await user.click(
      screen.getByRole("button", { name: /view your profile/i }),
    );
    expect(onViewProfile).toHaveBeenCalled();
  });
});
