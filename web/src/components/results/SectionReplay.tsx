import { Button } from "@/components/ui/Button";
import { SECTION_LABELS } from "@/lib/constants";

export interface SectionReplayProps {
  onReplaySection: (sectionIndex: number) => void;
}

export function SectionReplay({ onReplaySection }: SectionReplayProps) {
  return (
    <section aria-labelledby="replay-heading">
      <h2
        id="replay-heading"
        className="text-xl font-bold text-text dark:text-text-dark"
      >
        Something Feel Off?
      </h2>
      <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
        Sometimes the wording doesn&apos;t click the first time. You can redo
        any section without starting over.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SECTION_LABELS.map((label, i) => (
          <Button
            key={label}
            variant="secondary"
            size="sm"
            onClick={() => onReplaySection(i)}
          >
            Redo: {label}
          </Button>
        ))}
      </div>
    </section>
  );
}
