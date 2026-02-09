/**
 * Results formatter — Phase 4.
 *
 * Transforms raw MatchResults into explainable, job-forward output.
 *
 * Design rules:
 * - Every result is explainable in plain language.
 * - Teens and parents should understand *why* a job appears or disappears.
 * - Jobs first, not traits.
 * - Ordinal fit bands, not percentages — the measurement cannot support
 *   quantitative precision claims.
 * - Exploration language, not foreclosure — "less likely" not "ruled out."
 */

import { DIMENSION_META, type Dimension } from "./dimensions.js";
import type { MatchResult, UserDimensionProfile } from "./types.js";

// ---------------------------------------------------------------------------
// Fit bands — ordinal categories replacing false-precision percentages
// ---------------------------------------------------------------------------

/** Map a 0–1 fitScore to an ordinal fit band label. */
export function fitBand(fitScore: number): string {
  if (fitScore >= 0.85) return "Strong fit";
  if (fitScore >= 0.65) return "Possible fit";
  if (fitScore >= 0.45) return "Stretch";
  return "Unlikely fit";
}

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
  /** Kept for internal/debug use — not displayed to end users. */
  fitPercent: number;
  /** Ordinal fit category shown to users. */
  fitBand: string;
  fitReasons: string[];
  frictionPoints: string[];
  /** Informational metadata — does not affect scoring or elimination. */
  outlookNote?: string;
  /** Informational metadata — does not affect scoring or elimination. */
  typicalEducation?: string;
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
    fitBand: fitBand(r.fitScore),
    fitReasons: r.fitReasons,
    frictionPoints: r.frictionPoints,
    outlookNote: r.job.outlookNote,
    typicalEducation: r.job.typicalEducation,
  }));

  const eliminatedFormatted: FormattedMatch[] = eliminated.map((r, i) => ({
    rank: i + 1,
    title: r.job.title,
    description: r.job.shortDescription,
    fitPercent: Math.round(r.fitScore * 100),
    fitBand: fitBand(r.fitScore),
    fitReasons: r.fitReasons,
    frictionPoints: r.frictionPoints,
    outlookNote: r.job.outlookNote,
    typicalEducation: r.job.typicalEducation,
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

  // Scope disclaimer
  lines.push("This tool explores which work environments might suit you based on your");
  lines.push("preferences today. It is not a career assessment or aptitude test. Use these");
  lines.push("results as a starting point for conversations, not as a final answer.");
  lines.push("");

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
    lines.push(`  #${match.rank}  ${match.title} (${match.fitBand})`);
    lines.push(`       ${match.description}`);
    lines.push("");
    for (const reason of match.fitReasons) {
      lines.push(`       + ${reason}`);
    }
    for (const friction of match.frictionPoints) {
      lines.push(`       - ${friction}`);
    }
    if (match.typicalEducation || match.outlookNote) {
      lines.push("");
      if (match.typicalEducation) {
        lines.push(`       Education: ${match.typicalEducation}`);
      }
      if (match.outlookNote) {
        lines.push(`       Outlook: ${match.outlookNote}`);
      }
    }
  }

  if (formatted.eliminated.length > 0) {
    lines.push("");
    lines.push("-".repeat(60));
    lines.push("Less Likely Fits (based on your current preferences)");
    lines.push("-".repeat(60));

    for (const match of formatted.eliminated.slice(0, 5)) {
      lines.push("");
      lines.push(`  ${match.title}`);
      for (const friction of match.frictionPoints) {
        lines.push(`    - ${friction}`);
      }
    }
  }

  lines.push("");
  lines.push("These results reflect your preferences today — they may change as you gain experience.");

  return lines.join("\n");
}
