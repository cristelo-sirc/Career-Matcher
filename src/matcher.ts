/**
 * Matching engine — connects user profiles to jobs.
 *
 * Design rules:
 * - Elimination before optimization: rule out bad fits first.
 * - Primary dimensions eliminate; secondary (Work Value) only ranks.
 * - Every result is explainable in plain language.
 * - No black boxes.
 */

import { DIMENSION_META, PRIMARY_DIMENSIONS, type Dimension, type PrimaryDimension } from "./dimensions.js";
import type {
  Job,
  UserDimensionProfile,
  MatchResult,
  JobDimensionProfile,
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
 * - eliminated (true if any primary dimension is a total mismatch)
 */
export function scoreJob(
  job: Job,
  profile: UserDimensionProfile,
): MatchResult {
  const fitReasons: string[] = [];
  const frictionPoints: string[] = [];
  let eliminated = false;

  let primaryMatches = 0;
  const primaryCount = PRIMARY_DIMENSIONS.length;

  // --- Primary dimensions: check for elimination ---
  for (const dim of PRIMARY_DIMENSIONS) {
    const userLevel = profile[dim];
    const accepts = jobAcceptsLevel(job, dim, userLevel);

    if (accepts) {
      primaryMatches++;
      fitReasons.push(
        `${dimensionLabel(dim)}: this job fits your preference for ${levelLabel(dim, userLevel).toLowerCase()}`,
      );
    } else {
      const acceptedLabels = (job.profile[dim] as readonly string[])
        .map((v) => levelLabel(dim, v).toLowerCase())
        .join(" or ");
      frictionPoints.push(
        `${dimensionLabel(dim)}: you prefer ${levelLabel(dim, userLevel).toLowerCase()}, but this job is typically ${acceptedLabels}`,
      );
    }
  }

  // A job is eliminated if it mismatches on 2+ primary dimensions
  if (primaryCount - primaryMatches >= 2) {
    eliminated = true;
  }

  // --- Secondary dimension: Work Value (never eliminates) ---
  const wvAccepts = jobAcceptsLevel(job, "workValue", profile.workValue);
  if (wvAccepts) {
    fitReasons.push(
      `Work Value: this job aligns with your value of ${levelLabel("workValue", profile.workValue).toLowerCase()}`,
    );
  }

  // --- Compute fit score ---
  // Primary dimensions: each match contributes equally
  // Work Value: small bonus (not an eliminator)
  const primaryScore = primaryMatches / primaryCount;
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
 * This lets the consumer show "good fits" separately from "ruled out."
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
