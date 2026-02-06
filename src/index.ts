/**
 * Career Matcher — public API surface.
 *
 * Re-exports everything a consumer needs to:
 * 1. Present situational prompts
 * 2. Collect responses
 * 3. Score and match against jobs
 * 4. Format explainable results
 */

// Dimensions
export {
  PRIMARY_DIMENSIONS,
  SECONDARY_DIMENSIONS,
  ALL_DIMENSIONS,
  DIMENSION_META,
} from "./dimensions.js";
export type {
  Dimension,
  PrimaryDimension,
  SecondaryDimension,
  DimensionLevel,
  EnergyRhythm,
  PeopleDensity,
  InteractionDemand,
  SchedulePredictability,
  RuleDensity,
  PrimaryLoadType,
  ErrorPressure,
  WorkValue,
} from "./dimensions.js";

// Types
export type {
  Job,
  JobDimensionProfile,
  UserDimensionProfile,
  SituationalPrompt,
  PromptOption,
  DimensionScores,
  MatchResult,
} from "./types.js";

// Data
export { JOBS } from "./jobs.js";
export { PROMPTS } from "./prompts.js";

// Scoring
export {
  createEmptyScores,
  applyNudge,
  processResponses,
  resolveLevel,
  resolveProfile,
} from "./scoring.js";

// Matching
export { scoreJob, matchJobs } from "./matcher.js";

// Results
export { fitBand, formatResults, formatProfileSummary, renderResultsAsText } from "./results.js";
export type { FormattedResults, FormattedMatch } from "./results.js";
