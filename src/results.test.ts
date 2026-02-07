import { describe, it, expect } from "vitest";
import { fitBand, formatProfileSummary, formatResults, renderResultsAsText } from "./results.js";
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
  workValue: "security",
};

describe("fitBand", () => {
  it("returns Strong fit for scores >= 0.85", () => {
    expect(fitBand(0.85)).toBe("Strong fit");
    expect(fitBand(1.0)).toBe("Strong fit");
  });

  it("returns Possible fit for scores >= 0.65", () => {
    expect(fitBand(0.65)).toBe("Possible fit");
    expect(fitBand(0.84)).toBe("Possible fit");
  });

  it("returns Stretch for scores >= 0.45", () => {
    expect(fitBand(0.45)).toBe("Stretch");
    expect(fitBand(0.64)).toBe("Stretch");
  });

  it("returns Unlikely fit for scores < 0.45", () => {
    expect(fitBand(0.44)).toBe("Unlikely fit");
    expect(fitBand(0)).toBe("Unlikely fit");
  });
});

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
    expect(summary).toContain("Work Value");
  });

  it("uses plain language", () => {
    const summary = formatProfileSummary(testProfile);
    // Should contain level labels, not raw values
    expect(summary).toContain("Steady");
    expect(summary).toContain("Solo");
    expect(summary).toContain("Security");
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

  it("includes fitBand for each match", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    for (const match of formatted.topMatches) {
      expect(["Strong fit", "Possible fit", "Stretch", "Unlikely fit"]).toContain(match.fitBand);
    }
  });
});

describe("renderResultsAsText", () => {
  it("produces readable text with fit bands instead of percentages", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    const text = renderResultsAsText(formatted);

    expect(text).toContain("Jobs That Fit You");
    // Should use fit band labels, not "% fit"
    expect(text).not.toContain("% fit");
    expect(text.length).toBeGreaterThan(100);
  });

  it("uses softened elimination language", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    const text = renderResultsAsText(formatted);

    expect(text).not.toContain("Ruled Out");
    expect(text).toContain("Less Likely Fits");
  });

  it("includes scope disclaimer and temporal footer", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    const text = renderResultsAsText(formatted);

    expect(text).toContain("not a career assessment");
    expect(text).toContain("preferences today");
  });

  it("includes both positive reasons and friction points in output", () => {
    const results = matchJobs(JOBS, testProfile);
    const formatted = formatResults(results, testProfile);
    const text = renderResultsAsText(formatted);

    expect(text).toContain("+");
  });
});

// ---------------------------------------------------------------------------
// Phase 4.3 — Adversarial "no matches" test
// ---------------------------------------------------------------------------

describe("renderResultsAsText — no matches scenario", () => {
  // 3 extreme jobs: all crowd, chaotic, strict, physical
  const extremeJobs: import("./types.js").Job[] = [
    {
      id: "extreme-1",
      title: "Extreme Job A",
      shortDescription: "Test extreme job A",
      profile: {
        energyRhythm: ["burst"],
        peopleDensity: ["crowd"],
        interactionDemand: ["constant"],
        schedulePredictability: ["chaotic"],
        ruleDensity: ["strict"],
        primaryLoadType: ["physical"],
        errorPressure: ["high"],
        workValue: ["achievement"],
      },
    },
    {
      id: "extreme-2",
      title: "Extreme Job B",
      shortDescription: "Test extreme job B",
      profile: {
        energyRhythm: ["burst"],
        peopleDensity: ["crowd"],
        interactionDemand: ["constant"],
        schedulePredictability: ["chaotic"],
        ruleDensity: ["strict"],
        primaryLoadType: ["physical"],
        errorPressure: ["high"],
        workValue: ["achievement"],
      },
    },
    {
      id: "extreme-3",
      title: "Extreme Job C",
      shortDescription: "Test extreme job C",
      profile: {
        energyRhythm: ["burst"],
        peopleDensity: ["crowd"],
        interactionDemand: ["constant"],
        schedulePredictability: ["chaotic"],
        ruleDensity: ["strict"],
        primaryLoadType: ["physical"],
        errorPressure: ["high"],
        workValue: ["achievement"],
      },
    },
  ];

  // Opposite profile on nearly every dimension
  const oppositeProfile: UserDimensionProfile = {
    energyRhythm: "steady",
    peopleDensity: "solo",
    interactionDemand: "minimal",
    schedulePredictability: "predictable",
    ruleDensity: "loose",
    primaryLoadType: "creative",
    errorPressure: "low",
    workValue: "autonomy",
  };

  it("all extreme jobs are eliminated against opposite profile", () => {
    const results = matchJobs(extremeJobs, oppositeProfile);
    for (const r of results) {
      expect(r.eliminated).toBe(true);
    }
  });

  it("formatResults produces empty topMatches", () => {
    const results = matchJobs(extremeJobs, oppositeProfile);
    const formatted = formatResults(results, oppositeProfile);
    expect(formatted.topMatches).toHaveLength(0);
    expect(formatted.eliminated).toHaveLength(3);
  });

  it("renderResultsAsText shows 'No strong matches found'", () => {
    const results = matchJobs(extremeJobs, oppositeProfile);
    const formatted = formatResults(results, oppositeProfile);
    const text = renderResultsAsText(formatted);
    expect(text).toContain("No strong matches found");
  });

  it("renderResultsAsText still includes scope disclaimer when no matches", () => {
    const results = matchJobs(extremeJobs, oppositeProfile);
    const formatted = formatResults(results, oppositeProfile);
    const text = renderResultsAsText(formatted);
    expect(text).toContain("not a career assessment");
    expect(text).toContain("preferences today");
  });
});
