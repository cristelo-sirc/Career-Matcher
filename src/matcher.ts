/**
 * Matching engine — connects user profiles to jobs.
 *
 * Design rules:
 * - Elimination before optimization: rule out bad fits first.
 * - Primary dimensions eliminate; secondary (Work Value) only ranks.
 * - Ordinal dimensions use adjacency: being 1 step away counts as a
 *   0.5 mismatch; 2+ steps away counts as 1.0. Elimination triggers
 *   when total weighted mismatch >= 2.0.
 * - Every result is explainable in plain language.
 * - No black boxes.
 *
 * Tie-breaking: jobs with equal fit scores are ordered by their position
 * in the input `jobs` array (stable sort, guaranteed by ES2019+).
 */

import { DIMENSION_META, PRIMARY_DIMENSIONS, type Dimension } from "./dimensions.js";
import type {
  Job,
  UserDimensionProfile,
  MatchResult,
} from "./types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if a job accepts the user's level for a given dimension. */
function jobAcceptsLevel(
  job: Job,
  dimension: Dimension,
  userLevel: string,
): boolean {
  const accepted = job.profile[dimension] as readonly string[];
  return accepted.includes(userLevel);
}

/** Get human-readable label for a dimension. */
function dimensionLabel(dimension: Dimension): string {
  return DIMENSION_META[dimension].label;
}

/** Get human-readable label for a level within a dimension. */
function levelLabel(dimension: Dimension, level: string): string {
  const meta = DIMENSION_META[dimension];
  const found = meta.levels.find((l) => l.value === level);
  return found ? found.label : level;
}

/**
 * For an ordinal dimension, check if the user's level is adjacent to any
 * of the job's accepted levels. Adjacency means the level indices differ
 * by exactly 1 in the dimension's ordered level list.
 *
 * Returns the closest accepted level label if adjacent, or null.
 */
function findAdjacentLevel(
  dimension: Dimension,
  userLevel: string,
  jobAccepted: readonly string[],
): string | null {
  const meta = DIMENSION_META[dimension];
  if (!meta.ordinal) return null;

  const levelValues = meta.levels.map((l) => l.value);
  const userIndex = levelValues.indexOf(userLevel);
  if (userIndex === -1) return null;

  for (const accepted of jobAccepted) {
    const acceptedIndex = levelValues.indexOf(accepted);
    if (acceptedIndex !== -1 && Math.abs(userIndex - acceptedIndex) === 1) {
      return accepted;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Core matching
// ---------------------------------------------------------------------------

/**
 * Score a single job against a user profile.
 *
 * Returns a MatchResult with:
 * - fitScore (0–1)
 * - fitReasons (why it matched)
 * - frictionPoints (why it might not be perfect)
 * - eliminated (true if weighted primary mismatch >= 2.0)
 */
export function scoreJob(
  job: Job,
  profile: UserDimensionProfile,
): MatchResult {
  const fitReasons: string[] = [];
  const frictionPoints: string[] = [];

  let primaryMatchCredit = 0;
  let totalMismatchWeight = 0;
  const primaryCount = PRIMARY_DIMENSIONS.length;

  // --- Primary dimensions: check for elimination ---
  for (const dim of PRIMARY_DIMENSIONS) {
    const userLevel = profile[dim];
    const accepts = jobAcceptsLevel(job, dim, userLevel);

    if (accepts) {
      primaryMatchCredit += 1;
      fitReasons.push(
        `${dimensionLabel(dim)}: this job fits your preference for ${levelLabel(dim, userLevel).toLowerCase()}`,
      );
    } else {
      // Check for ordinal adjacency (half-mismatch)
      const jobLevels = job.profile[dim] as readonly string[];
      const adjacent = findAdjacentLevel(dim, userLevel, jobLevels);

      if (adjacent) {
        // Adjacent on an ordinal dimension — partial match
        primaryMatchCredit += 0.5;
        totalMismatchWeight += 0.5;
        const adjacentLabel = levelLabel(dim, adjacent).toLowerCase();
        frictionPoints.push(
          `${dimensionLabel(dim)}: you prefer ${levelLabel(dim, userLevel).toLowerCase()}, but this job is close at ${adjacentLabel}`,
        );
      } else {
        // Full mismatch
        totalMismatchWeight += 1;
        const acceptedLabels = jobLevels
          .map((v) => levelLabel(dim, v).toLowerCase())
          .join(" or ");
        frictionPoints.push(
          `${dimensionLabel(dim)}: you prefer ${levelLabel(dim, userLevel).toLowerCase()}, but this job is typically ${acceptedLabels}`,
        );
      }
    }
  }

  // A job is eliminated when total weighted mismatch >= 2.0
  const eliminated = totalMismatchWeight >= 2.0;

  // --- Secondary dimension: Work Value (never eliminates) ---
  const wvAccepts = jobAcceptsLevel(job, "workValue", profile.workValue);
  if (wvAccepts) {
    fitReasons.push(
      `Work Value: this job aligns with your value of ${levelLabel("workValue", profile.workValue).toLowerCase()}`,
    );
  }

  // --- Compute fit score ---
  // Primary dimensions: each match contributes equally (partial credit for adjacency)
  // Work Value: small bonus (not an eliminator)
  const primaryScore = primaryMatchCredit / primaryCount;
  const secondaryBonus = wvAccepts ? 0.05 : 0;
  const fitScore = Math.min(1, primaryScore * 0.95 + secondaryBonus);

  return { job, fitScore, fitReasons, frictionPoints, eliminated };
}

/**
 * Match a user profile against all jobs.
 *
 * Returns results in two groups:
 * 1. Non-eliminated jobs, sorted by fitScore descending
 * 2. Eliminated jobs, sorted by fitScore descending
 *
 * This lets the consumer show "good fits" separately from "less likely fits."
 */
export function matchJobs(
  jobs: readonly Job[],
  profile: UserDimensionProfile,
): MatchResult[] {
  const results = jobs.map((job) => scoreJob(job, profile));

  // Sort: non-eliminated first (by score desc), then eliminated (by score desc)
  results.sort((a, b) => {
    if (a.eliminated !== b.eliminated) return a.eliminated ? 1 : -1;
    return b.fitScore - a.fitScore;
  });

  return results;
}
