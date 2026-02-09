export type FitBandVariant = "strong" | "possible" | "stretch" | "unlikely";

export interface BadgeProps {
  variant: FitBandVariant;
  className?: string;
}

const config: Record<
  FitBandVariant,
  { icon: string; label: string; light: string; dark: string }
> = {
  strong: {
    icon: "\u2713",
    label: "Strong fit",
    light: "bg-fit-strong-bg text-fit-strong",
    dark: "dark:bg-fit-strong-bg-dark dark:text-fit-strong-dark",
  },
  possible: {
    icon: "~",
    label: "Possible fit",
    light: "bg-fit-possible-bg text-fit-possible",
    dark: "dark:bg-fit-possible-bg-dark dark:text-fit-possible-dark",
  },
  stretch: {
    icon: "\u2197",
    label: "Stretch",
    light: "bg-fit-stretch-bg text-fit-stretch",
    dark: "dark:bg-fit-stretch-bg-dark dark:text-fit-stretch-dark",
  },
  unlikely: {
    icon: "\u25CB",
    label: "Unlikely fit",
    light: "bg-fit-unlikely-bg text-fit-unlikely",
    dark: "dark:bg-fit-unlikely-bg-dark dark:text-fit-unlikely-dark",
  },
};

export function Badge({ variant, className = "" }: BadgeProps) {
  const c = config[variant];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${c.light} ${c.dark} ${className}`.trim()}
    >
      <span aria-hidden="true">{c.icon}</span>
      {c.label}
    </span>
  );
}
