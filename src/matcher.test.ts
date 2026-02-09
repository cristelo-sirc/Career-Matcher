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

// ---------------------------------------------------------------------------
// Phase 4.2 — Ambiguous/center profile testing
// ---------------------------------------------------------------------------

/** Moderate Middle — every dimension at the center. */
const moderateMiddle: UserDimensionProfile = {
  energyRhythm: "mixed",
  peopleDensity: "small-group",
  interactionDemand: "moderate",
  schedulePredictability: "variable",
  ruleDensity: "moderate",
  primaryLoadType: "analytical",
  errorPressure: "moderate",
  workValue: "security",
};

/** Conflicted — solo + constant interaction (rarely co-occur). */
const conflicted: UserDimensionProfile = {
  energyRhythm: "steady",
  peopleDensity: "solo",
  interactionDemand: "constant",
  schedulePredictability: "predictable",
  ruleDensity: "strict",
  primaryLoadType: "physical",
  errorPressure: "high",
  workValue: "altruism",
};

describe("matchJobs — ambiguous/center profiles", () => {
  it("Moderate Middle: many jobs survive elimination", () => {
    const results = matchJobs(JOBS, moderateMiddle);
    const surviving = results.filter((r) => !r.eliminated);
    // Center ordinal values reduce mismatches, but primaryLoadType is categorical
    // so jobs that don't accept "analytical" get 1 full mismatch from that alone.
    // Still, substantially more survive than for an extreme/conflicted profile.
    expect(surviving.length).toBeGreaterThan(10);
  });

  it("Moderate Middle: no crash and deterministic ranking", () => {
    const results1 = matchJobs(JOBS, moderateMiddle);
    const results2 = matchJobs(JOBS, moderateMiddle);
    const ids1 = results1.map((r) => r.job.id);
    const ids2 = results2.map((r) => r.job.id);
    expect(ids1).toEqual(ids2);
  });

  it("Conflicted (solo + constant): many jobs eliminated", () => {
    const results = matchJobs(JOBS, conflicted);
    const eliminated = results.filter((r) => r.eliminated);
    // Solo + constant interaction is contradictory — most jobs require either
    // minimal interaction (for solo work) or crowd density (for constant interaction)
    expect(eliminated.length).toBeGreaterThan(0);
  });

  it("Conflicted: friction points reflect the tension", () => {
    const results = matchJobs(JOBS, conflicted);
    // Check a job that's crowd-based — should have People Density friction
    const eventPlanner = results.find((r) => r.job.id === "event-planner")!;
    const hasPeopleFriction = eventPlanner.frictionPoints.some(
      (fp) => fp.includes("People Density"),
    );
    expect(hasPeopleFriction).toBe(true);
  });

  it("Conflicted: system handles gracefully (returns results for all jobs)", () => {
    const results = matchJobs(JOBS, conflicted);
    expect(results.length).toBe(JOBS.length);
  });
});

// ---------------------------------------------------------------------------
// Phase 4.4 — Elimination boundary tests
// ---------------------------------------------------------------------------

/**
 * Synthetic job builder: creates a job that matches a given profile exactly,
 * with controlled mismatches on specified dimensions.
 */
function syntheticJob(
  id: string,
  baseProfile: UserDimensionProfile,
  overrides: Partial<Record<keyof UserDimensionProfile, string[]>>,
): Job {
  const profile: Record<string, readonly string[]> = {};
  for (const [dim, value] of Object.entries(baseProfile)) {
    profile[dim] = overrides[dim as keyof UserDimensionProfile] ?? [value];
  }
  return {
    id,
    title: `Synthetic ${id}`,
    shortDescription: `Test job ${id}`,
    profile: profile as Job["profile"],
  };
}

/** Reference profile for boundary tests. */
const boundaryRef: UserDimensionProfile = {
  energyRhythm: "steady",
  peopleDensity: "solo",          // ordinal: solo < small-group < crowd
  interactionDemand: "minimal",   // ordinal: minimal < moderate < constant
  schedulePredictability: "predictable", // ordinal: predictable < variable < chaotic
  ruleDensity: "loose",           // ordinal: loose < moderate < strict
  primaryLoadType: "physical",    // non-ordinal
  errorPressure: "low",           // ordinal: low < moderate < high
  workValue: "security",
};

