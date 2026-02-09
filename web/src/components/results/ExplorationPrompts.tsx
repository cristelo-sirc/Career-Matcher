export function ExplorationPrompts() {
  return (
    <section aria-labelledby="explore-heading">
      <h2
        id="explore-heading"
        className="text-xl font-bold text-text dark:text-text-dark"
      >
        Explore Further
      </h2>
      <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
        These results reflect your preferences today. Preferences change — and
        that&apos;s a good thing.
      </p>
      <ul className="mt-3 space-y-2 text-sm text-text dark:text-text-dark">
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            &bull;
          </span>
          <span>
            Talk to a school counselor or mentor about any jobs that caught your
            eye.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            &bull;
          </span>
          <span>
            Look up one of your top matches on the Bureau of Labor Statistics
            Occupational Outlook Handbook to learn more.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            &bull;
          </span>
          <span>
            Try a job-shadow day, informational interview, or volunteer
            experience related to a match.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            &bull;
          </span>
          <span>
            Take an interest inventory (like the Holland RIASEC) to explore from
            a different angle — interests and work environment are both
            important.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            &bull;
          </span>
          <span>
            Come back in 6–12 months and retake this — your preferences evolve,
            and that&apos;s perfectly normal.
          </span>
        </li>
      </ul>
    </section>
  );
}
