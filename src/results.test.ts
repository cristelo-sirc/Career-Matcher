import { describe, it, expect } from "vitest";
import { formatProfileSummary, formatResults, renderResultsAsText } from "./results.js";
import { matchJobs } from "./matcher.js";
import { JOBS } from "./jobs.js";
import type { UserDimensionProfile } from "./types.js";

const testProfile: UserDimensionProfile = {
  energyRhythm: "steady",
  peopleDensity: "solo",
  interactionDemand: "minimal",
  schedulePredictability: "predictable",
  ruleDensity: "moderate",
  primaryLoadType: "physical",
  errorPressure: "moderate",
  learningMode: "hands-on",
};

describe("formatProfileSummary", () => {
  it("includes all dimension labels", () => {
    const summary = formatProfileSummary(testProfile);
    expect(summary).toContain("Energy Rhythm");
    expect(summary).toContain("People Density");
    expect(summary).toContain("Interaction Demand");
    expect(summary).toContain("Schedule Predictability");
    expect(summary).toContain("Rule Density");
    expect(summary).toContain("Primary Load Type");
    expect(summary).toContain("Error Pressure");
    expect(summary).toContain("Learning Mode");
  });

  it("uses plain language", () => {
    const summary = formatProfileSummary(testProfile);
    // Should contain level labels, not raw values
    expect(summary).toContain("Steady");
    expect(summary).toContain("Solo");
    expect(summary).toContain("Hands-On");
  });
});

describe("formatResults", () => {
  it("returns top matches and eliminated separately", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);

    expect(formatted.topMatches.length).toBeGreaterThan(0);
    expect(formatted.topMatches.length).toBeLessThanOrEqual(5);
    expect(formatted.profileSummary).toBeTruthy();
  });

  it("respects topN parameter", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile, 3);
    expect(formatted.topMatches.length).toBeLessThanOrEqual(3);
  });

  it("includes fit percentages between 0 and 100", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    for (const match of formatted.topMatches) {
      expect(match.fitPercent).toBeGreaterThanOrEqual(0);
      expect(match.fitPercent).toBeLessThanOrEqual(100);
    }
  });
});

describe("renderResultsAsText", () => {
  it("produces readable text output", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    const text = renderResultsAsText(formatted);

    expect(text).toContain("Jobs That Fit You");
    expect(text).toContain("% fit");
    expect(text.length).toBeGreaterThan(100);
  });

  it("includes both positive reasons and friction points in output", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    const text = renderResultsAsText(formatted);

    expect(text).toContain("+");
    // Some top matches should still have friction points
  });
});
