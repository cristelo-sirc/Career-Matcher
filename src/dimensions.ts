/**
 * The 7 primary fit dimensions (job eliminators) and 1 secondary dimension.
 *
 * Design rules (from the design record):
 * - A dimension is only valid if it meaningfully changes which jobs survive,
 *   is experientially grounded, and is explainable without psychological jargon.
 * - "Social" is split into People Density (ambient presence) and
 *   Interaction Demand (required engagement) because they are independent stressors.
 * - Learning Mode is secondary: it never eliminates jobs, only explains matches
 *   or breaks ties.
 */

// ---------------------------------------------------------------------------
// Dimension identifiers
// ---------------------------------------------------------------------------

export const PRIMARY_DIMENSIONS = [
  "energyRhythm",
  "peopleDensity",
  "interactionDemand",
  "schedulePredictability",
  "ruleDensity",
  "primaryLoadType",
  "errorPressure",
] as const;

export const SECONDARY_DIMENSIONS = ["learningMode"] as const;

export const ALL_DIMENSIONS = [
  ...PRIMARY_DIMENSIONS,
  ...SECONDARY_DIMENSIONS,
] as const;

export type PrimaryDimension = (typeof PRIMARY_DIMENSIONS)[number];
export type SecondaryDimension = (typeof SECONDARY_DIMENSIONS)[number];
export type Dimension = (typeof ALL_DIMENSIONS)[number];

// ---------------------------------------------------------------------------
// Dimension levels — each dimension is measured on a small discrete scale
// ---------------------------------------------------------------------------

export type EnergyRhythm = "steady" | "burst" | "mixed";
export type PeopleDensity = "solo" | "small-group" | "crowd";
export type InteractionDemand = "minimal" | "moderate" | "constant";
export type SchedulePredictability = "predictable" | "variable" | "chaotic";
export type RuleDensity = "loose" | "moderate" | "strict";
export type PrimaryLoadType = "physical" | "analytical" | "creative" | "organizational";
export type ErrorPressure = "low" | "moderate" | "high";
export type LearningMode = "hands-on" | "verbal" | "abstract";

export type DimensionLevel =
  | EnergyRhythm
  | PeopleDensity
  | InteractionDemand
  | SchedulePredictability
  | RuleDensity
  | PrimaryLoadType
  | ErrorPressure
  | LearningMode;

// ---------------------------------------------------------------------------
// Dimension metadata — plain-language labels and descriptions
// ---------------------------------------------------------------------------

export interface DimensionMeta {
  id: Dimension;
  label: string;
  description: string;
  levels: readonly { value: string; label: string; description: string }[];
  isPrimary: boolean;
}

export const DIMENSION_META: Record<Dimension, DimensionMeta> = {
  energyRhythm: {
    id: "energyRhythm",
    label: "Energy Rhythm",
    description: "How your energy flows during a workday — steady and even, or in intense bursts with downtime between.",
    isPrimary: true,
    levels: [
      { value: "steady", label: "Steady", description: "Same pace all day, few surprises" },
      { value: "burst", label: "Burst", description: "Intense pushes followed by recovery time" },
      { value: "mixed", label: "Mixed", description: "Some of both — varies day to day" },
    ],
  },
  peopleDensity: {
    id: "peopleDensity",
    label: "People Density",
    description: "How many people are physically around you while you work — not whether you talk to them.",
    isPrimary: true,
    levels: [
      { value: "solo", label: "Solo", description: "Mostly alone or with one other person" },
      { value: "small-group", label: "Small Group", description: "A handful of people nearby" },
      { value: "crowd", label: "Crowd", description: "Lots of people around most of the time" },
    ],
  },
  interactionDemand: {
    id: "interactionDemand",
    label: "Interaction Demand",
    description: "How much you are required to engage with people — conversations, coordination, persuasion.",
    isPrimary: true,
    levels: [
      { value: "minimal", label: "Minimal", description: "Little talking or coordination needed" },
      { value: "moderate", label: "Moderate", description: "Regular check-ins and teamwork" },
      { value: "constant", label: "Constant", description: "Talking to people is most of the job" },
    ],
  },
  schedulePredictability: {
    id: "schedulePredictability",
    label: "Schedule Predictability",
    description: "How much your day follows a known pattern versus being shaped by whatever comes up.",
    isPrimary: true,
    levels: [
      { value: "predictable", label: "Predictable", description: "You know what your day looks like in advance" },
      { value: "variable", label: "Variable", description: "Rough structure, but things shift often" },
      { value: "chaotic", label: "Chaotic", description: "Every day is different, hard to plan ahead" },
    ],
  },
  ruleDensity: {
    id: "ruleDensity",
    label: "Rule Density",
    description: "How many rules, procedures, or protocols you have to follow.",
    isPrimary: true,
    levels: [
      { value: "loose", label: "Loose", description: "Few formal rules — you figure it out" },
      { value: "moderate", label: "Moderate", description: "Some standard procedures to follow" },
      { value: "strict", label: "Strict", description: "Lots of rules, checklists, or regulations" },
    ],
  },
  primaryLoadType: {
    id: "primaryLoadType",
    label: "Primary Load Type",
    description: "What kind of effort the job mainly asks of you.",
    isPrimary: true,
    levels: [
      { value: "physical", label: "Physical", description: "Moving, building, using your hands" },
      { value: "analytical", label: "Analytical", description: "Solving problems, working with data or systems" },
      { value: "creative", label: "Creative", description: "Designing, writing, inventing" },
      { value: "organizational", label: "Organizational", description: "Planning, coordinating, keeping things on track" },
    ],
  },
  errorPressure: {
    id: "errorPressure",
    label: "Error Pressure",
    description: "How bad it is when you make a mistake on the job.",
    isPrimary: true,
    levels: [
      { value: "low", label: "Low", description: "Mistakes are easy to fix, no big deal" },
      { value: "moderate", label: "Moderate", description: "Mistakes matter but are recoverable" },
      { value: "high", label: "High", description: "Mistakes can be costly or dangerous" },
    ],
  },
  learningMode: {
    id: "learningMode",
    label: "Learning Mode",
    description: "How you best pick up new skills on the job.",
    isPrimary: false,
    levels: [
      { value: "hands-on", label: "Hands-On", description: "Learn by doing and watching" },
      { value: "verbal", label: "Verbal", description: "Learn by reading, listening, discussing" },
      { value: "abstract", label: "Abstract", description: "Learn from models, diagrams, theory" },
    ],
  },
} as const;
