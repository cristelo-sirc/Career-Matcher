"use client";

import { Suspense, useMemo, useCallback, useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PROMPTS, JOBS } from "@core/index.js";
import { processResponses, resolveProfile, createShuffledPrompts } from "@core/scoring.js";
import { matchJobs } from "@core/matcher.js";
import { formatResults, renderResultsAsText } from "@core/results.js";
import type { UserDimensionProfile } from "@core/types.js";
import type { FormattedResults } from "@core/results.js";
import { useQuizState } from "@/hooks/useQuizState";
import { Button } from "@/components/ui/Button";
import {
  ProfileSummary,
  MatchCard,
  EliminatedSection,
  ExplorationPrompts,
  SectionReplay,
  EmptyState,
} from "@/components/results";
import { TOTAL_PROMPTS } from "@/lib/constants";
import { encodeProfile, decodeProfile } from "@/lib/url-state";

/** Toast notification for copy actions */
function CopyToast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-primary-800 px-4 py-2 text-sm font-medium text-white shadow-lg dark:bg-primary-200 dark:text-primary-950"
    >
      {message}
    </div>
  );
}

/** Shared link banner for recipients */
function SharedBanner() {
  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-950">
      <p className="text-sm text-text dark:text-text-dark">
        You&apos;re viewing someone&apos;s Career-Matcher results.{" "}
        <Link
          href="/"
          className="font-medium text-primary-700 underline hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
        >
          Discover your own preferences &rarr;
        </Link>
      </p>
    </div>
  );
}

