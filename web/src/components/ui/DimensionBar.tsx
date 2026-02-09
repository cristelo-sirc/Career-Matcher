export interface DimensionBarProps {
  label: string;
  levels: readonly { value: string; label: string; description: string }[];
  selectedValue: string;
  ordinal: boolean;
  description?: string;
}

export function DimensionBar({
  label,
  levels,
  selectedValue,
  ordinal,
  description,
}: DimensionBarProps) {
  const selectedLevel = levels.find((l) => l.value === selectedValue);
  const srText = `${label}: ${selectedLevel?.label ?? selectedValue}`;

  if (ordinal) {
    return (
      <div className="space-y-2" role="img" aria-label={srText}>
        <div className="text-sm font-semibold text-text dark:text-text-dark">
          {label}
        </div>
        <div className="flex overflow-hidden rounded-lg">
          {levels.map((level) => {
            const isSelected = level.value === selectedValue;
            return (
              <div
                key={level.value}
                className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-primary-700 text-white dark:bg-primary-400 dark:text-primary-950"
                    : "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                }`}
              >
                {level.label}
              </div>
            );
          })}
        </div>
        {selectedLevel && (
          <p className="text-xs text-text-muted dark:text-text-muted-dark">
            Your preference: {selectedLevel.label}
            {description ? ` \u2014 ${description}` : ` \u2014 ${selectedLevel.description}`}
          </p>
        )}
      </div>
    );
  }

  // Categorical: chips/cards
  return (
    <div className="space-y-2" role="img" aria-label={srText}>
      <div className="text-sm font-semibold text-text dark:text-text-dark">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {levels.map((level) => {
          const isSelected = level.value === selectedValue;
          return (
            <div
              key={level.value}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                isSelected
                  ? "bg-primary-700 text-white dark:bg-primary-400 dark:text-primary-950"
                  : "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
              }`}
            >
              {level.label}
            </div>
          );
        })}
      </div>
      {selectedLevel && (
        <p className="text-xs text-text-muted dark:text-text-muted-dark">
          Your preference: {selectedLevel.label}
          {description ? ` \u2014 ${description}` : ` \u2014 ${selectedLevel.description}`}
        </p>
      )}
    </div>
  );
}
