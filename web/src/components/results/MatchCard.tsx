"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { FitBadge } from "./FitBadge";
import { FrictionList } from "./FrictionList";
import { JobMetadata } from "./JobMetadata";
import type { FormattedMatch } from "@core/results.js";

export interface MatchCardProps {
  match: FormattedMatch;
}

function MatchDetails({ match }: { match: FormattedMatch }) {
  return (
    <div className="space-y-4 pl-3">
      {match.fitReasons.length > 0 && (
        <div>
          <h4 className="mb-1 text-sm font-medium text-text dark:text-text-dark">
            Why this fits you:
          </h4>
          <ul className="space-y-1">
            {match.fitReasons.map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-muted dark:text-text-muted-dark"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-fit-strong dark:text-fit-strong-dark"
                >
                  +
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {match.frictionPoints.length > 0 && (
        <div>
          <h4 className="mb-1 text-sm font-medium text-text dark:text-text-dark">
            Possible friction:
          </h4>
          <FrictionList items={match.frictionPoints} />
        </div>
      )}

      <JobMetadata
        typicalEducation={match.typicalEducation}
        outlookNote={match.outlookNote}
      />
    </div>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="print-break-avoid space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-text dark:text-text-dark">
          #{match.rank} {match.title}
        </h3>
        <FitBadge fitBand={match.fitBand} />
      </div>

      <p className="text-sm text-text-muted dark:text-text-muted-dark">
        {match.description}
      </p>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="min-h-[44px] w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-primary-700 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-primary-300 dark:hover:bg-primary-950"
          aria-expanded={expanded}
          data-print-hide
        >
          {expanded ? "▾ Collapse details" : "▸ Why this fits you"}
        </button>

        {expanded && <MatchDetails match={match} />}
      </div>
    </Card>
  );
}
