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

  // ---- Error Pressure ----
  {
    id: "ep-1",
    scenario: "You make a mistake at work. Which reaction fits you best?",
    options: [
      {
        text: "No big deal — I fix it and move on",
        dimension: "errorPressure",
        nudgeToward: "low",
        weight: 1,
      },
      {
        text: "I feel bad but I can handle it if it's recoverable",
        dimension: "errorPressure",
        nudgeToward: "moderate",
        weight: 1,
      },
      {
        text: "I'd rather get it right the first time — mistakes stress me out",
        dimension: "errorPressure",
        nudgeToward: "high",
        weight: 1,
      },
    ],
  },
  {
    id: "ep-2",
    scenario: "Would you rather work somewhere mistakes are easy to fix, or somewhere getting it exactly right matters a lot?",
    options: [
      {
        text: "Easy to fix — I like low-pressure work",
        dimension: "errorPressure",
        nudgeToward: "low",
        weight: 1,
      },
      {
        text: "Somewhere in between — mistakes matter but aren't the end of the world",
        dimension: "errorPressure",
        nudgeToward: "moderate",
        weight: 0.8,
      },
      {
        text: "Exactly right — I take pride in precision",
        dimension: "errorPressure",
        nudgeToward: "high",
        weight: 1,
      },
    ],
  },

  // ---- Learning Mode (secondary) ----
  {
    id: "lm-1",
    scenario: "You need to learn how to use a new tool. What's your first move?",
    options: [
      {
        text: "Grab it and start experimenting",
        dimension: "learningMode",
        nudgeToward: "hands-on",
        weight: 1,
      },
      {
        text: "Watch a video or ask someone to walk me through it",
        dimension: "learningMode",
        nudgeToward: "verbal",
        weight: 1,
      },
      {
        text: "Read the manual or look up how it works first",
        dimension: "learningMode",
        nudgeToward: "abstract",
        weight: 1,
      },
    ],
  },
  {
    id: "lm-2",
    scenario: "In class, which style helps you understand something new best?",
    options: [
      {
        text: "Labs, demos, or hands-on activities",
        dimension: "learningMode",
        nudgeToward: "hands-on",
        weight: 0.8,
      },
      {
        text: "Group discussion or a teacher explaining it well",
        dimension: "learningMode",
        nudgeToward: "verbal",
        weight: 0.8,
      },
      {
        text: "Diagrams, charts, or reading it myself",
        dimension: "learningMode",
        nudgeToward: "abstract",
        weight: 0.8,
      },
    ],
  },
] as const;
