import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { JobMetadata } from "@/components/results/JobMetadata";

describe("JobMetadata", () => {
  it("renders nothing when no data", () => {
    const { container } = render(<JobMetadata />);
    expect(container.firstChild).toBeNull();
  });

  it("renders education when provided", () => {
    render(<JobMetadata typicalEducation="Bachelor's degree" />);
    expect(screen.getByText("Education:")).toBeInTheDocument();
    expect(screen.getByText("Bachelor's degree")).toBeInTheDocument();
  });

  it("renders outlook when provided", () => {
    render(<JobMetadata outlookNote="Strong demand" />);
    expect(screen.getByText("Outlook:")).toBeInTheDocument();
    expect(screen.getByText("Strong demand")).toBeInTheDocument();
  });

  it("renders both when both provided", () => {
    render(
      <JobMetadata
        typicalEducation="Bachelor's degree"
        outlookNote="Strong demand"
      />,
    );
    expect(screen.getByText("Education:")).toBeInTheDocument();
    expect(screen.getByText("Outlook:")).toBeInTheDocument();
  });
});
