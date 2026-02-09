interface OptionCardProps {
  text: string;
  selected: boolean;
  onSelect: () => void;
}

export function OptionCard({
  text,
  selected,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full rounded-xl border-2 px-4 py-3 text-left text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:px-5 sm:py-4 ${
        selected
          ? "border-primary-500 bg-primary-50 text-text dark:border-primary-400 dark:bg-primary-950 dark:text-text-dark"
          : "border-primary-100 bg-surface text-text hover:border-primary-300 hover:bg-surface-raised dark:border-primary-800 dark:bg-surface-dark dark:text-text-dark dark:hover:border-primary-600 dark:hover:bg-surface-raised-dark"
      }`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs ${
            selected
              ? "border-primary-500 bg-primary-500 text-white dark:border-primary-400 dark:bg-primary-400 dark:text-primary-950"
              : "border-primary-200 dark:border-primary-700"
          }`}
          aria-hidden="true"
        >
          {selected && "\u2713"}
        </span>
        <span>{text}</span>
      </span>
    </button>
  );
}
