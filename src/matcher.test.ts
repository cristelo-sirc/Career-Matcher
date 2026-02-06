import { describe, it, expect } from "vitest";
import { scoreJob, matchJobs } from "./matcher.js";
import { JOBS } from "./jobs.js";
import type { UserDimensionProfile, Job } from "./types.js";

// ---------------------------------------------------------------------------
// Archetypal profiles for dry-run testing (Phase 3)
// ---------------------------------------------------------------------------

/** Quiet hands-on worker — prefers solo, physical, predictable work. */
const quietBuilder: UserDimensionProfile = {
  energyRhythm: "steady",
  peopleDensity: "solo",
  interactionDemand: "minimal",
  schedulePredictability: "predictable",
  ruleDensity: "moderate",
  primaryLoadType: "physical",
  errorPressure: "moderate",
  workValue: "security",
};

/** Social organizer — loves people, coordination, variable schedules. */
const socialOrganizer: UserDimensionProfile = {
  energyRhythm: "burst",
  peopleDensity: "crowd",
  interactionDemand: "constant",
  schedulePredictability: "chaotic",
  ruleDensity: "loose",
  primaryLoadType: "organizational",
  errorPressure: "low",
  workValue: "achievement",
};

/** Careful analyst — prefers solo analytical work with high precision. */
const carefulAnalyst: UserDimensionProfile = {
  energyRhythm: "steady",
  peopleDensity: "solo",
  interactionDemand: "minimal",
  schedulePredictability: "predictable",
  ruleDensity: "strict",
  primaryLoadType: "analytical",
  errorPressure: "high",
  workValue: "achievement",
};

/** Creative burst worker — solo, creative, loose rules. */
const creativeBurst: UserDimensionProfile = {
  energyRhythm: "burst",
  peopleDensity: "solo",
  interactionDemand: "minimal",
  schedulePredictability: "variable",
  ruleDensity: "loose",
  primaryLoadType: "creative",
  errorPressure: "low",
  workValue: "security",
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("scoreJob", () => {
  it("returns a fitScore between 0 and 1", () => {
    for (const job of JOBS) {
      const result = scoreJob(job, quietBuilder);
      expect(result.fitScore).toBeGreaterThanOrEqual(0);
      expect(result.fitScore).toBeLessThanOrEqual(1);
    }
  });

  it("produces fitReasons for matching dimensions", () => {
    // Welder should be a good fit for quietBuilder
    const welder = JOBS.find((j) => j.id === "welder")!;
    const result = scoreJob(welder, quietBuilder);
    expect(result.fitReasons.length).toBeGreaterThan(0);
  });

  it("produces frictionPoints for mismatching dimensions", () => {
    // Event planner should be a poor fit for quietBuilder
    const eventPlanner = JOBS.find((j) => j.id === "event-planner")!;
    const result = scoreJob(eventPlanner, quietBuilder);
    expect(result.frictionPoints.length).toBeGreaterThan(0);
  });

  it("eliminates jobs with 2+ primary mismatches", () => {
    // Event planner is crowd/constant/chaotic/organizational — many mismatches for quietBuilder
    const eventPlanner = JOBS.find((j) => j.id === "event-planner")!;
    const result = scoreJob(eventPlanner, quietBuilder);
    expect(result.eliminated).toBe(true);
  });

  it("does not eliminate jobs with only 1 primary mismatch", () => {
    // Carpenter should be close to quietBuilder (maybe 1 mismatch on schedule)
    const carpenter = JOBS.find((j) => j.id === "carpenter")!;
    const result = scoreJob(carpenter, quietBuilder);
    expect(result.eliminated).toBe(false);
  });
});

describe("matchJobs — archetypal dry runs", () => {
  it("ranks physical/solo jobs high for the Quiet Builder", () => {
    const results = matchJobs(JOBS, quietBuilder);
    const nonEliminated = results.filter((r) => !r.eliminated);
    const topIds = nonEliminated.slice(0, 5).map((r) => r.job.id);

    // Expect at least some trades/physical jobs in the top 5
    const physicalJobs = ["welder", "landscaper", "carpenter", "warehouse-worker"];
    const hasPhysical = topIds.some((id) => physicalJobs.includes(id));
    expect(hasPhysical).toBe(true);
  });

  it("ranks analytical jobs high for the Careful Analyst", () => {
    const results = matchJobs(JOBS, carefulAnalyst);
    const nonEliminated = results.filter((r) => !r.eliminated);
    const topIds = nonEliminated.slice(0, 5).map((r) => r.job.id);

    const analyticalJobs = ["lab-technician", "accounting-clerk", "data-analyst"];
    const hasAnalytical = topIds.some((id) => analyticalJobs.includes(id));
    expect(hasAnalytical).toBe(true);
  });

  it("ranks creative jobs high for the Creative Burst Worker", () => {
    const results = matchJobs(JOBS, creativeBurst);
    const nonEliminated = results.filter((r) => !r.eliminated);
    const topIds = nonEliminated.slice(0, 5).map((r) => r.job.id);

    const creativeJobs = ["graphic-designer", "video-editor", "photographer"];
    const hasCreative = topIds.some((id) => creativeJobs.includes(id));
    expect(hasCreative).toBe(true);
  });

  it("eliminates solo/quiet jobs for the Social Organizer", () => {
    const results = matchJobs(JOBS, socialOrganizer);
    const eliminatedIds = results.filter((r) => r.eliminated).map((r) => r.job.id);

    // Solo/quiet/strict jobs should be eliminated for this profile
    const soloQuietJobs = ["welder", "lab-technician", "truck-driver"];
    const someEliminated = soloQuietJobs.some((id) => eliminatedIds.includes(id));
    expect(someEliminated).toBe(true);
  });

  it("non-eliminated results come before eliminated results", () => {
    const results = matchJobs(JOBS, quietBuilder);
    let seenEliminated = false;
    for (const r of results) {
      if (r.eliminated) seenEliminated = true;
      if (!r.eliminated && seenEliminated) {
        throw new Error("Non-eliminated result found after eliminated results");
      }
    }
  });

  it("results within each group are sorted by fitScore descending", () => {
    const results = matchJobs(JOBS, quietBuilder);
    const nonEliminated = results.filter((r) => !r.eliminated);
    const eliminated = results.filter((r) => r.eliminated);

    for (let i = 1; i < nonEliminated.length; i++) {
      expect(nonEliminated[i].fitScore).toBeLessThanOrEqual(nonEliminated[i - 1].fitScore);
    }
    for (let i = 1; i < eliminated.length; i++) {
      expect(eliminated[i].fitScore).toBeLessThanOrEqual(eliminated[i - 1].fitScore);
    }
  });
});

describe("matchJobs — completeness", () => {
  it("returns a result for every job", () => {
    const results = matchJobs(JOBS, quietBuilder);
    expect(results.length).toBe(JOBS.length);
  });

  it("every result has explainable reasons", () => {
    const results = matchJobs(JOBS, carefulAnalyst);
    for (const r of results) {
      // Every job should have at least one fit reason or friction point
      expect(r.fitReasons.length + r.frictionPoints.length).toBeGreaterThan(0);
    }
  });
});
