"use client";

import { useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PROMPTS } from "@core/index.js";
import { createShuffledPrompts } from "@core/scoring.js";
import { useQuizState } from "@/hooks/useQuizState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { PromptCard } from "@/components/prompts/PromptCard";
import { NextButton } from "@/components/prompts/NextButton";
import { EncouragementBanner } from "@/components/prompts/EncouragementBanner";
import { PROMPTS_PER_SECTION, TOTAL_PROMPTS } from "@/lib/constants";

export default function QuizPage() {
  const router = useRouter();
  const { state, selectOption, next, goBack, reset } = useQuizState();
  const { currentIndex, responses, seed } = state;

  const shuffledPrompts = useMemo(
    () => createShuffledPrompts(PROMPTS, seed),
    [seed],
  );

  const currentPrompt = shuffledPrompts[currentIndex];
  const selectedOption = currentPrompt
    ? responses[currentPrompt.id]
    : undefined;
  const hasSelection = selectedOption !== undefined;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === TOTAL_PROMPTS - 1;

  // Section tracking for encouragement banners
  const currentSection = Math.floor(currentIndex / PROMPTS_PER_SECTION);
  const isFirstInSection = currentIndex % PROMPTS_PER_SECTION === 0;

  const handleNext = useCallback(() => {
    if (isLast) {
      router.push("/results/");
    } else {
      next();
    }
  }, [isLast, next, router]);

  // Keyboard shortcut: Enter to advance when selection made
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && hasSelection) {
        e.preventDefault();
        handleNext();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasSelection, handleNext]);

  if (!currentPrompt) {
    return (
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-8 text-center"
      >
        <h1 className="text-2xl font-bold text-text dark:text-text-dark">
          Something went wrong
        </h1>
        <p className="mt-2 text-text-muted dark:text-text-muted-dark">
          We couldn&apos;t load the quiz. Try starting over.
        </p>
        <div className="mt-4">
          <Button onClick={reset}>Start Over</Button>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <h1 className="sr-only">Career-Matcher Quiz</h1>
      {/* Back button + Progress */}
      <div className="mb-6">
        <div className="mb-4 flex items-center">
          {!isFirst && (
            <button
              type="button"
              onClick={goBack}
              className="mr-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-muted hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-text-muted-dark dark:hover:bg-primary-950"
              aria-label={`Go back to question ${currentIndex}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <div className="flex-1">
            <ProgressBar currentIndex={currentIndex} />
          </div>
        </div>

        {/* Encouragement banner between sections */}
        {isFirstInSection && currentSection > 0 && (
          <EncouragementBanner completedSections={currentSection} />
        )}
      </div>

      {/* Prompt */}
      <div className="py-4">
        {currentIndex === 0 && !hasSelection && (
          <p className="mb-6 text-center text-sm text-text-muted dark:text-text-muted-dark">
            There are no right or wrong answers — just pick what sounds most
            like you.
          </p>
        )}

        <PromptCard
          prompt={currentPrompt}
          selectedOption={selectedOption}
          onSelectOption={(optionIndex) =>
            selectOption(currentPrompt.id, optionIndex)
          }
        />

        <NextButton
          visible={hasSelection}
          isLast={isLast}
          onNext={handleNext}
        />
      </div>
    </main>
  );
}
