/**
 * Core types for the Career Matcher engine.
 */

import type {
  Dimension,
  PrimaryDimension,
  EnergyRhythm,
  PeopleDensity,
  InteractionDemand,
  SchedulePredictability,
  RuleDensity,
  PrimaryLoadType,
  ErrorPressure,
  WorkValue,
} from "./dimensions.js";

// ---------------------------------------------------------------------------
// Job profile — describes how a real job maps to each dimension
// ---------------------------------------------------------------------------

/** The dimension levels that a job accepts (one or more per dimension). */
export interface JobDimensionProfile {
  energyRhythm: readonly EnergyRhythm[];
  peopleDensity: readonly PeopleDensity[];
  interactionDemand: readonly InteractionDemand[];
  schedulePredictability: readonly SchedulePredictability[];
  ruleDensity: readonly RuleDensity[];
  primaryLoadType: readonly PrimaryLoadType[];
  errorPressure: readonly ErrorPressure[];
  workValue: readonly WorkValue[];
}

export interface Job {
  id: string;
  title: string;
  /** One-sentence plain-language description a teen can understand. */
  shortDescription: string;
  profile: JobDimensionProfile;
  /** Informational only — does not affect scoring or elimination. */
  outlookNote?: string;
  /** Forward-looking assessment of automation risk and growth. */
  futureOutlook?: string;
  /** Informational only — does not affect scoring or elimination. */
  typicalEducation?: string;
}

// ---------------------------------------------------------------------------
// User response profile — what the user indicated for each dimension
// ---------------------------------------------------------------------------

export interface UserDimensionProfile {
  energyRhythm: EnergyRhythm;
  peopleDensity: PeopleDensity;
  interactionDemand: InteractionDemand;
  schedulePredictability: SchedulePredictability;
  ruleDensity: RuleDensity;
  primaryLoadType: PrimaryLoadType;
  errorPressure: ErrorPressure;
  workValue: WorkValue;
}

// ---------------------------------------------------------------------------
// Situational prompt — a scenario the user reacts to (Phase 1 measurement)
// ---------------------------------------------------------------------------

export interface PromptOption {
  /** The text the user sees. */
  text: string;
  /** Which dimension this nudges. */
  dimension: Dimension;
  /** Which level this nudges toward. */
  nudgeToward: string;
  /** How strong the nudge is (0–1). Allows some prompts to be weaker signals. */
  weight: number;
}

export interface SituationalPrompt {
  id: string;
  /** The scenario description shown to the user. */
  scenario: string;
  /** The options the user can pick from. */
  options: readonly PromptOption[];
}

// ---------------------------------------------------------------------------
// Scoring types
// ---------------------------------------------------------------------------

/** Maps each dimension to its valid level union type. */
export type DimensionLevelMap = {
  energyRhythm: EnergyRhythm;
  peopleDensity: PeopleDensity;
  interactionDemand: InteractionDemand;
  schedulePredictability: SchedulePredictability;
  ruleDensity: RuleDensity;
  primaryLoadType: PrimaryLoadType;
  errorPressure: ErrorPressure;
  workValue: WorkValue;
};

/**
 * Accumulated nudge scores per dimension level during the prompt phase.
 *
 * Each dimension maps to a partial record of its valid levels → accumulated
 * weight. Partial because only levels that have been nudged will have entries.
 */
export type DimensionScores = {
  [D in Dimension]: Partial<Record<DimensionLevelMap[D], number>>;
};

/** A single match result returned to the user. */
export interface MatchResult {
  job: Job;
  /** 0–1 overall fit score. */
  fitScore: number;
  /** Plain-language reasons this job matched. */
  fitReasons: string[];
  /** Plain-language reasons this job might not be perfect. */
  frictionPoints: string[];
  /** Was this job eliminated by a primary dimension mismatch? */
  eliminated: boolean;
}
