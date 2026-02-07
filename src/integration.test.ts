/**
 * End-to-end integration tests — Phase 4.1.
 *
 * Tests the full pipeline: prompt responses → processResponses →
 * resolveProfile → matchJobs → formatResults → renderResultsAsText.
 *
 * Each test constructs specific response indices that should produce a
 * known archetypal profile, then verifies the output end-to-end.
 */

import { describe, it, expect } from "vitest";
import { PROMPTS } from "./prompts.js";
import { JOBS } from "./jobs.js";
import { processResponses, resolveProfile } from "./scoring.js";
import { matchJobs } from "./matcher.js";
import { formatResults, renderResultsAsText } from "./results.js";

// ---------------------------------------------------------------------------
// Helper: build a response map from prompt IDs → chosen option indices
// ---------------------------------------------------------------------------

function buildResponses(choices: Record<string, number>): Record<string, number> {
  return choices;
}

// ---------------------------------------------------------------------------
// Quiet Builder: steady, solo, minimal, predictable, moderate rules,
//                physical, moderate error pressure, security
// ---------------------------------------------------------------------------

const quietBuilderResponses = buildResponses({
  // Energy Rhythm → steady
  "er-1": 0, // steady (1.0)
  "er-2": 0, // steady (0.8)
  "er-3": 1, // steady (1.0)
  "er-4": 1, // steady (1.0)
  // People Density → solo
  "pd-1": 0, // solo (1.0)
  "pd-2": 0, // solo (1.0)
  "pd-3": 2, // solo (1.0)
  "pd-4": 2, // solo (1.0)
  // Interaction Demand → minimal
  "id-1": 0, // minimal (1.0)
  "id-2": 0, // minimal (1.0)
  "id-3": 0, // minimal (0.8)
  "id-4": 1, // minimal (1.0)
  // Schedule Predictability → predictable
  "sp-1": 0, // predictable (1.0)
  "sp-2": 0, // predictable (1.0)
  "sp-3": 1, // predictable (1.0)
  "sp-4": 2, // predictable (1.0)
  // Rule Density → moderate
  "rd-1": 1, // moderate (1.0)
  "rd-2": 1, // moderate (0.8)
  "rd-3": 2, // moderate (0.8)
  "rd-4": 2, // moderate (0.7)
  // Primary Load Type → physical
  "plt-1": 0, // physical (1.0)
  "plt-2": 0, // physical (0.8)
  "plt-3": 2, // physical (0.8)
  "plt-4": 1, // physical (1.0)
  // Error Pressure → moderate
  "ep-1": 1, // moderate (0.8)
  "ep-2": 1, // moderate (0.8)
  "ep-3": 1, // moderate (0.8)
  "ep-4": 2, // moderate (0.7)
  // Work Value → security
  "wv-1": 3, // security (1.0)
  "wv-2": 1, // security (1.0)
  "wv-3": 3, // security (1.0)
  "wv-4": 0, // security (0.8)
});

// ---------------------------------------------------------------------------
// Social Organizer: burst, crowd, constant, chaotic, loose rules,
//                   organizational, low error pressure, achievement
// ---------------------------------------------------------------------------

