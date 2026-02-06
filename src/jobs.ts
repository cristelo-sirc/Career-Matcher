/**
 * Seed job database.
 *
 * Each job is profiled across all 8 dimensions. A job can accept multiple
 * levels per dimension (e.g., a park ranger works in "solo" or "small-group"
 * people density). This reflects that real jobs have ranges, not single points.
 *
 * Design rule: jobs are real, recognizable, and described in plain language
 * a teenager can understand.
 *
 * Work Value mapping heuristics:
 * - Trades/physical roles → often security, sometimes achievement
 * - Healthcare/people roles → often altruism, sometimes security
 * - Creative roles → often autonomy, sometimes achievement
 * - Analytical/organizational → often achievement, sometimes security
 * - Most jobs accept 2 values (jobs are not monolithic).
 */

import type { Job } from "./types.js";

export const JOBS: readonly Job[] = [
  // ---- Physical / trades ----
  {
    id: "electrician",
    title: "Electrician",
    shortDescription: "Install and repair electrical wiring in buildings and homes.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },
  {
    id: "auto-mechanic",
    title: "Auto Mechanic",
    shortDescription: "Diagnose and fix problems with cars and trucks.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate"],
      workValue: ["security", "autonomy"],
    },
  },
  {
    id: "welder",
    title: "Welder",
    shortDescription: "Join metal parts together using heat and specialized equipment.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },
  {
    id: "landscaper",
    title: "Landscaper",
    shortDescription: "Design and maintain outdoor spaces — lawns, gardens, parks.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["physical"],
      errorPressure: ["low"],
      workValue: ["autonomy", "security"],
    },
  },
  {
    id: "carpenter",
    title: "Carpenter",
    shortDescription: "Build and repair structures and furniture using wood.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate"],
      workValue: ["security", "achievement"],
    },
  },

  // ---- Analytical / technical ----
  {
    id: "software-developer",
    title: "Software Developer",
    shortDescription: "Write code to build apps, websites, or software tools.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },
  {
    id: "lab-technician",
    title: "Lab Technician",
    shortDescription: "Run tests and experiments in a laboratory setting.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "security"],
    },
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    shortDescription: "Look at numbers and data to find patterns and answer questions.",
    profile: {
      energyRhythm: ["steady", "burst"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },
  {
    id: "accounting-clerk",
    title: "Accounting Clerk",
    shortDescription: "Track money coming in and going out for a business.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical", "organizational"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },

  // ---- Creative ----
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    shortDescription: "Create visual designs for logos, websites, posters, and more.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["creative"],
      errorPressure: ["low"],
      workValue: ["autonomy", "achievement"],
    },
  },
  {
    id: "video-editor",
    title: "Video Editor",
    shortDescription: "Cut, arrange, and polish video footage into finished products.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["solo"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["creative"],
      errorPressure: ["low"],
      workValue: ["autonomy", "achievement"],
    },
  },
  {
    id: "chef",
    title: "Chef / Line Cook",
    shortDescription: "Prepare food in a restaurant or commercial kitchen.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["physical", "creative"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },
  {
    id: "photographer",
    title: "Photographer",
    shortDescription: "Take photos for events, businesses, or personal clients.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["solo", "small-group", "crowd"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["chaotic", "variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["creative"],
      errorPressure: ["moderate"],
      workValue: ["autonomy", "achievement"],
    },
  },

  // ---- Organizational / coordination ----
  {
    id: "logistics-coordinator",
    title: "Logistics Coordinator",
    shortDescription: "Plan and track shipments and deliveries to make sure things arrive on time.",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["security", "achievement"],
    },
  },
  {
    id: "office-administrator",
    title: "Office Administrator",
    shortDescription: "Keep an office running — schedule meetings, manage files, handle requests.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["low", "moderate"],
      workValue: ["security", "altruism"],
    },
  },
  {
    id: "event-planner",
    title: "Event Planner",
    shortDescription: "Organize events like weddings, conferences, and parties.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["loose", "moderate"],
      primaryLoadType: ["organizational", "creative"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },

  // ---- People-heavy roles ----
  {
    id: "dental-hygienist",
    title: "Dental Hygienist",
    shortDescription: "Clean teeth and educate patients about oral health.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate", "high"],
      workValue: ["altruism", "security"],
    },
  },
  {
    id: "veterinary-technician",
    title: "Veterinary Technician",
    shortDescription: "Help vets care for animals — hold, monitor, and assist during procedures.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["altruism", "security"],
    },
  },
  {
    id: "retail-sales",
    title: "Retail Sales Associate",
    shortDescription: "Help customers find and buy products in a store.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["low"],
      workValue: ["security", "altruism"],
    },
  },
  {
    id: "paramedic",
    title: "Paramedic / EMT",
    shortDescription: "Respond to emergencies and give medical care on the scene.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["altruism", "achievement"],
    },
  },

  // ---- Solo / quiet roles ----
  {
    id: "park-ranger",
    title: "Park Ranger",
    shortDescription: "Protect and maintain natural parks and educate visitors.",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["physical", "organizational"],
      errorPressure: ["moderate"],
      workValue: ["autonomy", "altruism"],
    },
  },
  {
    id: "truck-driver",
    title: "Truck Driver",
    shortDescription: "Drive large vehicles to deliver goods across short or long distances.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["security", "autonomy"],
    },
  },
  {
    id: "library-assistant",
    title: "Library Assistant",
    shortDescription: "Help visitors find books, organize materials, and keep the library running.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["low"],
      workValue: ["altruism", "security"],
    },
  },
  {
    id: "warehouse-worker",
    title: "Warehouse Worker",
    shortDescription: "Move, sort, and organize inventory in a warehouse.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate"],
      workValue: ["security"],
    },
  },
  {
    id: "it-support",
    title: "IT Support Specialist",
    shortDescription: "Help people fix computer and technology problems.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "altruism"],
    },
  },
] as const;
