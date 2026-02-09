"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import { StorageAdapter } from "@/lib/storage";

const STORAGE_KEY = "cm-quiz-state";

export type QuizState = {
  responses: Record<string, number>;
  currentIndex: number;
  seed: number;
  startedAt: number;
};

type QuizAction =
  | { type: "SELECT_OPTION"; promptId: string; optionIndex: number }
  | { type: "NEXT" }
  | { type: "GO_BACK" }
  | { type: "GO_TO"; index: number }
  | { type: "REPLAY_SECTION"; sectionIndex: number }
  | { type: "RESTORE"; state: QuizState }
  | { type: "RESET" };

function createInitialState(): QuizState {
  return {
    responses: {},
    currentIndex: 0,
    seed: Math.floor(Math.random() * 2147483647),
    startedAt: Date.now(),
  };
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_OPTION":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.promptId]: action.optionIndex,
        },
      };
    case "NEXT":
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, 31),
      };
    case "GO_BACK":
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };
    case "GO_TO":
      return {
        ...state,
        currentIndex: Math.max(0, Math.min(action.index, 31)),
      };
    case "REPLAY_SECTION":
      return {
        ...state,
        currentIndex: action.sectionIndex * 4,
      };
    case "RESTORE":
      return action.state;
    case "RESET":
      return createInitialState();
    default:
      return state;
  }
}

export function useQuizState() {
  const storageRef = useRef<StorageAdapter | null>(null);
  const [state, dispatch] = useReducer(quizReducer, undefined, createInitialState);
  const restoredRef = useRef(false);

  // Initialize storage and try to restore state
  useEffect(() => {
    const storage = new StorageAdapter();
    storageRef.current = storage;

    const saved = storage.get(STORAGE_KEY);
    if (saved && !restoredRef.current) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed.responses === "object" &&
          typeof parsed.currentIndex === "number" &&
          typeof parsed.seed === "number"
        ) {
          dispatch({ type: "RESTORE", state: parsed });
        }
      } catch {
        // Corrupted storage — discard silently
        storage.remove(STORAGE_KEY);
      }
    }
    restoredRef.current = true;
  }, []);

  // Persist state changes
  useEffect(() => {
    if (!restoredRef.current) return;
    storageRef.current?.set(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectOption = useCallback(
    (promptId: string, optionIndex: number) => {
      dispatch({ type: "SELECT_OPTION", promptId, optionIndex });
    },
    [],
  );

  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const goBack = useCallback(() => dispatch({ type: "GO_BACK" }), []);
  const goTo = useCallback(
    (index: number) => dispatch({ type: "GO_TO", index }),
    [],
  );
  const replaySection = useCallback(
    (sectionIndex: number) =>
      dispatch({ type: "REPLAY_SECTION", sectionIndex }),
    [],
  );
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    storageRef.current?.remove(STORAGE_KEY);
  }, []);

  return {
    state,
    selectOption,
    next,
    goBack,
    goTo,
    replaySection,
    reset,
    isMemoryOnly: storageRef.current?.isMemoryOnly ?? false,
  };
}
