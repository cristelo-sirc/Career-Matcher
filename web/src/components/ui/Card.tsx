import { type HTMLAttributes, forwardRef } from "react";

type CardVariant = "default" | "interactive" | "selected";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-surface shadow-sm dark:bg-surface-raised-dark",
  interactive:
    "bg-surface shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all dark:bg-surface-raised-dark dark:hover:bg-surface-dark",
  selected:
    "bg-primary-50 shadow-sm border-2 border-primary-500 dark:bg-primary-950 dark:border-primary-400",
};

const baseClasses =
  "rounded-xl border border-primary-100 p-4 sm:p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-primary-900";

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "default", className = "", children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
});
