import { describe, it, expect } from "vitest";
import {
  createEmptyScores,
  applyNudge,
  processResponses,
  resolveLevel,
  resolveProfile,
} from "./scoring.js";
import { PROMPTS } from "./prompts.js";
import { ALL_DIMENSIONS } from "./dimensions.js";

describe("createEmptyScores", () => {
  it("creates a score sheet with all dimensions", () => {
    const scores = createEmptyScores();
    for (const dim of ALL_DIMENSIONS) {
      expect(scores[dim]).toEqual({});
    }
  });
});

describe("applyNudge", () => {
  it("adds weight to the correct dimension and level", () => {
    const scores = createEmptyScores();
    applyNudge(scores, {
      text: "test",
      dimension: "energyRhythm",
      nudgeToward: "burst",
      weight: 1,
    });
    expect(scores.energyRhythm["burst"]).toBe(1);
  });

  it("accumulates weights across multiple nudges", () => {
    const scores = createEmptyScores();
    applyNudge(scores, {
      text: "a",
      dimension: "energyRhythm",
      nudgeToward: "steady",
      weight: 1,
    });
    applyNudge(scores, {
      text: "b",
      dimension: "energyRhythm",
      nudgeToward: "steady",
      weight: 0.8,
    });
    expect(scores.energyRhythm["steady"]).toBeCloseTo(1.8);
  });
});

describe("resolveLevel", () => {
  it("picks the level with the highest score", () => {
    expect(resolveLevel({ steady: 1.5, burst: 0.8, mixed: 0.3 })).toBe("steady");
  });

  it("returns null for empty buckets", () => {
    expect(resolveLevel({})).toBeNull();
  });

  it("breaks ties by picking the first encountered", () => {
    const result = resolveLevel({ steady: 1, burst: 1 });
    // First key in insertion order wins
    expect(result).toBe("steady");
  });
});

describe("processResponses", () => {
  it("processes a full set of responses", () => {
    // Pick option 0 for every prompt
    const responses: Record<string, number> = {};
    for (const prompt of PROMPTS) {
      responses[prompt.id] = 0;
    }
    const { scores, warnings } = processResponses(PROMPTS, responses);

    expect(warnings).toEqual([]);

    // Every dimension should have at least some signal
    for (const dim of ALL_DIMENSIONS) {
      const totalSignal = Object.values(scores[dim]).reduce((s, v) => s + v, 0);
      expect(totalSignal).toBeGreaterThan(0);
    }
  });

  it("skips prompts without a response", () => {
    const { scores, warnings } = processResponses(PROMPTS, {});
    expect(warnings).toEqual([]);
    for (const dim of ALL_DIMENSIONS) {
      const totalSignal = Object.values(scores[dim]).reduce((s, v) => s + v, 0);
      expect(totalSignal).toBe(0);
    }
  });

  it("warns on out-of-bounds option index", () => {
    const { warnings } = processResponses(PROMPTS, { "er-1": 99 });
    expect(warnings.length).toBe(1);
    expect(warnings[0]).toContain("er-1");
    expect(warnings[0]).toContain("out of bounds");
  });
});

describe("resolveProfile", () => {
  it("produces a complete profile from scores", () => {
    const responses: Record<string, number> = {};
    for (const prompt of PROMPTS) {
      responses[prompt.id] = 0;
    }
    const { scores } = processResponses(PROMPTS, responses);
    const profile = resolveProfile(scores);

    expect(profile).toHaveProperty("energyRhythm");
    expect(profile).toHaveProperty("peopleDensity");
    expect(profile).toHaveProperty("interactionDemand");
    expect(profile).toHaveProperty("schedulePredictability");
    expect(profile).toHaveProperty("ruleDensity");
    expect(profile).toHaveProperty("primaryLoadType");
    expect(profile).toHaveProperty("errorPressure");
    expect(profile).toHaveProperty("workValue");
  });

  it("falls back to defaults when no signal is present", () => {
    const scores = createEmptyScores();
    const profile = resolveProfile(scores);
    // Defaults from the resolveProfile function
    expect(profile.energyRhythm).toBe("mixed");
    expect(profile.peopleDensity).toBe("small-group");
    expect(profile.interactionDemand).toBe("moderate");
    expect(profile.schedulePredictability).toBe("variable");
    expect(profile.ruleDensity).toBe("moderate");
    expect(profile.primaryLoadType).toBe("analytical");
    expect(profile.errorPressure).toBe("moderate");
    expect(profile.workValue).toBe("security");
  });
});
