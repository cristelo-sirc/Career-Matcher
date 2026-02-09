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
// Seeded PRNG — Mulberry32 (simple, deterministic, zero-dependency)
// ---------------------------------------------------------------------------

/** Create a seeded random number generator (0–1 range, exclusive). */
function mulberry32(seed: number): () => number {
  let state = seed | 0;
  return () => {
    state = (state + 0x6D2B79F5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Option-order randomization
// ---------------------------------------------------------------------------

/**
 * Creates a copy of the prompt array with option order shuffled within
 * each prompt. Uses a seeded PRNG (Mulberry32) for reproducibility.
 *
 * This is a presentation-layer concern — shuffled prompts still carry
 * the same dimension/nudgeToward/weight metadata per option, so scoring
 * works unchanged when responses reference the shuffled option indices.
 *
 * @param prompts - The original prompt array
 * @param seed - Integer seed for deterministic shuffling
 * @returns A new prompt array with options in shuffled order
 */
export function createShuffledPrompts(
  prompts: readonly SituationalPrompt[],
  seed: number,
): SituationalPrompt[] {
  const random = mulberry32(seed);

  function fisherYatesShuffle<T>(arr: readonly T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  return prompts.map((prompt) => ({
    ...prompt,
    options: fisherYatesShuffle(prompt.options),
  }));
}

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
  // Cast needed: option.dimension is Dimension (union) and option.nudgeToward
  // is string. Runtime validation (validateDataIntegrity) ensures nudgeToward
  // is a valid level for the given dimension.
  const bucket = scores[option.dimension] as Record<string, number>;
  bucket[option.nudgeToward] = (bucket[option.nudgeToward] ?? 0) + option.weight;
}

/** Result of processing all user responses. */
export interface ProcessResponsesResult {
  scores: DimensionScores;
  /** Warnings about invalid or out-of-bounds response indices. */
  warnings: string[];
}

/**
 * Process all user responses at once.
 *
 * `responses` maps prompt ID → the index of the chosen option.
 *
 * Returns both the accumulated scores and any warnings (e.g., if a
 * response index is out of bounds for a prompt's option list).
 */
export function processResponses(
  prompts: readonly SituationalPrompt[],
  responses: Record<string, number>,
): ProcessResponsesResult {
  const scores = createEmptyScores();
  const warnings: string[] = [];

  for (const prompt of prompts) {
    const chosenIndex = responses[prompt.id];
    if (chosenIndex == null) continue;

    const option = prompt.options[chosenIndex];
    if (option) {
      applyNudge(scores, option);
    } else {
      warnings.push(
        `Prompt "${prompt.id}": chosen index ${chosenIndex} is out of bounds (${prompt.options.length} options available)`,
      );
    }
  }

  return { scores, warnings };
}

// ---------------------------------------------------------------------------
// Resolve scores → profile
// ---------------------------------------------------------------------------

/**
 * For a single dimension, pick the level with the highest accumulated score.
 *
 * Ties are broken by insertion order — the first key added to the bucket
 * wins. This is guaranteed by the ES2015+ spec for string keys: object
 * property iteration follows insertion order for non-integer keys.
 */
export function resolveLevel(bucket: Partial<Record<string, number>>): string | null {
  let best: string | null = null;
  let bestScore = -1;
  for (const [level, score] of Object.entries(bucket)) {
    if (score != null && score > bestScore) {
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
    workValue: (resolveLevel(scores.workValue) ?? "security") as UserDimensionProfile["workValue"],
  };
}
