/**
 * Data integrity validation for prompts and jobs.
 *
 * Catches misspelled dimension names, invalid level values, and missing
 * dimension keys at startup or build time — before they silently corrupt
 * scoring or matching results.
 */

import { ALL_DIMENSIONS, DIMENSION_META, type Dimension } from "./dimensions.js";
import type { SituationalPrompt, Job } from "./types.js";

/** Return an array of error strings. Empty = valid. */
export function validateDataIntegrity(
  prompts: readonly SituationalPrompt[],
  jobs: readonly Job[],
): string[] {
  const errors: string[] = [];
  const validDimensions = new Set<string>(ALL_DIMENSIONS);

  // --- Validate prompts ---
  for (const prompt of prompts) {
    for (let i = 0; i < prompt.options.length; i++) {
      const option = prompt.options[i];

      if (!validDimensions.has(option.dimension)) {
        errors.push(
          `Prompt "${prompt.id}" option ${i}: unknown dimension "${option.dimension}"`,
        );
        continue;
      }

      const meta = DIMENSION_META[option.dimension as Dimension];
      const validLevels = meta.levels.map((l) => l.value);
      if (!validLevels.includes(option.nudgeToward)) {
        errors.push(
          `Prompt "${prompt.id}" option ${i}: invalid nudgeToward "${option.nudgeToward}" for dimension "${option.dimension}" (valid: ${validLevels.join(", ")})`,
        );
      }
    }
  }

  // --- Validate jobs ---
  for (const job of jobs) {
    for (const dim of ALL_DIMENSIONS) {
      const profile = job.profile[dim] as readonly string[] | undefined;

      if (!profile || profile.length === 0) {
        errors.push(
          `Job "${job.id}": missing or empty dimension "${dim}"`,
        );
        continue;
      }

      const meta = DIMENSION_META[dim];
      const validLevels = meta.levels.map((l) => l.value);
      for (const level of profile) {
        if (!validLevels.includes(level)) {
          errors.push(
            `Job "${job.id}": invalid level "${level}" for dimension "${dim}" (valid: ${validLevels.join(", ")})`,
          );
        }
      }
    }
  }

  return errors;
}
