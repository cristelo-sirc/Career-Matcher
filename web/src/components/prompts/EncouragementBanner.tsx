import { SECTION_TRANSITIONS } from "@/lib/constants";

interface EncouragementBannerProps {
  completedSections: number;
}

export function EncouragementBanner({
  completedSections,
}: EncouragementBannerProps) {
  const message = SECTION_TRANSITIONS[completedSections];
  if (!message) return null;

  return (
    <div className="mb-4 rounded-lg bg-primary-50 px-4 py-3 text-center text-sm font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300">
      {message}
    </div>
  );
}