const socialOrganizerResponses = buildResponses({
  // Energy Rhythm → burst
  "er-1": 1, // burst (1.0)
  "er-2": 1, // burst (1.0)
  "er-3": 0, // burst (1.0)
  "er-4": 2, // burst (1.0)
  // People Density → crowd
  "pd-1": 2, // crowd (1.0)
  "pd-2": 2, // crowd (1.0)
  "pd-3": 0, // crowd (1.0)
  "pd-4": 1, // crowd (1.0)
  // Interaction Demand → constant
  "id-1": 2, // constant (1.0)
  "id-2": 2, // constant (1.0)
  "id-3": 1, // constant (0.8)
  "id-4": 0, // constant (1.0)
  // Schedule Predictability → chaotic
  "sp-1": 2, // chaotic (1.0)
  "sp-2": 2, // chaotic (1.0)
  "sp-3": 0, // chaotic (1.0)
  "sp-4": 1, // chaotic (1.0)
  // Rule Density → loose
  "rd-1": 0, // loose (1.0)
  "rd-2": 0, // loose (1.0)
  "rd-3": 1, // loose (1.0)
  "rd-4": 0, // loose (0.8)
  // Primary Load Type → organizational
  "plt-1": 3, // organizational (1.0)
  "plt-2": 3, // organizational (0.8)
  "plt-3": 0, // organizational (0.8)
  "plt-4": 2, // organizational (1.0)
  // Error Pressure → low
  "ep-1": 0, // low (1.0)
  "ep-2": 0, // low (1.0)
  "ep-3": 2, // low (1.0)
  "ep-4": 1, // low (1.0)
  // Work Value → achievement
  "wv-1": 0, // achievement (1.0)
  "wv-2": 3, // achievement (1.0)
  "wv-3": 1, // achievement (1.0)
  "wv-4": 3, // achievement (0.8)
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("integration — Quiet Builder pipeline", () => {
  const { scores, warnings } = processResponses(PROMPTS, quietBuilderResponses);
  const profile = resolveProfile(scores);
  const results = matchJobs(JOBS, profile);
  const formatted = formatResults(results, profile);
  const text = renderResultsAsText(formatted);

  it("produces no warnings for valid responses", () => {
    expect(warnings).toHaveLength(0);
  });

  it("resolves expected profile dimensions", () => {
    expect(profile.energyRhythm).toBe("steady");
    expect(profile.peopleDensity).toBe("solo");
    expect(profile.interactionDemand).toBe("minimal");
    expect(profile.schedulePredictability).toBe("predictable");
    expect(profile.ruleDensity).toBe("moderate");
    expect(profile.primaryLoadType).toBe("physical");
    expect(profile.errorPressure).toBe("moderate");
    expect(profile.workValue).toBe("security");
  });

  it("top matches include physical/solo jobs", () => {
    const topTitles = formatted.topMatches.map((m) => m.title);
    const physicalSoloJobs = [
      "Welder", "Landscaper", "Carpenter", "Warehouse Worker", "Truck Driver",
    ];
    const hasPhysicalSolo = topTitles.some((t) => physicalSoloJobs.includes(t));
    expect(hasPhysicalSolo).toBe(true);
  });

  it("output text contains fit band labels, not percentages", () => {
    expect(text).toMatch(/Strong fit|Possible fit|Stretch/);
    expect(text).not.toContain("% fit");
  });

  it("output text contains scope disclaimer", () => {
    expect(text).toContain("not a career assessment");
  });

  it("output text contains temporal footer", () => {
    expect(text).toContain("preferences today");
  });

  it("output text contains expected job titles", () => {
    // At least one physical/solo job should appear in the output
    const physicalJobs = ["Welder", "Landscaper", "Carpenter", "Warehouse Worker"];
    const hasPhysical = physicalJobs.some((title) => text.includes(title));
    expect(hasPhysical).toBe(true);
  });

  it("output text contains education and outlook metadata", () => {
    // Top matches should have metadata displayed
    expect(text).toContain("Education:");
    expect(text).toContain("Outlook:");
  });
});

describe("integration — Social Organizer pipeline", () => {
  const { scores, warnings } = processResponses(PROMPTS, socialOrganizerResponses);
  const profile = resolveProfile(scores);
  const results = matchJobs(JOBS, profile);
  const formatted = formatResults(results, profile);
  const text = renderResultsAsText(formatted);

  it("produces no warnings for valid responses", () => {
    expect(warnings).toHaveLength(0);
  });

  it("resolves expected profile dimensions", () => {
    expect(profile.energyRhythm).toBe("burst");
    expect(profile.peopleDensity).toBe("crowd");
    expect(profile.interactionDemand).toBe("constant");
    expect(profile.schedulePredictability).toBe("chaotic");
    expect(profile.ruleDensity).toBe("loose");
    expect(profile.primaryLoadType).toBe("organizational");
    expect(profile.errorPressure).toBe("low");
    expect(profile.workValue).toBe("achievement");
  });

  it("top matches include people-facing/organizational jobs", () => {
    const topTitles = formatted.topMatches.map((m) => m.title);
    const orgJobs = [
      "Event Planner", "Retail Sales Associate", "Real Estate Agent",
      "Small Business Owner",
    ];
    const hasOrgJob = topTitles.some((t) => orgJobs.includes(t));
    expect(hasOrgJob).toBe(true);
  });

  it("eliminates solo/quiet/strict jobs", () => {
    const eliminatedTitles = formatted.eliminated.map((m) => m.title);
    const soloJobs = ["Welder", "Lab Technician", "Truck Driver"];
    const someEliminated = soloJobs.some((t) => eliminatedTitles.includes(t));
    expect(someEliminated).toBe(true);
  });

  it("output text uses Less Likely Fits language", () => {
    expect(text).toContain("Less Likely Fits");
    expect(text).not.toContain("Ruled Out");
  });
});
