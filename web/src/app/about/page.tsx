import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Methodology — Career-Matcher",
  description:
    "Learn about Career-Matcher's methodology, privacy practices, and limitations.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <h1 className="text-3xl font-bold text-text dark:text-text-dark">
        About &amp; Methodology
      </h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-text dark:text-text-dark">
          About This Tool
        </h2>
        <p className="mt-3 leading-relaxed text-text-muted dark:text-text-muted-dark">
          Career-Matcher helps teens and young adults explore which work
          environments match their preferences. It is not an aptitude test,
          career guidance tool, or a predictor of success. It is one input
          alongside conversations with counselors, interest inventories, job
          shadows, and other exploration.
        </p>
        <p className="mt-3 leading-relaxed text-text-muted dark:text-text-muted-dark">
          The tool measures 8 dimensions of work-environment preference through
          32 situational prompts (4 per dimension), then matches your preference
          profile against 54 real job profiles informed by O*NET occupational data.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-text dark:text-text-dark">
          Methodology
        </h2>
        <p className="mt-3 leading-relaxed text-text-muted dark:text-text-muted-dark">
          This tool is grounded in the{" "}
          <strong>Theory of Work Adjustment</strong> (Dawis &amp; Lofquist,
          1984), which focuses on person-environment correspondence across work
          conditions. The idea is simple: people are more satisfied and
          successful in work environments that match their preferences.
        </p>
        <p className="mt-3 leading-relaxed text-text-muted dark:text-text-muted-dark">
          The <strong>primaryLoadType</strong> dimension uses Holland&apos;s
          RIASEC framework to capture interest-domain preferences (physical,
          analytical, creative, organizational).
        </p>

        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">
          The 8 Dimensions
        </h3>
        <ul className="mt-3 space-y-2 text-text-muted dark:text-text-muted-dark">
          <li>
            <strong>Energy Rhythm</strong> — How your energy flows during a
            workday (steady, burst, mixed)
          </li>
          <li>
            <strong>People Density</strong> — How many people are physically
            around you (solo, small group, crowd)
          </li>
          <li>
            <strong>Interaction Demand</strong> — How much you engage with
            people (minimal, moderate, constant)
          </li>
          <li>
            <strong>Schedule Predictability</strong> — How much your day follows
            a known pattern (predictable, variable, chaotic)
          </li>
          <li>
            <strong>Rule Density</strong> — How many rules or procedures you
            follow (loose, moderate, strict)
          </li>
          <li>
            <strong>Work Type</strong> — What kind of effort the job asks of you
            (physical, analytical, creative, organizational)
          </li>
          <li>
            <strong>Error Pressure</strong> — How bad it is when you make a
            mistake (low, moderate, high)
          </li>
          <li>
            <strong>Work Value</strong> — What matters most to you about work
            (autonomy, security, altruism, achievement)
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-text dark:text-text-dark">
          How Matching Works
        </h3>
        <p className="mt-3 leading-relaxed text-text-muted dark:text-text-muted-dark">
          Your responses are converted into a preference profile, then compared
          against each job&apos;s environment profile. Results are shown as
          ordinal fit bands (Strong fit, Possible fit, Stretch, Unlikely fit)
          rather than percentages, because the measurement doesn&apos;t support
          that level of precision. Jobs with too many mismatches on primary
          dimensions are moved to &ldquo;Less Likely Fits.&rdquo;
        </p>
      </section>

      <section className="mt-8" id="privacy">
        <h2 className="text-xl font-semibold text-text dark:text-text-dark">
          Privacy
        </h2>
        <p className="mt-3 leading-relaxed text-text-muted dark:text-text-muted-dark">
          Zero data collection. Zero cookies. Zero third-party scripts. All
          computation happens in your browser. Closing the page erases
          everything unless you save or share your results yourself.
        </p>
        <p className="mt-3 leading-relaxed text-text-muted dark:text-text-muted-dark">
          This tool complies with COPPA (Children&apos;s Online Privacy
          Protection Act) requirements. We do not collect, store, or transmit
          any personally identifiable information. There are no accounts, no
          tracking, and no advertising.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-text dark:text-text-dark">
          Scope &amp; Limitations
        </h2>
        <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-text-muted dark:text-text-muted-dark">
          <li>The 54-job database is a sample, not exhaustive.</li>
          <li>Preferences change over time — results are a snapshot.</li>
          <li>Not validated as a psychometric instrument.</li>
          <li>
            Should not be used as a sole basis for career decisions.
          </li>
          <li>
            Use alongside conversations with counselors, mentors, interest
            inventories, and real-world exploration.
          </li>
        </ul>
      </section>
    </main>
  );
}
