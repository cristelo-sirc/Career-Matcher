/**
 * App-wide constants and copy text.
 */

/** Section labels displayed during the quiz (one per dimension, in prompt order). */
export const SECTION_LABELS = [
  "Energy",
  "Social",
  "Interaction",
  "Schedule",
  "Structure",
  "Work Type",
  "Pressure",
  "Values",
] as const;

/** Number of prompts per section (one section = one dimension). */
export const PROMPTS_PER_SECTION = 4;

/** Total number of prompts. */
export const TOTAL_PROMPTS = 32;

/** Encouragement banners shown between sections. */
export const SECTION_TRANSITIONS: Record<number, string> = {
  2: "Nice \u2014 2 sections down, 6 to go.",
  4: "Halfway there.",
  6: "Almost done \u2014 just 2 sections left.",
};

/** Scope disclaimer shown in footer. */
export const SCOPE_DISCLAIMER =
  "This tool explores work-environment preferences. It is not a career assessment, aptitude test, or guidance tool.";
