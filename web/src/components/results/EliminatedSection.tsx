"use client";

import { useState } from "react";
import { FitBadge } from "./FitBadge";
import { FrictionList } from "./FrictionList";
import type { FormattedMatch } from "@core/results.js";

export interface EliminatedSectionProps {
  eliminated: FormattedMatch[];
}

export function EliminatedSection({ eliminated }: EliminatedSectionProps) {
  const [expanded, setExpanded] = useState(false);

  if (eliminated.length === 0) return null;

  return (
    <section aria-labelledby="eliminated-heading">
      <h2
        id="eliminated-heading"
        className="text-xl font-bold text-text dark:text-text-dark"
      >
        Less Likely Fits
      </h2>
      <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
        Based on your current preferences.
      </p>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-primary-300 dark:hover:bg-primary-950"
        aria-expanded={expanded}
      >
        {expanded
          ? `▾ Hide ${eliminated.length} less likely fits`
          : `▸ Show ${eliminated.length} less likely fits`}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3">
          {eliminated.map((match) => (
            <div
              key={match.title}
              className="rounded-xl border border-primary-100 bg-surface p-4 dark:border-primary-900 dark:bg-surface-raised-dark"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-medium text-text dark:text-text-dark">
                  {match.title}
                </h3>
                <FitBadge fitBand={match.fitBand} />
              </div>
              {match.frictionPoints.length > 0 && (
                <div className="mt-2">
                  <FrictionList items={match.frictionPoints} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