/** Start Over confirmation dialog with focus trap */
function StartOverDialog({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Focus the first button when dialog opens
    const firstButton = dialogRef.current?.querySelector("button");
    firstButton?.focus();

    // Trap focus inside dialog and handle Escape
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-labelledby="start-over-title"
      aria-modal="true"
      ref={dialogRef}
    >
      <div className="w-full max-w-sm rounded-xl bg-surface p-6 shadow-xl dark:bg-surface-raised-dark">
        <h2
          id="start-over-title"
          className="text-lg font-bold text-text dark:text-text-dark"
        >
          Start a new exploration?
        </h2>
        <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
          Your current results won&apos;t be saved unless you&apos;ve copied the
          link or saved a PDF.
        </p>
        <div className="mt-4 flex gap-3">
          <Button onClick={onConfirm}>Start Over</Button>
          <Button variant="secondary" onClick={onCancel}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main
          id="main-content"
          className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center px-4 py-8"
        >
          <p className="text-text-muted dark:text-text-muted-dark">
            Loading results...
          </p>
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, replaySection, reset } = useQuizState();
  const { responses, seed } = state;
  const profileRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showStartOver, setShowStartOver] = useState(false);

  // Check for shared profile in URL
  const sharedParam = searchParams.get("p");
  const sharedProfile = useMemo(
    () => (sharedParam ? decodeProfile(sharedParam) : null),
    [sharedParam],
  );

  // Resolve prompts in the same shuffled order as the quiz
  const shuffledPrompts = useMemo(
    () => createShuffledPrompts(PROMPTS, seed),
    [seed],
  );

  // Check if the quiz is complete
  const answeredCount = Object.keys(responses).length;
  const isComplete = answeredCount >= TOTAL_PROMPTS;

  // Process results from quiz responses OR shared profile
  const results = useMemo((): {
    profile: UserDimensionProfile;
    formatted: FormattedResults;
    isShared: boolean;
  } | null => {
    if (sharedProfile) {
      const matched = matchJobs(JOBS, sharedProfile);
      const formatted = formatResults(matched, sharedProfile, 8);
      return { profile: sharedProfile, formatted, isShared: true };
    }
    if (!isComplete) return null;
    const { scores } = processResponses(shuffledPrompts, responses);
    const profile = resolveProfile(scores);
    const matched = matchJobs(JOBS, profile);
    const formatted = formatResults(matched, profile, 8);
    return { profile, formatted, isShared: false };
  }, [sharedProfile, isComplete, shuffledPrompts, responses]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleStartOver = useCallback(() => {
    reset();
    setShowStartOver(false);
    router.push("/");
  }, [reset, router]);

  const handleReplaySection = useCallback(
    (sectionIndex: number) => {
      replaySection(sectionIndex);
      router.push("/quiz/");
    },
    [replaySection, router],
  );

  const handleCopyText = useCallback(async () => {
    if (!results) return;
    const text = renderResultsAsText(results.formatted);
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
    } catch {
      // Fallback: show in a prompt
      prompt("Copy this text:", text);
    }
  }, [results]);

  const handleCopyLink = useCallback(async () => {
    if (!results) return;
    const encoded = encodeProfile(results.profile);
    const url = `${window.location.origin}/results/?p=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      prompt("Copy this link:", url);
    }
  }, [results]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const scrollToProfile = useCallback(() => {
    profileRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Not enough answers and no shared profile — redirect to quiz
  if (!isComplete && !sharedProfile) {
    return (
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-8 text-center"
      >
        <h1 className="text-2xl font-bold text-text dark:text-text-dark">
          Not quite done yet
        </h1>
        <p className="mt-2 text-text-muted dark:text-text-muted-dark">
          You&apos;ve answered {answeredCount} of {TOTAL_PROMPTS} questions.
          Complete the quiz to see your results.
        </p>
        <div className="mt-4">
          <Button onClick={() => router.push("/quiz/")}>Continue Quiz</Button>
        </div>
      </main>
    );
  }

  if (!results) return null;

  const { profile, formatted, isShared } = results;
  const hasMatches = formatted.topMatches.length > 0;

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      {/* Print-only header */}
      <div className="print-header hidden">
        <h1 className="text-xl font-bold">Career-Matcher Results</h1>
        <p className="text-sm">Generated {new Date().toLocaleDateString()}</p>
      </div>

      <h1 className="text-2xl font-bold text-text dark:text-text-dark sm:text-3xl">
        Your Results
      </h1>

      <div className="mt-8 space-y-10">
        {/* Shared link banner */}
        {isShared && <SharedBanner />}

        {/* Profile Summary — shown first for context */}
        <div ref={profileRef}>
          <ProfileSummary profile={profile} />
        </div>

        {/* Matches or empty state */}
        {hasMatches ? (
          <section aria-labelledby="matches-heading">
            <h2
              id="matches-heading"
              className="text-xl font-bold text-text dark:text-text-dark"
            >
              Your Top Matches
            </h2>
            <div className="mt-4 space-y-4">
              {formatted.topMatches.map((match) => (
                <MatchCard key={match.title} match={match} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState
            onStartOver={handleStartOver}
            onViewProfile={scrollToProfile}
          />
        )}

        {/* Eliminated jobs */}
        <EliminatedSection eliminated={formatted.eliminated} />

        {/* Selective replay — only for own results, not shared */}
        {!isShared && (
          <SectionReplay onReplaySection={handleReplaySection} />
        )}

        {/* Exploration prompts */}
        <ExplorationPrompts />

        {/* Save / Export */}
        <section aria-labelledby="save-heading" className="no-print">
          <h2
            id="save-heading"
            className="text-xl font-bold text-text dark:text-text-dark"
          >
            Save Your Results
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleCopyLink}>
              Copy Share Link
            </Button>
            <Button variant="secondary" onClick={handleCopyText}>
              Copy as Text
            </Button>
            <Button variant="secondary" onClick={handlePrint}>
              Print / Save as PDF
            </Button>
            {!isShared && (
              <Button
                variant="ghost"
                onClick={() => setShowStartOver(true)}
              >
                Start Over
              </Button>
            )}
          </div>
        </section>

        {/* Scope disclaimer — inline footer note */}
        <p className="text-xs text-text-muted dark:text-text-muted-dark">
          This explores your work-environment preferences — not your abilities
          or aptitude. Use alongside conversations with counselors and mentors.
          These results reflect your preferences today — they may change as you
          gain experience.
        </p>
      </div>

      <CopyToast message={toast ?? ""} visible={toast !== null} />
      <StartOverDialog
        open={showStartOver}
        onConfirm={handleStartOver}
        onCancel={() => setShowStartOver(false)}
      />
    </main>
  );
}
