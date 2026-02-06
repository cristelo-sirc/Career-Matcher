/**
 * Results formatter — Phase 4.
 *
 * Transforms raw MatchResults into explainable, job-forward output.
 *
 * Design rules:
 * - Every result is explainable in plain language.
 * - Teens and parents should understand *why* a job appears or disappears.
 * - Jobs first, not traits.
 */

import { DIMENSION_META, type Dimension } from "./dimensions.js";
import type { MatchResult, UserDimensionProfile } from "./types.js";

// ---------------------------------------------------------------------------
// Profile summary — human-readable summary of the user's profile
// ---------------------------------------------------------------------------

export function formatProfileSummary(profile: UserDimensionProfile): string {
  const lines: string[] = ["Here's what we learned about how you work best:", ""];

  for (const [dim, value] of Object.entries(profile) as [Dimension, string][]) {
    const meta = DIMENSION_META[dim];
    const level = meta.levels.find((l) => l.value === value);
    if (level) {
      lines.push(`  ${meta.label}: ${level.label} — ${level.description}`);
    }
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Match results — formatted for display
// ---------------------------------------------------------------------------

export interface FormattedResults {
  profileSummary: string;
  topMatches: FormattedMatch[];
  eliminated: FormattedMatch[];
}

export interface FormattedMatch {
  rank: number;
  title: string;
  description: string;
  fitPercent: number;
  fitReasons: string[];
  frictionPoints: string[];
}

/**
 * Format match results for display.
 *
 * @param results - Sorted MatchResult array from matchJobs()
 * @param profile - The user's resolved profile
 * @param topN - Max number of top matches to show (default 5)
 */
export function formatResults(
  results: MatchResult[],
  profile: UserDimensionProfile,
  topN = 5,
): FormattedResults {
  const profileSummary = formatProfileSummary(profile);

  const surviving = results.filter((r) => !r.eliminated);
  const eliminated = results.filter((r) => r.eliminated);

  const topMatches: FormattedMatch[] = surviving.slice(0, topN).map((r, i) => ({
    rank: i + 1,
    title: r.job.title,
    description: r.job.shortDescription,
    fitPercent: Math.round(r.fitScore * 100),
    fitReasons: r.fitReasons,
    frictionPoints: r.frictionPoints,
  }));

  const eliminatedFormatted: FormattedMatch[] = eliminated.map((r, i) => ({
    rank: i + 1,
    title: r.job.title,
    description: r.job.shortDescription,
    fitPercent: Math.round(r.fitScore * 100),
    fitReasons: r.fitReasons,
    frictionPoints: r.frictionPoints,
  }));

  return {
    profileSummary,
    topMatches,
    eliminated: eliminatedFormatted,
  };
}

/**
 * Render formatted results to a plain-text string.
 * Useful for CLI output or simple display.
 */
export function renderResultsAsText(formatted: FormattedResults): string {
  const lines: string[] = [];

  lines.push(formatted.profileSummary);
  lines.push("");
  lines.push("=".repeat(60));
  lines.push("Jobs That Fit You");
  lines.push("=".repeat(60));

  if (formatted.topMatches.length === 0) {
    lines.push("  No strong matches found. Try adjusting your responses.");
  }

  for (const match of formatted.topMatches) {
    lines.push("");
    lines.push(`  #${match.rank}  ${match.title} (${match.fitPercent}% fit)`);
    lines.push(`       ${match.description}`);
    lines.push("");
    for (const reason of match.fitReasons) {
      lines.push(`       + ${reason}`);
    }
    for (const friction of match.frictionPoints) {
      lines.push(`       - ${friction}`);
    }
  }

  if (formatted.eliminated.length > 0) {
    lines.push("");
    lines.push("-".repeat(60));
    lines.push("Ruled Out (not a great fit right now)");
    lines.push("-".repeat(60));

    for (const match of formatted.eliminated.slice(0, 5)) {
      lines.push("");
      lines.push(`  ${match.title}`);
      for (const friction of match.frictionPoints) {
        lines.push(`    - ${friction}`);
      }
    }
  }

  return lines.join("\n");
}
