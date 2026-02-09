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
    typicalEducation: "Trade certification or apprenticeship",
    outlookNote: "Strong demand — skilled trades are in short supply",
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
    typicalEducation: "Trade certification or associate degree",
    outlookNote: "Steady demand, especially for hybrid/EV specialists",
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
    typicalEducation: "Trade certification or apprenticeship",
    outlookNote: "Steady demand in manufacturing and construction",
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
    typicalEducation: "High school diploma; on-the-job training",
    outlookNote: "Steady demand, seasonal in some regions",
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
    typicalEducation: "Trade certification or apprenticeship",
    outlookNote: "Good demand — construction is a growing sector",
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
    typicalEducation: "Bachelor's degree or coding bootcamp",
    outlookNote: "High demand across nearly every industry",
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
    typicalEducation: "Associate or bachelor's degree in a science field",
    outlookNote: "Steady demand in healthcare and research",
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
    typicalEducation: "Bachelor's degree in math, statistics, or related field",
    outlookNote: "High demand — data skills are valued in most industries",
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
    typicalEducation: "Associate degree or certificate in accounting",
    outlookNote: "Stable demand — every business needs financial tracking",
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
    typicalEducation: "Bachelor's degree or portfolio-based entry",
    outlookNote: "Competitive — strong portfolios make the difference",
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
    typicalEducation: "Bachelor's degree or portfolio-based entry",
    outlookNote: "Growing demand with rise of online video content",
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
    typicalEducation: "Culinary school or on-the-job training",
    outlookNote: "Steady demand — restaurants always need skilled cooks",
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
    typicalEducation: "Portfolio-based entry; degree optional",
    outlookNote: "Competitive — specialization helps (weddings, commercial, etc.)",
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
    typicalEducation: "Associate or bachelor's degree",
    outlookNote: "Strong demand — supply chain roles are growing",
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
    typicalEducation: "High school diploma or associate degree",
    outlookNote: "Stable demand across all industries",
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
    typicalEducation: "Bachelor's degree in hospitality or related field",
    outlookNote: "Growing demand as events industry expands",
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
    typicalEducation: "Associate degree in dental hygiene",
    outlookNote: "High demand — one of the faster-growing healthcare roles",
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
    typicalEducation: "Associate degree in veterinary technology",
    outlookNote: "Growing demand as pet ownership increases",
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
    typicalEducation: "High school diploma; on-the-job training",
    outlookNote: "Widely available entry-level positions",
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
    typicalEducation: "Postsecondary certificate or associate degree",
    outlookNote: "Steady demand — emergency services are always needed",
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
    typicalEducation: "Bachelor's degree in natural resources or related field",
    outlookNote: "Competitive — fewer positions but rewarding work",
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
    typicalEducation: "Commercial driver's license (CDL)",
    outlookNote: "High demand — driver shortages are common",
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
    typicalEducation: "High school diploma; some roles prefer a degree",
    outlookNote: "Stable demand in public and academic libraries",
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
    typicalEducation: "High school diploma; on-the-job training",
    outlookNote: "High demand due to e-commerce growth",
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
    typicalEducation: "Associate degree or IT certification",
    outlookNote: "Strong demand as technology use grows everywhere",
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

  // ---- Healthcare ----
  // O*NET: 29-1141.00 — Registered Nurses
  // Work Context: contact with others (high), responsible for others' health/safety,
  // consequence of error (high), structured vs unstructured work (moderate-high)
  {
    id: "registered-nurse",
    title: "Registered Nurse",
    shortDescription: "Care for patients in hospitals or clinics — monitor health, give medicine, and support recovery.",
    typicalEducation: "Associate or bachelor's degree in nursing",
    outlookNote: "Very high demand — nursing shortages are widespread",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["altruism", "security"],
    },
  },
  // O*NET: 29-1051.00 — Pharmacists
  // Work Context: indoors (high), contact with others (moderate-high), importance of
  // being exact (very high), consequence of error (very high)
  {
    id: "pharmacist",
    title: "Pharmacist",
    shortDescription: "Prepare and dispense medications, and advise patients on safe use.",
    typicalEducation: "Doctor of Pharmacy (PharmD) degree",
    outlookNote: "Stable demand in retail and hospital settings",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["altruism", "security"],
    },
  },
  // O*NET: 29-1123.00 — Physical Therapists
  // Work Context: contact with others (very high), physical proximity (very close),
  // structured vs unstructured (moderate), consequence of error (moderate)
  {
    id: "physical-therapist",
    title: "Physical Therapist",
    shortDescription: "Help people recover from injuries by guiding them through exercises and treatments.",
    typicalEducation: "Doctor of Physical Therapy (DPT) degree",
    outlookNote: "High demand — aging population drives growth",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  // O*NET: 31-9092.00 — Medical Assistants
  // Work Context: contact with others (high), indoors (high), importance of being exact
  // (high), consequence of error (moderate-high)
  {
    id: "medical-assistant",
    title: "Medical Assistant",
    shortDescription: "Help doctors by taking vitals, preparing patients, and handling paperwork in a clinic.",
    typicalEducation: "Postsecondary certificate or associate degree",
    outlookNote: "Very high demand — one of the fastest-growing healthcare roles",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["organizational", "physical"],
      errorPressure: ["moderate", "high"],
      workValue: ["altruism", "security"],
    },
  },

  // ---- Education ----
  // O*NET: 25-2031.00 — Secondary School Teachers
  // Work Context: contact with others (very high), public speaking (high), structured
  // vs unstructured (moderate), consequence of error (moderate)
  {
    id: "teacher",
    title: "Teacher",
    shortDescription: "Teach students in a school — plan lessons, explain ideas, and help kids learn.",
    typicalEducation: "Bachelor's degree plus teaching certification",
    outlookNote: "Steady demand — teacher shortages in many areas",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational", "creative"],
      errorPressure: ["low", "moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  // O*NET: 21-1012.00 — Educational, Guidance, and Career Counselors
  // Work Context: contact with others (very high), face-to-face discussions (daily),
  // freedom to make decisions (high), consequence of error (moderate)
  {
    id: "school-counselor",
    title: "School Counselor",
    shortDescription: "Support students with personal, academic, and career challenges at school.",
    typicalEducation: "Master's degree in school counseling",
    outlookNote: "Growing demand as schools expand mental health support",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "security"],
    },
  },

  // ---- STEM ----
  // O*NET: 17-2051.00 — Civil Engineers
  // Work Context: importance of being exact (very high), consequence of error (very high),
  // indoors/outdoors mix, contact with others (moderate-high)
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    shortDescription: "Design and oversee construction of roads, bridges, and buildings.",
    typicalEducation: "Bachelor's degree in civil engineering",
    outlookNote: "Steady demand — infrastructure investment is growing",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "security"],
    },
  },
  // O*NET: 19-2041.00 — Environmental Scientists
  // Work Context: outdoors (frequent), freedom to make decisions (high), structured vs
  // unstructured (moderate), consequence of error (moderate)
  {
    id: "environmental-scientist",
    title: "Environmental Scientist",
    shortDescription: "Study the environment — test water, soil, and air to protect nature and public health.",
    typicalEducation: "Bachelor's degree in environmental science or related field",
    outlookNote: "Growing demand driven by climate and sustainability focus",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "autonomy"],
    },
  },
  // O*NET: 15-1212.00 — Information Security Analysts
  // Work Context: importance of being exact (very high), consequence of error (very high),
  // time pressure (high), indoors (high)
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    shortDescription: "Protect computer systems from hackers and security threats.",
    typicalEducation: "Bachelor's degree in cybersecurity or IT; certifications help",
    outlookNote: "Very high demand — one of the fastest-growing tech fields",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "security"],
    },
  },

  // ---- Finance ----
  // O*NET: 13-2052.00 — Personal Financial Advisors
  // Work Context: contact with others (very high), face-to-face (daily), importance of
  // being exact (high), consequence of error (high)
  {
    id: "financial-advisor",
    title: "Financial Advisor",
    shortDescription: "Help people manage their money — plan budgets, investments, and savings.",
    typicalEducation: "Bachelor's degree in finance or related field",
    outlookNote: "Good demand — people always need help managing money",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical", "organizational"],
      errorPressure: ["high"],
      workValue: ["achievement", "security"],
    },
  },
  // O*NET: 43-3071.00 — Tellers
  // Work Context: contact with others (very high), importance of being exact (very high),
  // repetitive work (high), indoors (high)
  {
    id: "bank-teller",
    title: "Bank Teller",
    shortDescription: "Help bank customers with deposits, withdrawals, and account questions.",
    typicalEducation: "High school diploma; on-the-job training",
    outlookNote: "Declining slightly as banking moves online",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["security"],
    },
  },

  // ---- Government / Public Service ----
  // O*NET: 33-2011.00 — Firefighters
  // Work Context: consequence of error (very high), physical proximity (very close),
  // outdoors (frequent), time pressure (very high)
  {
    id: "firefighter",
    title: "Firefighter",
    shortDescription: "Respond to fires and emergencies to protect people and property.",
    typicalEducation: "Postsecondary certificate; fire academy training",
    outlookNote: "Competitive entry but steady demand",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["altruism", "achievement"],
    },
  },
  // O*NET: 21-1021.00 — Child, Family, and School Social Workers
  // Work Context: contact with others (very high), face-to-face (daily), consequence
  // of error (moderate-high), freedom to make decisions (moderate)
  {
    id: "social-worker",
    title: "Social Worker",
    shortDescription: "Help people and families deal with tough situations — housing, health, safety.",
    typicalEducation: "Bachelor's or master's degree in social work",
    outlookNote: "High demand — social services are expanding",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["altruism", "security"],
    },
  },
  // O*NET: 19-3051.00 — Urban and Regional Planners
  // Work Context: contact with others (high), indoors (high), structured vs unstructured
  // (moderate), consequence of error (moderate)
  {
    id: "urban-planner",
    title: "Urban Planner",
    shortDescription: "Plan how cities and neighborhoods grow — where to put parks, roads, and buildings.",
    typicalEducation: "Master's degree in urban planning or related field",
    outlookNote: "Steady demand as cities grow and adapt",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["analytical", "organizational"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  // O*NET: 33-3051.01 — Police Patrol Officers
  // Work Context: consequence of error (very high), contact with others (very high),
  // outdoors (frequent), time pressure (high), physical activity (moderate-high)
  {
    id: "police-officer",
    title: "Police Officer",
    shortDescription: "Patrol neighborhoods, respond to emergencies, and enforce laws to keep people safe.",
    typicalEducation: "High school diploma plus police academy; degree preferred",
    outlookNote: "Steady demand with ongoing recruitment efforts",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical", "organizational"],
      errorPressure: ["high"],
      workValue: ["altruism", "security"],
    },
  },

  // ---- Emerging Tech ----
  // O*NET: 15-1255.00 — Web and Digital Interface Designers (closest to UX)
  // Work Context: freedom to make decisions (high), indoors (high), contact with others
  // (moderate), structured vs unstructured (moderate)
  {
    id: "ux-designer",
    title: "UX Designer",
    shortDescription: "Design how apps and websites look and feel so they're easy and enjoyable to use.",
    typicalEducation: "Bachelor's degree in design, HCI, or portfolio-based entry",
    outlookNote: "High demand as companies invest in user experience",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose", "moderate"],
      primaryLoadType: ["creative"],
      errorPressure: ["low", "moderate"],
      workValue: ["autonomy", "achievement"],
    },
  },
  // O*NET: 17-3024.01 — Robotics Technicians
  // Work Context: importance of being exact (high), consequence of error (moderate-high),
  // indoors (high), contact with others (moderate)
  {
    id: "robotics-technician",
    title: "Robotics Technician",
    shortDescription: "Build, maintain, and repair robots and automated systems.",
    typicalEducation: "Associate degree or technical certification",
    outlookNote: "Growing demand as automation expands across industries",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["physical", "analytical"],
      errorPressure: ["moderate", "high"],
      workValue: ["achievement", "autonomy"],
    },
  },
  // O*NET: 47-2231.00 — Solar Photovoltaic Installers
  // Work Context: outdoors (very frequent), physical activity (high), importance of being
  // exact (high), consequence of error (high)
  {
    id: "renewable-energy-installer",
    title: "Renewable Energy Installer",
    shortDescription: "Install solar panels and other clean-energy systems on rooftops and in fields.",
    typicalEducation: "High school diploma plus on-the-job training or certification",
    outlookNote: "Very high demand — one of the fastest-growing occupations",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["security", "altruism"],
    },
  },

  // ---- Arts / Entertainment ----
  // O*NET: 27-4014.00 — Sound Engineering Technicians
  // Work Context: indoors (high), importance of being exact (high), contact with others
  // (moderate), time pressure (moderate-high)
  {
    id: "sound-engineer",
    title: "Sound Engineer",
    shortDescription: "Record, mix, and produce audio for music, film, or live events.",
    typicalEducation: "Associate degree or certificate in audio engineering",
    outlookNote: "Competitive — live events and streaming drive some growth",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["loose", "moderate"],
      primaryLoadType: ["creative", "analytical"],
      errorPressure: ["moderate"],
      workValue: ["autonomy", "achievement"],
    },
  },
  // O*NET: 27-1014.00 — Special Effects Artists and Animators
  // Work Context: indoors (high), freedom to make decisions (moderate-high), time pressure
  // (moderate-high), importance of being exact (moderate)
  {
    id: "animator",
    title: "Animator",
    shortDescription: "Create moving images and characters for films, games, or online content.",
    typicalEducation: "Bachelor's degree in animation, art, or related field",
    outlookNote: "Growing demand in gaming, film, and online media",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["creative"],
      errorPressure: ["low"],
      workValue: ["autonomy", "achievement"],
    },
  },
  // O*NET: 25-4012.00 — Curators
  // Work Context: indoors (high), contact with others (moderate-high), freedom to make
  // decisions (high), structured vs unstructured (moderate)
  {
    id: "museum-curator",
    title: "Museum Curator",
    shortDescription: "Collect, organize, and present exhibits in museums or galleries.",
    typicalEducation: "Master's degree in museum studies, history, or art",
    outlookNote: "Competitive — limited positions but rewarding work",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational", "creative"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },

  // ---- Entrepreneurship ----
  // O*NET: 11-1021.00 — General and Operations Managers (closest proxy)
  // Work Context: freedom to make decisions (very high), contact with others (very high),
  // consequence of error (high), time pressure (high)
  {
    id: "small-business-owner",
    title: "Small Business Owner",
    shortDescription: "Run your own business — make decisions, manage money, and serve customers.",
    typicalEducation: "Varies widely — no single path required",
    outlookNote: "Entrepreneurship is always an option for self-starters",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["loose", "moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["autonomy", "achievement"],
    },
  },

  // ---- Additional roles for sector balance ----
  // O*NET: 47-2152.00 — Plumbers, Pipefitters, and Steamfitters
  // Work Context: outdoors (frequent), physical activity (high), importance of being exact
  // (high), consequence of error (moderate-high)
  {
    id: "plumber",
    title: "Plumber",
    shortDescription: "Install and repair pipes for water, gas, and drainage in homes and buildings.",
    typicalEducation: "Trade certification or apprenticeship",
    outlookNote: "Strong demand — skilled trades are in short supply",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate", "high"],
      workValue: ["security", "autonomy"],
    },
  },
  // O*NET: 27-3023.00 — News Analysts, Reporters, and Journalists
  // Work Context: time pressure (very high), freedom to make decisions (high), contact
  // with others (high), outdoors/indoors mix
  {
    id: "journalist",
    title: "Journalist",
    shortDescription: "Research and write news stories for newspapers, websites, or TV.",
    typicalEducation: "Bachelor's degree in journalism or communications",
    outlookNote: "Competitive — digital media skills are increasingly valued",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["loose", "moderate"],
      primaryLoadType: ["creative"],
      errorPressure: ["moderate", "high"],
      workValue: ["autonomy", "achievement"],
    },
  },
  // O*NET: 39-9031.00 — Exercise Trainers and Group Fitness Instructors
  // Work Context: contact with others (very high), physical activity (very high),
  // consequence of error (moderate), freedom to make decisions (moderate-high)
  {
    id: "personal-trainer",
    title: "Personal Trainer",
    shortDescription: "Help people get fit by designing workouts and coaching them through exercises.",
    typicalEducation: "Certification in personal training; degree optional",
    outlookNote: "Growing demand as health and fitness awareness rises",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  // O*NET: 41-9022.00 — Real Estate Sales Agents
  // Work Context: contact with others (very high), freedom to make decisions (very high),
  // time pressure (moderate-high), consequence of error (moderate)
  {
    id: "real-estate-agent",
    title: "Real Estate Agent",
    shortDescription: "Help people buy and sell homes — show properties, negotiate deals, handle paperwork.",
    typicalEducation: "High school diploma plus real estate license",
    outlookNote: "Demand varies with housing market conditions",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },
  // O*NET: 53-2031.00 — Flight Attendants
  // Work Context: contact with others (very high), consequence of error (moderate-high),
  // time pressure (high), physical proximity (very close)
  {
    id: "flight-attendant",
    title: "Flight Attendant",
    shortDescription: "Ensure passenger safety and comfort on airplane flights.",
    typicalEducation: "High school diploma; airline-specific training",
    outlookNote: "Competitive entry but growing as air travel increases",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["security", "altruism"],
    },
  },
  // O*NET: 27-2022.00 — Coaches and Scouts
  // Work Context: contact with others (very high), outdoors (frequent), consequence of
  // error (moderate), freedom to make decisions (moderate-high)
  {
    id: "athletic-coach",
    title: "Athletic Coach",
    shortDescription: "Train athletes or teams — plan practices, teach skills, and lead during competitions.",
    typicalEducation: "Bachelor's degree; coaching certification often required",
    outlookNote: "Steady demand in schools, colleges, and community programs",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["physical", "organizational"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  // O*NET: 29-1131.00 — Veterinarians
  // Work Context: contact with others (high), importance of being exact (very high),
  // physical proximity (close), consequence of error (high)
  {
    id: "veterinarian",
    title: "Veterinarian",
    shortDescription: "Diagnose and treat illnesses and injuries in animals.",
    typicalEducation: "Doctor of Veterinary Medicine (DVM) degree",
    outlookNote: "Good demand — pet ownership and animal care are growing",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical", "analytical"],
      errorPressure: ["high"],
      workValue: ["altruism", "achievement"],
    },
  },
] as const;
