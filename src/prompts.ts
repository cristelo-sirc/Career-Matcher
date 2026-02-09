/**
 * Situational prompts for Phase 1 measurement.
 *
 * Design rules:
 * - No Likert scales or self-labels.
 * - Each prompt presents a concrete scenario and asks the user to pick
 *   the option that feels most natural.
 * - Each option nudges one or more dimension levels.
 * - Nudge weights allow some options to be stronger signals than others.
 * - Prompts are written in plain language a teenager can understand.
 */

import type { SituationalPrompt } from "./types.js";

export const PROMPTS: readonly SituationalPrompt[] = [
  // ---- Energy Rhythm ----
  {
    id: "er-1",
    scenario: "You're assigned a big project. Which way of working sounds more like you?",
    options: [
      {
        text: "Work on it a little each day until it's done",
        dimension: "energyRhythm",
        nudgeToward: "steady",
        weight: 1,
      },
      {
        text: "Wait until you feel locked in, then power through a big chunk at once",
        dimension: "energyRhythm",
        nudgeToward: "burst",
        weight: 1,
      },
      {
        text: "Depends on the day — sometimes I'm steady, sometimes I sprint",
        dimension: "energyRhythm",
        nudgeToward: "mixed",
        weight: 0.8,
      },
    ],
  },
  {
    id: "er-2",
    scenario: "It's a normal school or work day. When do you feel most productive?",
    options: [
      {
        text: "I'm pretty even all day — I just keep going",
        dimension: "energyRhythm",
        nudgeToward: "steady",
        weight: 0.8,
      },
      {
        text: "I have a burst of focus and then I need a break before I can go again",
        dimension: "energyRhythm",
        nudgeToward: "burst",
        weight: 1,
      },
      {
        text: "It really changes day to day",
        dimension: "energyRhythm",
        nudgeToward: "mixed",
        weight: 0.6,
      },
    ],
  },

  {
    id: "er-3",
    scenario: "After a long, busy stretch, you finally get a slow day. How do you feel?",
    options: [
      {
        text: "Relieved — slow days are when I recharge before the next push",
        dimension: "energyRhythm",
        nudgeToward: "burst",
        weight: 1,
      },
      {
        text: "A little bored — I prefer keeping a consistent rhythm",
        dimension: "energyRhythm",
        nudgeToward: "steady",
        weight: 1,
      },
      {
        text: "Depends — sometimes I welcome it, sometimes I don't",
        dimension: "energyRhythm",
        nudgeToward: "mixed",
        weight: 0.7,
      },
    ],
  },
  {
    id: "er-4",
    scenario: "You're training for something important (a sport, a skill, a test). How do you prepare?",
    options: [
      {
        text: "Some days I go hard, other days I barely touch it — no pattern",
        dimension: "energyRhythm",
        nudgeToward: "mixed",
        weight: 0.8,
      },
      {
        text: "Practice a set amount every single day",
        dimension: "energyRhythm",
        nudgeToward: "steady",
        weight: 1,
      },
      {
        text: "Cram in intense sessions with rest days in between",
        dimension: "energyRhythm",
        nudgeToward: "burst",
        weight: 1,
      },
    ],
  },

  // ---- People Density ----
  {
    id: "pd-1",
    scenario: "You get to pick where you work for the day. Which sounds best?",
    options: [
      {
        text: "A quiet room by myself",
        dimension: "peopleDensity",
        nudgeToward: "solo",
        weight: 1,
      },
      {
        text: "A table with a few other people nearby",
        dimension: "peopleDensity",
        nudgeToward: "small-group",
        weight: 1,
      },
      {
        text: "A busy coffee shop or open workspace with lots of energy",
        dimension: "peopleDensity",
        nudgeToward: "crowd",
        weight: 1,
      },
    ],
  },
  {
    id: "pd-2",
    scenario: "You're trying to focus on something tricky. Other people around you are…",
    options: [
      {
        text: "Distracting — I need quiet and space",
        dimension: "peopleDensity",
        nudgeToward: "solo",
        weight: 1,
      },
      {
        text: "Fine as long as it's just a few people",
        dimension: "peopleDensity",
        nudgeToward: "small-group",
        weight: 0.8,
      },
      {
        text: "Actually helpful — I like background buzz",
        dimension: "peopleDensity",
        nudgeToward: "crowd",
        weight: 1,
      },
    ],
  },

  {
    id: "pd-3",
    scenario: "You're picking a lunch spot on a work day. Where do you go?",
    options: [
      {
        text: "A packed food court — I like the energy",
        dimension: "peopleDensity",
        nudgeToward: "crowd",
        weight: 1,
      },
      {
        text: "A small table with one or two coworkers",
        dimension: "peopleDensity",
        nudgeToward: "small-group",
        weight: 1,
      },
      {
        text: "Somewhere I can sit alone and decompress",
        dimension: "peopleDensity",
        nudgeToward: "solo",
        weight: 1,
      },
    ],
  },
  {
    id: "pd-4",
    scenario: "Your ideal workspace has…",
    options: [
      {
        text: "A few familiar faces nearby — not too empty, not too packed",
        dimension: "peopleDensity",
        nudgeToward: "small-group",
        weight: 0.8,
      },
      {
        text: "Constant foot traffic and activity all around me",
        dimension: "peopleDensity",
        nudgeToward: "crowd",
        weight: 1,
      },
      {
        text: "A closed door and total silence",
        dimension: "peopleDensity",
        nudgeToward: "solo",
        weight: 1,
      },
    ],
  },

  // ---- Interaction Demand ----
  {
    id: "id-1",
    scenario: "A new person joins your class or team. What feels natural?",
    options: [
      {
        text: "I wait for them to come to me, or I just nod and keep going",
        dimension: "interactionDemand",
        nudgeToward: "minimal",
        weight: 1,
      },
      {
        text: "I'd say hi and check in with them now and then",
        dimension: "interactionDemand",
        nudgeToward: "moderate",
        weight: 1,
      },
      {
        text: "I'd probably chat them up right away and show them around",
        dimension: "interactionDemand",
        nudgeToward: "constant",
        weight: 1,
      },
    ],
  },
  {
    id: "id-2",
    scenario: "Imagine a job where you talk to people all day — customers, coworkers, everyone. How does that sound?",
    options: [
      {
        text: "Exhausting — I'd rather work on my own",
        dimension: "interactionDemand",
        nudgeToward: "minimal",
        weight: 1,
      },
      {
        text: "I'd be okay with some, but not nonstop",
        dimension: "interactionDemand",
        nudgeToward: "moderate",
        weight: 1,
      },
      {
        text: "That sounds great — I like being around people",
        dimension: "interactionDemand",
        nudgeToward: "constant",
        weight: 1,
      },
    ],
  },

  {
    id: "id-3",
    scenario: "At the end of a day at work, what leaves you most drained?",
    options: [
      {
        text: "Nonstop conversations — I need alone time to recover",
        dimension: "interactionDemand",
        nudgeToward: "minimal",
        weight: 0.8,
      },
      {
        text: "Too much isolation — I wish I'd talked to more people",
        dimension: "interactionDemand",
        nudgeToward: "constant",
        weight: 0.8,
      },
      {
        text: "Neither — a normal mix of talking and quiet time is fine",
        dimension: "interactionDemand",
        nudgeToward: "moderate",
        weight: 0.7,
      },
    ],
  },
  {
    id: "id-4",
    scenario: "You're working on a group project. What role do you naturally take?",
    options: [
      {
        text: "The connector — I keep everyone talking and aligned",
        dimension: "interactionDemand",
        nudgeToward: "constant",
        weight: 1,
      },
      {
        text: "The solo contributor — I take my part and work on it alone",
        dimension: "interactionDemand",
        nudgeToward: "minimal",
        weight: 1,
      },
      {
        text: "Somewhere in between — I check in but also need heads-down time",
        dimension: "interactionDemand",
        nudgeToward: "moderate",
        weight: 0.8,
      },
    ],
  },

  // ---- Schedule Predictability ----
  {
    id: "sp-1",
    scenario: "You're about to start a new job. Which schedule sounds best?",
    options: [
      {
        text: "Same hours, same tasks, every day — I know exactly what to expect",
        dimension: "schedulePredictability",
        nudgeToward: "predictable",
        weight: 1,
      },
      {
        text: "A general routine, but things come up and plans shift",
        dimension: "schedulePredictability",
        nudgeToward: "variable",
        weight: 1,
      },
      {
        text: "Every day is different — you never know what's coming",
        dimension: "schedulePredictability",
        nudgeToward: "chaotic",
        weight: 1,
      },
    ],
  },
  {
    id: "sp-2",
    scenario: "Your plans for the day get completely changed at the last minute. How do you feel?",
    options: [
      {
        text: "Stressed — I like knowing what's ahead",
        dimension: "schedulePredictability",
        nudgeToward: "predictable",
        weight: 1,
      },
      {
        text: "A little annoyed, but I can roll with it",
        dimension: "schedulePredictability",
        nudgeToward: "variable",
        weight: 0.8,
      },
      {
        text: "Excited — change keeps things interesting",
        dimension: "schedulePredictability",
        nudgeToward: "chaotic",
        weight: 1,
      },
    ],
  },

  {
    id: "sp-3",
    scenario: "You're offered a side gig. Which schedule sounds most appealing?",
    options: [
      {
        text: "Totally unpredictable — you're on call and it could be any time",
        dimension: "schedulePredictability",
        nudgeToward: "chaotic",
        weight: 1,
      },
      {
        text: "Same shift every week, no surprises",
        dimension: "schedulePredictability",
        nudgeToward: "predictable",
        weight: 1,
      },
      {
        text: "Mostly regular, but occasionally you get called in for something urgent",
        dimension: "schedulePredictability",
        nudgeToward: "variable",
        weight: 0.8,
      },
    ],
  },
  {
    id: "sp-4",
    scenario: "On vacation, do you prefer to…",
    options: [
      {
        text: "Have a rough plan but leave room for spontaneous adventures",
        dimension: "schedulePredictability",
        nudgeToward: "variable",
        weight: 0.8,
      },
      {
        text: "Wing it completely — no itinerary, just go",
        dimension: "schedulePredictability",
        nudgeToward: "chaotic",
        weight: 1,
      },
      {
        text: "Plan every day so I don't waste time figuring things out",
        dimension: "schedulePredictability",
        nudgeToward: "predictable",
        weight: 1,
      },
    ],
  },

  // ---- Rule Density ----
  {
    id: "rd-1",
    scenario: "You're learning a new task. Which approach works better for you?",
    options: [
      {
        text: "Just let me figure it out — I'll ask if I get stuck",
        dimension: "ruleDensity",
        nudgeToward: "loose",
        weight: 1,
      },
      {
        text: "Give me some guidelines, but leave room for my own approach",
        dimension: "ruleDensity",
        nudgeToward: "moderate",
        weight: 1,
      },
      {
        text: "Give me step-by-step instructions so I know I'm doing it right",
        dimension: "ruleDensity",
        nudgeToward: "strict",
        weight: 1,
      },
    ],
  },
  {
    id: "rd-2",
    scenario: "Imagine a workplace with lots of checklists, procedures, and rules for everything. How does that feel?",
    options: [
      {
        text: "Suffocating — I need freedom to do things my way",
        dimension: "ruleDensity",
        nudgeToward: "loose",
        weight: 1,
      },
      {
        text: "It's fine for the important stuff, but not everything",
        dimension: "ruleDensity",
        nudgeToward: "moderate",
        weight: 0.8,
      },
      {
        text: "Actually reassuring — I like knowing the right way to do things",
        dimension: "ruleDensity",
        nudgeToward: "strict",
        weight: 1,
      },
    ],
  },

  {
    id: "rd-3",
    scenario: "You just started a new hobby. How do you want to learn it?",
    options: [
      {
        text: "Follow a detailed course with clear steps and milestones",
        dimension: "ruleDensity",
        nudgeToward: "strict",
        weight: 1,
      },
      {
        text: "Just dive in and experiment — rules slow me down",
        dimension: "ruleDensity",
        nudgeToward: "loose",
        weight: 1,
      },
      {
        text: "Get the basics from someone, then explore on my own",
        dimension: "ruleDensity",
        nudgeToward: "moderate",
        weight: 0.8,
      },
    ],
  },
  {
    id: "rd-4",
    scenario: "Your team has no official process for handling requests — everyone does it differently. How do you feel?",
    options: [
      {
        text: "Fine — flexibility means I can do what works for me",
        dimension: "ruleDensity",
        nudgeToward: "loose",
        weight: 0.8,
      },
      {
        text: "Annoyed — someone should write a standard procedure",
        dimension: "ruleDensity",
        nudgeToward: "strict",
        weight: 1,
      },
      {
        text: "A little bothered, but I can live with loose guidelines",
        dimension: "ruleDensity",
        nudgeToward: "moderate",
        weight: 0.7,
      },
    ],
  },

  // ---- Primary Load Type ----
  {
    id: "plt-1",
    scenario: "You have a free afternoon to work on anything you want. What do you reach for?",
    options: [
      {
        text: "Something I can build, fix, or do with my hands",
        dimension: "primaryLoadType",
        nudgeToward: "physical",
        weight: 1,
      },
      {
        text: "A puzzle, problem, or something I need to figure out",
        dimension: "primaryLoadType",
        nudgeToward: "analytical",
        weight: 1,
      },
      {
        text: "Something where I get to design, draw, or make something new",
        dimension: "primaryLoadType",
        nudgeToward: "creative",
        weight: 1,
      },
      {
        text: "Planning or organizing something — making a system that works",
        dimension: "primaryLoadType",
        nudgeToward: "organizational",
        weight: 1,
      },
    ],
  },
  {
    id: "plt-2",
    scenario: "Think about a school project you actually enjoyed. What made it good?",
    options: [
      {
        text: "I got to move around or use my hands",
        dimension: "primaryLoadType",
        nudgeToward: "physical",
        weight: 0.8,
      },
      {
        text: "I had to solve a hard problem or analyze something",
        dimension: "primaryLoadType",
        nudgeToward: "analytical",
        weight: 0.8,
      },
      {
        text: "I got to be creative and come up with my own ideas",
        dimension: "primaryLoadType",
        nudgeToward: "creative",
        weight: 0.8,
      },
      {
        text: "I got to plan things out and keep everything on track",
        dimension: "primaryLoadType",
        nudgeToward: "organizational",
        weight: 0.8,
      },
    ],
  },

  {
    id: "plt-3",
    scenario: "A friend asks for help with something. Which request gets you most excited?",
    options: [
      {
        text: "Help me organize my move — I need a plan and a timeline",
        dimension: "primaryLoadType",
        nudgeToward: "organizational",
        weight: 0.8,
      },
      {
        text: "Help me figure out why my code isn't working",
        dimension: "primaryLoadType",
        nudgeToward: "analytical",
        weight: 0.8,
      },
      {
        text: "Help me build a shelf for my room",
        dimension: "primaryLoadType",
        nudgeToward: "physical",
        weight: 0.8,
      },
      {
        text: "Help me design a poster for my band",
        dimension: "primaryLoadType",
        nudgeToward: "creative",
        weight: 0.8,
      },
    ],
  },
  {
    id: "plt-4",
    scenario: "You're daydreaming about a perfect work day. What are you doing?",
    options: [
      {
        text: "Designing or making something that didn't exist before",
        dimension: "primaryLoadType",
        nudgeToward: "creative",
        weight: 1,
      },
      {
        text: "Working with my hands — fixing, building, or assembling",
        dimension: "primaryLoadType",
        nudgeToward: "physical",
        weight: 1,
      },
      {
        text: "Coordinating a project and keeping everyone on schedule",
        dimension: "primaryLoadType",
        nudgeToward: "organizational",
        weight: 1,
      },
      {
        text: "Digging into a tough problem and finding the answer",
        dimension: "primaryLoadType",
        nudgeToward: "analytical",
        weight: 1,
      },
    ],
  },

  // ---- Error Pressure ----
  // Rewritten to measure tolerance for high-stakes environments, not emotional
  // reaction to mistakes. Frames as preference between environments.
  {
    id: "ep-1",
    scenario: "Imagine two jobs. One is low-stakes — if you mess up, it's easy to fix. The other is high-stakes — mistakes are costly but the work is more respected. Which appeals to you more?",
    options: [
      {
        text: "The low-stakes job — I'd rather not have that pressure",
        dimension: "errorPressure",
        nudgeToward: "low",
        weight: 1,
      },
      {
        text: "Something in between — some stakes are fine, but not life-or-death",
        dimension: "errorPressure",
        nudgeToward: "moderate",
        weight: 0.8,
      },
      {
        text: "The high-stakes job — I like that the work really matters",
        dimension: "errorPressure",
        nudgeToward: "high",
        weight: 1,
      },
    ],
  },
  {
    id: "ep-2",
    scenario: "You're choosing between two projects. One has no real consequences if it goes wrong. The other matters a lot and people are counting on you. Which do you pick?",
    options: [
      {
        text: "The one with no real consequences — less pressure, more fun",
        dimension: "errorPressure",
        nudgeToward: "low",
        weight: 1,
      },
      {
        text: "Either is fine — I can handle some pressure but don't need it",
        dimension: "errorPressure",
        nudgeToward: "moderate",
        weight: 0.8,
      },
      {
        text: "The one that matters — I want to do work people depend on",
        dimension: "errorPressure",
        nudgeToward: "high",
        weight: 1,
      },
    ],
  },

  {
    id: "ep-3",
    scenario: "A friend describes their job: 'If I mess up, someone could get hurt.' How does that sound to you?",
    options: [
      {
        text: "Honestly, that kind of responsibility appeals to me",
        dimension: "errorPressure",
        nudgeToward: "high",
        weight: 1,
      },
      {
        text: "I'd accept some responsibility, but not that level",
        dimension: "errorPressure",
        nudgeToward: "moderate",
        weight: 0.8,
      },
      {
        text: "No thanks — I'd rather do work where the stakes are lower",
        dimension: "errorPressure",
        nudgeToward: "low",
        weight: 1,
      },
    ],
  },
  {
    id: "ep-4",
    scenario: "You're deciding between two summer jobs. One is relaxed — nobody checks your work closely. The other has quality inspections and your name goes on everything you do. Which one?",
    options: [
      {
        text: "The one where my name is on it — I want my work to count",
        dimension: "errorPressure",
        nudgeToward: "high",
        weight: 1,
      },
      {
        text: "The relaxed one — I'd rather not be under a microscope",
        dimension: "errorPressure",
        nudgeToward: "low",
        weight: 1,
      },
      {
        text: "Either way — I do good work regardless of who's watching",
        dimension: "errorPressure",
        nudgeToward: "moderate",
        weight: 0.7,
      },
    ],
  },

  // ---- Work Value (secondary) ----
  {
    id: "wv-1",
    scenario: "You get to pick one reward for a job well done. Which sounds best?",
    options: [
      {
        text: "A bonus or award that everyone sees",
        dimension: "workValue",
        nudgeToward: "achievement",
        weight: 1,
      },
      {
        text: "A more flexible schedule — work when and how you want",
        dimension: "workValue",
        nudgeToward: "autonomy",
        weight: 1,
      },
      {
        text: "A heartfelt thank-you from someone you really helped",
        dimension: "workValue",
        nudgeToward: "altruism",
        weight: 1,
      },
      {
        text: "A guaranteed contract renewal — you know you're set",
        dimension: "workValue",
        nudgeToward: "security",
        weight: 1,
      },
    ],
  },
  {
    id: "wv-2",
    scenario: "Two jobs pay the same. Which one do you pick?",
    options: [
      {
        text: "The one where you're your own boss and set your own priorities",
        dimension: "workValue",
        nudgeToward: "autonomy",
        weight: 1,
      },
      {
        text: "The one that's rock-solid stable — it'll be there for decades",
        dimension: "workValue",
        nudgeToward: "security",
        weight: 1,
      },
      {
        text: "The one where you directly improve people's lives every day",
        dimension: "workValue",
        nudgeToward: "altruism",
        weight: 1,
      },
      {
        text: "The one where top performers get promoted fast and recognized publicly",
        dimension: "workValue",
        nudgeToward: "achievement",
        weight: 1,
      },
    ],
  },
  {
    id: "wv-3",
    scenario: "You're looking back on a great year at work. What made it great?",
    options: [
      {
        text: "I helped people through tough situations — they told me it mattered",
        dimension: "workValue",
        nudgeToward: "altruism",
        weight: 1,
      },
      {
        text: "I hit every target and got promoted ahead of my peers",
        dimension: "workValue",
        nudgeToward: "achievement",
        weight: 1,
      },
      {
        text: "I had total control over my projects and schedule",
        dimension: "workValue",
        nudgeToward: "autonomy",
        weight: 1,
      },
      {
        text: "I felt safe — steady paycheck, good benefits, no layoff scares",
        dimension: "workValue",
        nudgeToward: "security",
        weight: 1,
      },
    ],
  },
  {
    id: "wv-4",
    scenario: "If you could change one thing about a future job, what would it be?",
    options: [
      {
        text: "More job security — I want to know it'll last",
        dimension: "workValue",
        nudgeToward: "security",
        weight: 0.8,
      },
      {
        text: "More chances to help others directly",
        dimension: "workValue",
        nudgeToward: "altruism",
        weight: 0.8,
      },
      {
        text: "More freedom to make my own decisions",
        dimension: "workValue",
        nudgeToward: "autonomy",
        weight: 0.8,
      },
      {
        text: "More recognition for great work",
        dimension: "workValue",
        nudgeToward: "achievement",
        weight: 0.8,
      },
    ],
  },
] as const;
