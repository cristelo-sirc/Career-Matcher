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
    futureOutlook: "Automation Resistant. High demand due to electrification.",
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
    futureOutlook: "Resilient. Shift toward EV diagnostics and system integration.",
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
    futureOutlook: "Resilient. Field work is un-automatable; factory work is automating.",
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
    futureOutlook: "Resilient. Complex physical environment.",
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
    futureOutlook: "Resilient. Custom work and renovation are safe from robots.",
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
    futureOutlook: "Transforming. Shift from writing code to reviewing AI-generated code.",
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
    futureOutlook: "Stable. Automated equipment requires human oversight.",
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
    futureOutlook: "Transforming. Shift to high-level interpretation and strategy.",
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


  // ---- Creative ----
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    shortDescription: "Create visual designs for logos, websites, posters, and more.",
    typicalEducation: "Bachelor's degree or portfolio-based entry",
    outlookNote: "Competitive — strong portfolios make the difference",
    futureOutlook: "Transforming. AI generation is powerful; role shifts to art direction.",
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
    futureOutlook: "Transforming. AI tools speed up workflow; storytelling remains human.",
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
    futureOutlook: "Resilient. Taste and creativity are human domains.",
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
    futureOutlook: "Transforming. High competition from AI; value in authentic captures.",
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
    futureOutlook: "Transforming. Heavy AI optimization; exception handling remains.",
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
    id: "event-planner",
    title: "Event Planner",
    shortDescription: "Organize events like weddings, conferences, and parties.",
    typicalEducation: "Bachelor's degree in hospitality or related field",
    outlookNote: "Growing demand as events industry expands",
    futureOutlook: "Resilient. High-touch coordination and experience design.",
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
    futureOutlook: "Resilient. Precision physical work.",
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
    futureOutlook: "Resilient. Animal handing is physical/unpredictable.",
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
    id: "paramedic",
    title: "Paramedic / EMT",
    shortDescription: "Respond to emergencies and give medical care on the scene.",
    typicalEducation: "Postsecondary certificate or associate degree",
    outlookNote: "Steady demand — emergency services are always needed",
    futureOutlook: "Highly Resilient. Chaos management impossible for current AI.",
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
    futureOutlook: "Resilient. Stewardship is a human value.",
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
    id: "library-assistant",
    title: "Library Assistant",
    shortDescription: "Help visitors find books, organize materials, and keep the library running.",
    typicalEducation: "High school diploma; some roles prefer a degree",
    outlookNote: "Stable demand in public and academic libraries",
    futureOutlook: "Transforming. Focus shifting to community hub management.",
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
    futureOutlook: "At Risk. Logistics robotics are advancing rapidly.",
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
    futureOutlook: "Transforming. Basic support automating; complex hardware/software issues remain.",
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
    futureOutlook: "Highly Resilient. Physical care + empathy cannot be automated.",
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
    futureOutlook: "Transforming. Dispensing is automating; clinical advisory is growing.",
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
    futureOutlook: "Highly Resilient. Physical manipulation + coaching.",
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
    futureOutlook: "Resilient. High-touch patient interaction.",
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
    futureOutlook: "Resilient. Mentorship and social-emotional guidance are key.",
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
    futureOutlook: "Highly Resilient. Emotional support requires humans.",
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
    futureOutlook: "Stable. Infrastructure requires human sign-off/liability.",
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
    futureOutlook: "Growth Area. Climate data analysis is critical.",
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
    futureOutlook: "High Growth. AI vs AI cyber warfare requires human strategy.",
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
    futureOutlook: "Resilient. Relationship-based trust is key.",
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
    futureOutlook: "Highly Resilient. Physical danger requires human judgment.",
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
    futureOutlook: "Highly Resilient. Complex human systems.",
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
    futureOutlook: "Stable. Complex stakeholder negotiation.",
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
    futureOutlook: "Resilient. High stakes, unpredictable.",
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
    futureOutlook: "Stable. Empathy for user needs cannot be fully simulated.",
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
    futureOutlook: "Growth Area. Building the robots that automate others.",
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
    futureOutlook: "Growth Area. Green energy transition.",
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
    futureOutlook: "Stable. Live events are safe; studio work is automating.",
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
    futureOutlook: "Transforming. AI generation tools assisting; creative direction key.",
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
    futureOutlook: "Resilient. Curation is about meaning, not just sorting.",
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
    futureOutlook: "Resilient. Entrepreneurial drive is human.",
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
    futureOutlook: "Transforming. AI writes summaries; humans do investigation.",
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
    futureOutlook: "Resilient. Motivation is human.",
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
    futureOutlook: "Transforming. AI impact high; relationship value remains.",
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
    futureOutlook: "Resilient. Safety + Service.",
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
    futureOutlook: "Resilient. Coaching is leadership.",
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
    futureOutlook: "Resilient. Diagnosis + Surgery.",
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

  // ---- Legal ----
  // O*NET: 23-1011.00 — Lawyers
  // Work Context: importance of being exact (very high), consequence of error (high),
  // contact with others (high), time pressure (high)
  {
    id: "lawyer",
    title: "Lawyer",
    shortDescription: "Represent clients in legal matters — research laws, argue cases, and draft documents.",
    typicalEducation: "Juris Doctor (JD) degree plus bar exam",
    outlookNote: "Steady demand — legal services are always needed",
    futureOutlook: "Transforming. Document review automated; strategy/argument remains.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "autonomy"],
    },
  },
  // O*NET: 23-2011.00 — Paralegals and Legal Assistants
  // Work Context: importance of being exact (very high), contact with others (moderate),
  // indoors (high), structured work (high)
  {
    id: "paralegal",
    title: "Paralegal",
    shortDescription: "Support lawyers by researching cases, organizing files, and drafting legal documents.",
    typicalEducation: "Associate degree or certificate in paralegal studies",
    outlookNote: "Growing demand as law firms seek cost-effective support",
    futureOutlook: "At Risk. Research/Drafting highly automated.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical", "organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["security", "achievement"],
    },
  },

  // ---- Architecture / Design ----
  // O*NET: 17-1011.00 — Architects, Except Landscape and Naval
  // Work Context: importance of being exact (very high), consequence of error (high),
  // freedom to make decisions (high), contact with others (moderate-high)
  {
    id: "architect",
    title: "Architect",
    shortDescription: "Design buildings and spaces — draw plans, choose materials, and oversee construction.",
    typicalEducation: "Bachelor's or master's degree in architecture plus licensure",
    outlookNote: "Moderate demand — tied to construction and development cycles",
    futureOutlook: "Stable. Creative + Regulation.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["creative", "analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "autonomy"],
    },
  },
  // O*NET: 27-1025.00 — Interior Designers
  // Work Context: freedom to make decisions (high), contact with others (high),
  // importance of being exact (moderate), structured vs unstructured (moderate)
  {
    id: "interior-designer",
    title: "Interior Designer",
    shortDescription: "Plan and design indoor spaces — pick colors, furniture, and layouts for homes or offices.",
    typicalEducation: "Bachelor's degree in interior design",
    outlookNote: "Moderate demand — grows with construction and renovation activity",
    futureOutlook: "Resilient. Spatial sense + client taste.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose", "moderate"],
      primaryLoadType: ["creative"],
      errorPressure: ["low", "moderate"],
      workValue: ["autonomy", "achievement"],
    },
  },

  // ---- Science / Research ----
  // O*NET: 19-1042.00 — Medical Scientists
  // Work Context: importance of being exact (very high), consequence of error (high),
  // indoors (high), contact with others (moderate)
  {
    id: "biotech-researcher",
    title: "Biotech Researcher",
    shortDescription: "Conduct experiments in biology or medicine to develop new treatments or products.",
    typicalEducation: "Master's or doctoral degree in biology, biochemistry, or related field",
    outlookNote: "High demand — biotech and pharmaceutical industries are growing fast",
    futureOutlook: "Growth Area. AI accelerates discovery but humans direct it.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "altruism"],
    },
  },
  // O*NET: 19-2021.00 — Atmospheric and Space Scientists
  // Work Context: importance of being exact (high), indoors (high), time pressure
  // (moderate-high), contact with others (moderate)
  {
    id: "meteorologist",
    title: "Meteorologist",
    shortDescription: "Study weather patterns and make forecasts to help people prepare for conditions.",
    typicalEducation: "Bachelor's degree in meteorology or atmospheric science",
    outlookNote: "Niche field — growing interest due to climate awareness",
    futureOutlook: "Stable. AI improves models; humans communicate impact.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "altruism"],
    },
  },

  // ---- Hospitality ----
  // O*NET: 11-9081.00 — Lodging Managers
  // Work Context: contact with others (very high), time pressure (high), consequence of
  // error (moderate), freedom to make decisions (high)
  {
    id: "hotel-manager",
    title: "Hotel Manager",
    shortDescription: "Run a hotel or lodge — manage staff, handle guests, and keep operations smooth.",
    typicalEducation: "Bachelor's degree in hospitality management",
    outlookNote: "Steady demand — travel and tourism drive opportunities",
    futureOutlook: "Resilient. Hospitality is human-centric.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "security"],
    },
  },

  // ---- Media / Communications ----
  // O*NET: 13-1161.00 — Market Research Analysts and Marketing Specialists
  // Work Context: contact with others (moderate-high), time pressure (moderate-high),
  // freedom to make decisions (moderate), indoors (high)
  {
    id: "marketing-coordinator",
    title: "Marketing Coordinator",
    shortDescription: "Plan and run marketing campaigns — social media, ads, and events to promote a brand.",
    typicalEducation: "Bachelor's degree in marketing or communications",
    outlookNote: "Strong demand — every business needs marketing",
    futureOutlook: "Transforming. AI generates content; humans manage strategy.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["creative", "organizational"],
      errorPressure: ["low", "moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },
  // O*NET: 27-3031.00 — Public Relations Specialists
  // Work Context: contact with others (very high), time pressure (high), freedom to make
  // decisions (moderate-high), importance of being exact (moderate)
  {
    id: "pr-specialist",
    title: "PR Specialist",
    shortDescription: "Manage a company's public image — write press releases, handle media, and plan outreach.",
    typicalEducation: "Bachelor's degree in public relations or communications",
    outlookNote: "Steady demand as organizations manage their public presence",
    futureOutlook: "Resilient. Crisis management and relationships are human.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational", "creative"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },
  // O*NET: 27-3042.00 — Technical Writers
  // Work Context: indoors (high), importance of being exact (high), contact with others
  // (moderate), structured (moderate-high)
  {
    id: "technical-writer",
    title: "Technical Writer",
    shortDescription: "Write clear instructions, manuals, and guides that help people use products or systems.",
    typicalEducation: "Bachelor's degree in English, technical writing, or a technical field",
    outlookNote: "Growing demand — complex products need clear documentation",
    futureOutlook: "Transforming. AI drafts; humans edit and verify accuracy.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical", "creative"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },

  // ---- Skilled Trades (additional) ----
  // O*NET: 49-9021.00 — Heating, Air Conditioning, and Refrigeration Mechanics
  // Work Context: outdoors (frequent), physical activity (high), importance of being exact
  // (high), consequence of error (moderate-high)
  {
    id: "hvac-technician",
    title: "HVAC Technician",
    shortDescription: "Install and repair heating, cooling, and ventilation systems in buildings.",
    typicalEducation: "Trade certification or apprenticeship",
    outlookNote: "High demand — skilled trades shortage plus energy efficiency upgrades",
    futureOutlook: "Resilient. Critical for climate adaptation.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate", "high"],
      workValue: ["security", "autonomy"],
    },
  },
  // O*NET: 47-2061.00 — Construction Laborers
  // Work Context: outdoors (very frequent), physical activity (very high), importance of
  // being exact (moderate), consequence of error (moderate)
  {
    id: "construction-manager",
    title: "Construction Manager",
    shortDescription: "Oversee building projects — schedule workers, manage budgets, and ensure safety.",
    typicalEducation: "Bachelor's degree in construction management or related field",
    outlookNote: "Strong demand — construction activity continues to grow",
    futureOutlook: "Resilient. Site management requires human judgment.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["achievement", "security"],
    },
  },

  // ---- Technology (additional) ----
  // O*NET: 15-1245.00 — Database Administrators and Architects
  // Work Context: importance of being exact (very high), consequence of error (very high),
  // indoors (high), contact with others (moderate)
  {
    id: "database-administrator",
    title: "Database Administrator",
    shortDescription: "Manage and protect the data that organizations rely on — keep databases running and secure.",
    typicalEducation: "Bachelor's degree in computer science or IT",
    outlookNote: "Steady demand — data is critical for every organization",
    futureOutlook: "Review. Cloud/AI automation increasing; shift to data architecture.",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },
  // O*NET: 15-1244.00 — Network and Computer Systems Administrators
  // Work Context: importance of being exact (very high), consequence of error (very high),
  // time pressure (high), indoors (high)
  {
    id: "network-engineer",
    title: "Network Engineer",
    shortDescription: "Design and maintain computer networks that keep people and systems connected.",
    typicalEducation: "Bachelor's degree in IT or network engineering; certifications help",
    outlookNote: "Strong demand — networks underpin everything digital",
    futureOutlook: "Stable. Physical infrastructure and complex routing needs humans.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "security"],
    },
  },

  // ---- Healthcare (additional) ----
  // O*NET: 29-1122.00 — Occupational Therapists
  // Work Context: contact with others (very high), physical proximity (close),
  // consequence of error (moderate), freedom to make decisions (moderate-high)
  {
    id: "occupational-therapist",
    title: "Occupational Therapist",
    shortDescription: "Help people with injuries or disabilities learn to do everyday activities again.",
    typicalEducation: "Master's degree in occupational therapy",
    outlookNote: "High demand — aging population and rehabilitation needs drive growth",
    futureOutlook: "Highly Resilient. Physical manipulation + coaching.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["physical", "organizational"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  // O*NET: 29-1031.00 — Dietitians and Nutritionists
  // Work Context: contact with others (high), importance of being exact (moderate-high),
  // indoors (high), freedom to make decisions (moderate)
  {
    id: "dietitian",
    title: "Dietitian",
    shortDescription: "Plan nutrition programs and advise people on healthy eating to improve their well-being.",
    typicalEducation: "Bachelor's degree in dietetics or nutrition plus licensure",
    outlookNote: "Growing demand — increasing focus on preventive health",
    futureOutlook: "Resilient. Behavioral psychology + nutrition.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical", "organizational"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },

  // ---- Transportation ----
  // O*NET: 53-2021.00 — Air Traffic Controllers
  // Work Context: consequence of error (very high), time pressure (very high), importance
  // of being exact (very high), contact with others (high)
  {
    id: "air-traffic-controller",
    title: "Air Traffic Controller",
    shortDescription: "Guide airplanes safely through takeoff, landing, and flight by giving pilots directions.",
    typicalEducation: "FAA-approved training program or bachelor's degree",
    outlookNote: "Competitive entry but excellent pay and benefits",
    futureOutlook: "Stable. High stakes human oversight.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable", "chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },

  // ---- Agriculture ----
  // O*NET: 45-2093.00 — Farmworkers, Farm, Ranch, and Aquacultural Animals
  // Work Context: outdoors (very frequent), physical activity (very high), consequence of
  // error (moderate), freedom to make decisions (varies)
  {
    id: "farmer",
    title: "Farmer / Rancher",
    shortDescription: "Grow crops or raise animals for food — plan planting, tend land, and manage harvests.",
    typicalEducation: "High school diploma; agricultural science degree helpful",
    outlookNote: "Stable — farming is essential, with growing interest in sustainable agriculture",
    futureOutlook: "Resilient. Ag-tech support.",
    profile: {
      energyRhythm: ["steady", "burst"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate"],
      workValue: ["autonomy", "security"],
    },
  },

  // ---- Creative / Gig ----
  // O*NET: 27-3043.00 — Writers and Authors
  // Work Context: freedom to make decisions (very high), indoors (high), structured vs
  // unstructured (low), time pressure (varies)
  {
    id: "freelance-writer",
    title: "Freelance Writer / Content Creator",
    shortDescription: "Write articles, blog posts, or social media content for clients or your own audience.",
    typicalEducation: "Bachelor's degree in writing or communications; portfolio-based",
    outlookNote: "Growing demand for digital content, but highly competitive",
    futureOutlook: "At Risk/Transforming. Content mills dying; high-value insight remains.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["solo"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["creative"],
      errorPressure: ["low"],
      workValue: ["autonomy", "achievement"],
    },
  },

  // ---- Additional varied roles ----
  // O*NET: 31-9091.00 — Dental Assistants
  // Work Context: contact with others (high), importance of being exact (high),
  // physical proximity (very close), indoors (high)
  {
    id: "dental-assistant",
    title: "Dental Assistant",
    shortDescription: "Help dentists during procedures — prepare instruments, take X-rays, and comfort patients.",
    typicalEducation: "Postsecondary certificate or on-the-job training",
    outlookNote: "High demand — one of the faster-growing healthcare support roles",
    futureOutlook: "Resilient. Chair-side assistance is physical.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical", "organizational"],
      errorPressure: ["moderate", "high"],
      workValue: ["altruism", "security"],
    },
  },
  // O*NET: 15-1254.00 — Web Developers
  // Work Context: indoors (high), freedom to make decisions (moderate-high), contact with
  // others (moderate), importance of being exact (moderate)
  {
    id: "web-developer",
    title: "Web Developer",
    shortDescription: "Build and maintain websites — write code, design pages, and fix bugs.",
    typicalEducation: "Associate or bachelor's degree, or coding bootcamp",
    outlookNote: "Strong demand — the web is everywhere",
    futureOutlook: "Transforming. AI generation of standard sites is high.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical", "creative"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },
  // O*NET: 23-2091.00 — Court Reporters and Simultaneous Captioners
  // Work Context: importance of being exact (very high), indoors (high), time pressure
  // (very high), contact with others (moderate)
  {
    id: "court-reporter",
    title: "Court Reporter",
    shortDescription: "Create word-for-word records of legal proceedings, meetings, or live broadcasts.",
    typicalEducation: "Postsecondary certificate or associate degree in court reporting",
    outlookNote: "Stable demand — courts always need accurate records",
    futureOutlook: "At Risk. Voice-to-text is very good.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },
  // O*NET: 29-2081.00 — Opticians, Dispensing
  // Work Context: contact with others (high), importance of being exact (high), indoors
  // (high), consequence of error (moderate)
  {
    id: "optician",
    title: "Optician",
    shortDescription: "Help people pick and fit eyeglasses and contact lenses prescribed by eye doctors.",
    typicalEducation: "High school diploma plus on-the-job training; licensure in some states",
    outlookNote: "Steady demand — vision care is always needed",
    futureOutlook: "Stable. Service + sales.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate", "strict"],
      primaryLoadType: ["organizational", "physical"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "security"],
    },
  },
  // O*NET: 17-1022.00 — Surveyors
  // Work Context: outdoors (frequent), importance of being exact (very high), physical
  // activity (moderate), contact with others (moderate)
  {
    id: "surveyor",
    title: "Surveyor",
    shortDescription: "Measure land and property boundaries using specialized tools and technology.",
    typicalEducation: "Bachelor's degree in surveying or geomatics",
    outlookNote: "Steady demand — construction and land development drive need",
    futureOutlook: "Stable. Integrated with drone tech/GPS.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal", "moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical", "physical"],
      errorPressure: ["high"],
      workValue: ["achievement", "security"],
    },
  },
  // O*NET: 49-9031.00 — Home Appliance Repairers
  // Work Context: physical activity (moderate-high), contact with others (moderate),
  // consequence of error (moderate), structured (moderate)
  {
    id: "appliance-repair-tech",
    title: "Appliance Repair Technician",
    shortDescription: "Diagnose and fix household appliances like dishwashers, ovens, and washing machines.",
    typicalEducation: "High school diploma plus technical training or apprenticeship",
    outlookNote: "Steady demand — appliances always need fixing",
    futureOutlook: "Resilient. Diagnostics in varied environments.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["physical"],
      errorPressure: ["moderate"],
      workValue: ["security", "autonomy"],
    },
  },
  // ---- Green & Bio Economy ----
  {
    id: "sustainability-specialist",
    title: "Sustainability Specialist",
    shortDescription: "Help organizations save energy, reduce waste, and be more eco-friendly.",
    typicalEducation: "Bachelor's degree in environmental science or related field",
    outlookNote: "High demand — companies are racing to meet green goals",
    futureOutlook: "Resilient. Requires complex strategic thinking and local adaptation.",
    profile: {
      energyRhythm: ["steady", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical", "organizational"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  {
    id: "climate-resilience-planner",
    title: "Climate Resilience Planner",
    shortDescription: "Design cities and systems to withstand extreme weather and climate change.",
    typicalEducation: "Master's degree in urban planning or environmental science",
    outlookNote: "Critical demand as climate impacts increase",
    futureOutlook: "Future-Proof. High complexity and social negotiation required.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical", "organizational"],
      errorPressure: ["high"],
      workValue: ["altruism", "security"],
    },
  },
  {
    id: "vertical-farming-manager",
    title: "Vertical Farming Manager",
    shortDescription: "Manage high-tech indoor farms that grow food in stacked layers.",
    typicalEducation: "Bachelor's degree in agriculture or engineering",
    outlookNote: "Rapidly growing sector for urban food security",
    futureOutlook: "Growth Area. Combines biology with robotics management.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical", "organizational"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "security"],
    },
  },
  {
    id: "genomic-counselor",
    title: "Genomic Counselor",
    shortDescription: "Help patients understand their genetic risks and personalized medicine options.",
    typicalEducation: "Master's degree in genetic counseling",
    outlookNote: "Explosive growth as medicine becomes personalized",
    futureOutlook: "Highly Resilient. Requires deep empathy + deep science.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["altruism", "achievement"],
    },
  },

  // ---- Human-Machine Teaming ----
  {
    id: "ai-ethics-specialist",
    title: "AI Ethics Specialist",
    shortDescription: "Ensure AI systems are fair, safe, and used responsibly.",
    typicalEducation: "Advanced degree in philosophy, law, or computer science",
    outlookNote: "Emerging field — critical for companies using AI",
    futureOutlook: "Frontier Role. Defining the rules for machines.",
    profile: {
      energyRhythm: ["burst", "mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["altruism", "autonomy"],
    },
  },
  {
    id: "smart-city-technician",
    title: "Smart City Technician",
    shortDescription: "Install and fix the sensors and systems that make cities 'smart'.",
    typicalEducation: "Associate degree or technical certification",
    outlookNote: "Growing demand as infrastructure gets upgraded",
    futureOutlook: "Resilient. Physical world work that robots struggle with.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical", "analytical"],
      errorPressure: ["moderate"],
      workValue: ["security", "achievement"],
    },
  },
  {
    id: "robot-teaming-coordinator",
    title: "Robot Teaming Coordinator",
    shortDescription: "Manage the workflow between human workers and robot assistants.",
    typicalEducation: "Bachelor's degree in ops management or robotics",
    outlookNote: "New category — defining how we work with machines",
    futureOutlook: "Growth Area. The 'manager' of the future workforce.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "security"],
    },
  },
  {
    id: "cyber-physical-analyst",
    title: "Cyber-Physical Security Analyst",
    shortDescription: "Protect physical systems like power grids and factories from digital attacks.",
    typicalEducation: "Bachelor's degree in cybersecurity or engineering",
    outlookNote: "Critical demand — stopping hackers from breaking real-world things",
    futureOutlook: "Highly Resilient. High stakes, high complexity.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },
  {
    id: "virtual-experience-designer",
    title: "Virtual Experience Designer",
    shortDescription: "Create immersive 3D worlds for work, play, or learning.",
    typicalEducation: "Bachelor's degree in design, game dev, or architecture",
    outlookNote: "Growing with VR/AR adoption",
    futureOutlook: "Creative Frontier. Building the 'places' we visit digitally.",
    profile: {
      energyRhythm: ["burst", "steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["creative"],
      errorPressure: ["low"],
      workValue: ["autonomy", "achievement"],
    },
  },

  // ---- Care & Longevity ----
  {
    id: "aging-in-place-specialist",
    title: "Aging-in-Place Specialist",
    shortDescription: "Modify homes so seniors can live safely and independently.",
    typicalEducation: "Certification in construction, interior design, or occupational therapy",
    outlookNote: "High demand due to aging population",
    futureOutlook: "Resilient. Custom physical work + deep empathy.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable", "variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical", "organizational"],
      errorPressure: ["high"],
      workValue: ["altruism", "autonomy"],
    },
  },
  {
    id: "memory-care-director",
    title: "Memory Care Director",
    shortDescription: "Design activities and environments for people with dementia.",
    typicalEducation: "Bachelor's degree in gerontology, social work, or nursing",
    outlookNote: "Critical need as dementia rates rise",
    futureOutlook: "Human-Centric. AI cannot replace this level of care.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group", "crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational", "creative"],
      errorPressure: ["high"],
      workValue: ["altruism", "security"],
    },
  },
  {
    id: "telehealth-coordinator",
    title: "Telehealth Coordinator",
    shortDescription: "Manage the technology and logistics for remote medical visits.",
    typicalEducation: "Associate degree or certificate in health IT",
    outlookNote: "Standardizing — telehealth is now normal healthcare",
    futureOutlook: "Tech-Enabled Service. Bridging the digital divide.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate"],
      workValue: ["security", "altruism"],
    },
  },
  {
    id: "end-of-life-doula",
    title: "End-of-Life Doula",
    shortDescription: "Provide emotional and practical support to people near the end of life.",
    typicalEducation: "Certification program",
    outlookNote: "Growing interest in holistic end-of-life care",
    futureOutlook: "Deeply Human. Pure empathy role.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["organizational"], // Emotional labor is hard to categorize, 'organizational' fits the coordination aspect
      errorPressure: ["high"],
      workValue: ["altruism", "autonomy"],
    },
  },

  // ---- Experience & Community ----
  {
    id: "specialized-artisan",
    title: "Specialized Artisan",
    shortDescription: "Create high-quality custom goods by hand (furniture, jewelry, leather).",
    typicalEducation: "Apprenticeship or self-taught",
    outlookNote: "Niche but premium demand — 'Made by Human' is a luxury",
    futureOutlook: "Resilient. The antidote to mass production.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["variable"],
      ruleDensity: ["loose"],
      primaryLoadType: ["physical", "creative"],
      errorPressure: ["moderate"],
      workValue: ["autonomy", "achievement"],
    },
  },
  {
    id: "adventure-guide",
    title: "Adventure Guide",
    shortDescription: "Lead people on outdoor expeditions (hiking, rafting, climbing).",
    typicalEducation: "Certifications in safety/skills",
    outlookNote: "Growing — people value experiences over stuff",
    futureOutlook: "Resilient. High physical skill + social leadership.",
    profile: {
      energyRhythm: ["burst"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"], // safety rules
      primaryLoadType: ["physical"],
      errorPressure: ["high"],
      workValue: ["autonomy", "achievement"],
    },
  },
  {
    id: "personal-data-archivist",
    title: "Personal Data Archivist",
    shortDescription: "Organize and preserve a family's digital history and memories.",
    typicalEducation: "Library science or information management background",
    outlookNote: "Emerging niche as digital footprints grow",
    futureOutlook: "New Service. Managing our digital legacy.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["low"],
      workValue: ["security", "autonomy"],
    },
  },
  {
    id: "community-manager",
    title: "Community Manager",
    shortDescription: "Build and nurture online or offline communities for brands or causes.",
    typicalEducation: "Bachelor's degree in communications or marketing",
    outlookNote: "High demand — community is the new moat",
    futureOutlook: "Resilient. Requires high EQ and conflict resolution.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["crowd"],
      interactionDemand: ["constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational"],
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },

  // ---- Resilient Fundamentals (Missing) ----
  {
    id: "speech-language-pathologist",
    title: "Speech-Language Pathologist",
    shortDescription: "Diagnose and treat communication and swallowing disorders.",
    typicalEducation: "Master's degree",
    outlookNote: "High demand — diverse needs across all ages",
    futureOutlook: "Resilient. Complex biological/social nuancing.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["analytical"], // + Educational
      errorPressure: ["moderate"],
      workValue: ["altruism", "achievement"],
    },
  },
  {
    id: "mental-health-counselor",
    title: "Mental Health Counselor",
    shortDescription: "Help people manage emotions, stress, and mental health challenges.",
    typicalEducation: "Master's degree",
    outlookNote: "Very high demand — mental health crisis is a priority",
    futureOutlook: "Human-Centric. AI can support but not replace therapeutic alliance.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo", "small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["analytical"], // Analyzing emotions/patterns
      errorPressure: ["high"],
      workValue: ["altruism", "autonomy"],
    },
  },
  {
    id: "custom-cabinetmaker",
    title: "Custom Cabinetmaker",
    shortDescription: "Build high-end wood cabinets and furniture to exact specs.",
    typicalEducation: "Apprenticeship",
    outlookNote: "Stable niche — automation struggles with custom installs",
    futureOutlook: "Resilient. Tactile skill + on-site customization.",
    profile: {
      energyRhythm: ["steady"],
      peopleDensity: ["solo"],
      interactionDemand: ["minimal"],
      schedulePredictability: ["predictable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["physical", "creative"],
      errorPressure: ["moderate"],
      workValue: ["achievement", "autonomy"],
    },
  },

  // ---- Management & Strategy ----
  {
    id: "product-manager",
    title: "Product Manager",
    shortDescription: "Decide what features to build for a software product and coordinate the team.",
    typicalEducation: "Bachelor's degree",
    outlookNote: "High demand — the 'CEO' of a product",
    futureOutlook: "Strategic. AI aids the doing; PMs do the deciding.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["constant"],
      schedulePredictability: ["variable"],
      ruleDensity: ["moderate"],
      primaryLoadType: ["organizational", "analytical"],
      errorPressure: ["high"],
      workValue: ["achievement", "autonomy"],
    },
  },
  {
    id: "public-health-director",
    title: "Public Health Director",
    shortDescription: "Plan and oversee community health programs to prevent disease.",
    typicalEducation: "Master's degree in public health (MPH)",
    outlookNote: "Growing importance due to global health focus",
    futureOutlook: "Strategic. Complex system management.",
    profile: {
      energyRhythm: ["steady", "burst"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate"],
      schedulePredictability: ["variable"],
      ruleDensity: ["strict"],
      primaryLoadType: ["organizational", "analytical"],
      errorPressure: ["high"],
      workValue: ["altruism", "achievement"],
    },
  },
  {
    id: "supply-chain-manager",
    title: "Supply Chain Manager",
    shortDescription: "Oversee the entire flow of goods from factory to store.",
    typicalEducation: "Bachelor's degree",
    outlookNote: "Critical role — resilient supply chains are a top priority",
    futureOutlook: "Strategic. Managing complex global networks.",
    profile: {
      energyRhythm: ["mixed"],
      peopleDensity: ["small-group"],
      interactionDemand: ["moderate", "constant"],
      schedulePredictability: ["chaotic"],
      ruleDensity: ["strict"],
      primaryLoadType: ["organizational", "analytical"],
      errorPressure: ["high"],
      workValue: ["security", "achievement"],
    },
  },
] as const;

