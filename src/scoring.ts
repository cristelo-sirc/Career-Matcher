/**
 * Scoring engine — Phase 2.
 *
 * Converts a user's prompt responses into dimension scores, resolves a
 * best-fit level per dimension, and produces a UserDimensionProfile.
 *
 * Design rules:
 * - Dimension nudges, no single-question gates.
 * - Multiple prompts per dimension accumulate evidence.
 * - The winning level per dimension is the one with the highest total weight.
 */

import { ALL_DIMENSIONS, type Dimension } from "./dimensions.js";
import type {
  DimensionScores,
  SituationalPrompt,
  PromptOption,
  UserDimensionProfile,
} from "./types.js";

// ---------------------------------------------------------------------------
// Score accumulation
// ---------------------------------------------------------------------------

/** Create an empty score sheet. */
export function createEmptyScores(): DimensionScores {
  const scores: Record<string, Record<string, number>> = {};
  for (const dim of ALL_DIMENSIONS) {
    scores[dim] = {};
  }
  return scores as DimensionScores;
}

/** Apply a single prompt option's nudge to the running scores. */
export function applyNudge(
  scores: DimensionScores,
  option: PromptOption,
): void {
  const bucket = scores[option.dimension];
  bucket[option.nudgeToward] = (bucket[option.nudgeToward] ?? 0) + option.weight;
}

/**
 * Process all user responses at once.
 *
 * `responses` maps prompt ID → the index of the chosen option.
 */
export function processResponses(
  prompts: readonly SituationalPrompt[],
  responses: Record<string, number>,
): DimensionScores {
  const scores = createEmptyScores();
  for (const prompt of prompts) {
    const chosenIndex = responses[prompt.id];
    if (chosenIndex == null) continue;
    const option = prompt.options[chosenIndex];
    if (option) {
      applyNudge(scores, option);
    }
  }
  return scores;
}

// ---------------------------------------------------------------------------
// Resolve scores → profile
// ---------------------------------------------------------------------------

/**
 * For a single dimension, pick the level with the highest accumulated score.
 * Ties are broken by returning the first-encountered winner (stable order).
 */
export function resolveLevel(bucket: Record<string, number>): string | null {
  let best: string | null = null;
  let bestScore = -1;
  for (const [level, score] of Object.entries(bucket)) {
    if (score > bestScore) {
      best = level;
      bestScore = score;
    }
  }
  return best;
}

/**
 * Convert accumulated scores into a concrete UserDimensionProfile.
 *
 * Falls back to sensible defaults if a dimension received no signal at all
 * (this shouldn't happen in a complete session, but guards against partial
 * data).
 */
export function resolveProfile(scores: DimensionScores): UserDimensionProfile {
  return {
    energyRhythm: (resolveLevel(scores.energyRhythm) ?? "mixed") as UserDimensionProfile["energyRhythm"],
    peopleDensity: (resolveLevel(scores.peopleDensity) ?? "small-group") as UserDimensionProfile["peopleDensity"],
    interactionDemand: (resolveLevel(scores.interactionDemand) ?? "moderate") as UserDimensionProfile["interactionDemand"],
    schedulePredictability: (resolveLevel(scores.schedulePredictability) ?? "variable") as UserDimensionProfile["schedulePredictability"],
    ruleDensity: (resolveLevel(scores.ruleDensity) ?? "moderate") as UserDimensionProfile["ruleDensity"],
    primaryLoadType: (resolveLevel(scores.primaryLoadType) ?? "analytical") as UserDimensionProfile["primaryLoadType"],
    errorPressure: (resolveLevel(scores.errorPressure) ?? "moderate") as UserDimensionProfile["errorPressure"],
    learningMode: (resolveLevel(scores.learningMode) ?? "hands-on") as UserDimensionProfile["learningMode"],
  };
}
