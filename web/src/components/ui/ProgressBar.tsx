import { SECTION_LABELS, PROMPTS_PER_SECTION, TOTAL_PROMPTS } from "@/lib/constants";

export interface ProgressBarProps {
  currentIndex: number;
}

export function ProgressBar({ currentIndex }: ProgressBarProps) {
  const sectionIndex = Math.floor(currentIndex / PROMPTS_PER_SECTION);
  const stepInSection = (currentIndex % PROMPTS_PER_SECTION) + 1;
  const sectionLabel = SECTION_LABELS[sectionIndex] ?? "";
  const overallPercent = Math.round((currentIndex / TOTAL_PROMPTS) * 100);

  const ariaLabel = `${sectionLabel} section, question ${stepInSection} of ${PROMPTS_PER_SECTION}, overall ${overallPercent}% complete`;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-text dark:text-text-dark">
          {sectionLabel} ({stepInSection} of {PROMPTS_PER_SECTION})
        </span>
        <span className="text-text-muted dark:text-text-muted-dark">
          {overallPercent}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={overallPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
        className="relative h-2.5 w-full overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900"
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-[width] duration-300 ease-out dark:bg-primary-400"
          style={{ width: `${overallPercent}%` }}
        />
        {/* Section boundary dots */}
        {SECTION_LABELS.slice(1).map((_, i) => {
          const dotPosition = ((i + 1) / SECTION_LABELS.length) * 100;
          return (
            <div
              key={i}
              className="absolute top-0 h-full w-0.5 bg-surface dark:bg-surface-dark"
              style={{ left: `${dotPosition}%` }}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}