describe("scoreJob — elimination boundaries", () => {
  it("1 full mismatch → NOT eliminated", () => {
    // Mismatch only on primaryLoadType (non-ordinal, 1 full mismatch = 1.0)
    const job = syntheticJob("one-mismatch", boundaryRef, {
      primaryLoadType: ["analytical"], // full mismatch
    });
    const result = scoreJob(job, boundaryRef);
    expect(result.eliminated).toBe(false);
  });

  it("2 full mismatches → eliminated (weighted 2.0)", () => {
    const job = syntheticJob("two-full", boundaryRef, {
      primaryLoadType: ["analytical"], // full mismatch (1.0)
      energyRhythm: ["burst"],         // full mismatch (1.0) — non-ordinal
    });
    const result = scoreJob(job, boundaryRef);
    expect(result.eliminated).toBe(true);
  });

  it("2 adjacent mismatches on ordinal dims → NOT eliminated (weighted 1.0)", () => {
    // peopleDensity: user=solo, job=small-group (adjacent, 0.5)
    // interactionDemand: user=minimal, job=moderate (adjacent, 0.5)
    // Total: 1.0 < 2.0
    const job = syntheticJob("two-adjacent", boundaryRef, {
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
    });
    const result = scoreJob(job, boundaryRef);
    expect(result.eliminated).toBe(false);
    expect(result.frictionPoints.length).toBeGreaterThan(0);
  });

  it("1 full + 1 adjacent mismatch → NOT eliminated (weighted 1.5)", () => {
    // primaryLoadType: full mismatch (1.0) — non-ordinal
    // peopleDensity: adjacent (0.5)
    // Total: 1.5 < 2.0
    const job = syntheticJob("full-plus-adjacent", boundaryRef, {
      primaryLoadType: ["creative"],
      peopleDensity: ["small-group"],
    });
    const result = scoreJob(job, boundaryRef);
    expect(result.eliminated).toBe(false);
  });

  it("1 full + 2 adjacent mismatches → eliminated (weighted 2.0)", () => {
    // primaryLoadType: full mismatch (1.0)
    // peopleDensity: adjacent (0.5)
    // interactionDemand: adjacent (0.5)
    // Total: 2.0 >= 2.0
    const job = syntheticJob("full-plus-two-adj", boundaryRef, {
      primaryLoadType: ["creative"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
    });
    const result = scoreJob(job, boundaryRef);
    expect(result.eliminated).toBe(true);
  });

  it("4 adjacent mismatches → eliminated (weighted 2.0)", () => {
    // 4 ordinal dimensions each adjacent (4 * 0.5 = 2.0)
    const job = syntheticJob("four-adjacent", boundaryRef, {
      peopleDensity: ["small-group"],      // adjacent (0.5)
      interactionDemand: ["moderate"],      // adjacent (0.5)
      schedulePredictability: ["variable"], // adjacent (0.5)
      ruleDensity: ["moderate"],            // adjacent (0.5)
    });
    const result = scoreJob(job, boundaryRef);
    expect(result.eliminated).toBe(true);
  });

  it("3 adjacent mismatches → NOT eliminated (weighted 1.5)", () => {
    const job = syntheticJob("three-adjacent", boundaryRef, {
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
    });
    const result = scoreJob(job, boundaryRef);
    expect(result.eliminated).toBe(false);
  });

  it("2-step ordinal gap counts as full mismatch (1.0)", () => {
    // peopleDensity: user=solo, job=crowd (2 steps away on ordinal)
    // This should be a full 1.0 mismatch, not 0.5
    const job = syntheticJob("two-step-gap", boundaryRef, {
      peopleDensity: ["crowd"],
    });
    const result = scoreJob(job, boundaryRef);
    // Only 1 full mismatch, so not eliminated — but verify friction
    expect(result.eliminated).toBe(false);
    const peopleFriction = result.frictionPoints.find((fp) =>
      fp.includes("People Density"),
    );
    expect(peopleFriction).toBeDefined();
    // Should say "typically" (full mismatch), not "close at" (adjacency)
    expect(peopleFriction).toContain("typically");
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
