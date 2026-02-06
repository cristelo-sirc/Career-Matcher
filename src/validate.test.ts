import { describe, it, expect } from "vitest";
import { validateDataIntegrity } from "./validate.js";
import { PROMPTS } from "./prompts.js";
import { JOBS } from "./jobs.js";
import type { SituationalPrompt, Job } from "./types.js";

describe("validateDataIntegrity", () => {
  it("current PROMPTS and JOBS pass validation", () => {
    const errors = validateDataIntegrity(PROMPTS, JOBS);
    expect(errors).toEqual([]);
  });

  it("catches a prompt with an invalid dimension", () => {
    const badPrompt: SituationalPrompt = {
      id: "bad-dim",
      scenario: "Test",
      options: [
        { text: "A", dimension: "madeUpDimension" as any, nudgeToward: "solo", weight: 1 },
      ],
    };
    const errors = validateDataIntegrity([badPrompt], []);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("unknown dimension");
    expect(errors[0]).toContain("madeUpDimension");
  });

  it("catches a prompt with an invalid nudgeToward level", () => {
    const badPrompt: SituationalPrompt = {
      id: "bad-level",
      scenario: "Test",
      options: [
        { text: "A", dimension: "energyRhythm", nudgeToward: "stedy", weight: 1 },
      ],
    };
    const errors = validateDataIntegrity([badPrompt], []);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("invalid nudgeToward");
    expect(errors[0]).toContain("stedy");
  });

  it("catches a job with an invalid level value", () => {
    const badJob: Job = {
      id: "bad-job",
      title: "Bad Job",
      shortDescription: "Test",
      profile: {
        energyRhythm: ["stedy" as any],
        peopleDensity: ["solo"],
        interactionDemand: ["minimal"],
        schedulePredictability: ["predictable"],
        ruleDensity: ["moderate"],
        primaryLoadType: ["physical"],
        errorPressure: ["low"],
        workValue: ["security"],
      },
    };
    const errors = validateDataIntegrity([], [badJob]);
    expect(errors.length).toBe(1);
    expect(errors[0]).toContain("invalid level");
    expect(errors[0]).toContain("stedy");
  });
});
