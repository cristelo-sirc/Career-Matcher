import { describe, it, expect } from "vitest";
import {
  PROMPTS,
  JOBS,
  processResponses,
  resolveProfile,
  matchJobs,
  formatResults,
  renderResultsAsText,
  createShuffledPrompts,
  validateDataIntegrity,
} from "@core/index.js";

describe("Core library imports", () => {
  it("imports PROMPTS with 32 entries", () => {
    expect(PROMPTS).toHaveLength(32);
  });

  it("imports JOBS with 54 entries", () => {
    expect(JOBS).toHaveLength(54);
  });

  it("imports scoring pipeline functions", () => {
    expect(typeof processResponses).toBe("function");
    expect(typeof resolveProfile).toBe("function");
    expect(typeof createShuffledPrompts).toBe("function");
  });

  it("imports matching and results functions", () => {
    expect(typeof matchJobs).toBe("function");
    expect(typeof formatResults).toBe("function");
    expect(typeof renderResultsAsText).toBe("function");
  });

  it("validates data integrity", () => {
    const errors = validateDataIntegrity(PROMPTS, JOBS);
    expect(errors).toHaveLength(0);
  });

  it("runs a full pipeline: responses → profile → matches → results", () => {
    // Build a complete set of responses (all first options selected)
    const responses: Record<string, number> = {};
    for (const prompt of PROMPTS) {
      responses[prompt.id] = 0;
    }

    const { scores } = processResponses(PROMPTS, responses);
    const profile = resolveProfile(scores);
    const matches = matchJobs(JOBS, profile);
    const formatted = formatResults(matches, profile);

    expect(formatted.topMatches.length).toBeGreaterThan(0);
    expect(formatted.eliminated.length).toBeGreaterThanOrEqual(0);
    expect(formatted.profileSummary.length).toBeGreaterThan(0);

    // Text rendering should also work
    const text = renderResultsAsText(formatted);
    expect(text.length).toBeGreaterThan(0);
  });
});
