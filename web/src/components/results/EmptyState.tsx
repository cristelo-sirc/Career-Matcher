import { Button } from "@/components/ui/Button";

export interface EmptyStateProps {
  onStartOver: () => void;
  onViewProfile: () => void;
}

export function EmptyState({ onStartOver, onViewProfile }: EmptyStateProps) {
  return (
    <div className="space-y-4 rounded-xl border border-primary-100 bg-surface p-6 text-center dark:border-primary-900 dark:bg-surface-raised-dark">
      <h2 className="text-xl font-bold text-text dark:text-text-dark">
        No strong matches found
      </h2>
      <div className="space-y-3 text-sm text-text-muted dark:text-text-muted-dark">
        <p>
          Your combination of preferences is unusual — that&apos;s not a
          problem, it just means the jobs in our current database don&apos;t
          align well.
        </p>
        <p>This could mean:</p>
        <ul className="mx-auto max-w-sm space-y-1 text-left">
          <li className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-0.5 shrink-0">
              &bull;
            </span>
            <span>
              Your ideal role might be in a niche we haven&apos;t covered yet
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-0.5 shrink-0">
              &bull;
            </span>
            <span>
              Talking to a counselor could help surface options we can&apos;t
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-0.5 shrink-0">
              &bull;
            </span>
            <span>Your preferences might shift over time</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onStartOver}>Try Again</Button>
        <Button variant="secondary" onClick={onViewProfile}>
          View your profile
        </Button>
      </div>
    </div>
  );
}
