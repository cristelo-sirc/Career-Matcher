import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      {/* Hero */}
      <section className="py-8 text-center sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl dark:text-text-dark">
          Discover Work Environments That Fit You
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-muted dark:text-text-muted-dark">
          Answer 32 quick scenarios. See which real careers match your
          preferences. No sign-up. No data collected. Takes about 10 minutes.
        </p>
        <div className="mt-8">
          <Button href="/quiz/" size="lg">
            Get Started
          </Button>
        </div>
        <p className="mt-4 text-sm text-text-muted dark:text-text-muted-dark">
          There are no wrong answers — this is about what you prefer, not what
          you&apos;re good at.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-8" aria-labelledby="how-it-works">
        <h2
          id="how-it-works"
          className="mb-8 text-center text-2xl font-bold text-text dark:text-text-dark"
        >
          How It Works
        </h2>
        <ol className="grid list-none gap-6 p-0 sm:grid-cols-3">
          <li>
            <Card className="h-full text-center">
              <div
                className="mb-3 text-2xl font-bold text-primary-500 dark:text-primary-400"
                aria-hidden="true"
              >
                1
              </div>
              <h3 className="mb-2 font-semibold text-text dark:text-text-dark">
                Read short scenarios
              </h3>
              <p className="text-sm text-text-muted dark:text-text-muted-dark">
                Each one describes a real work situation.
              </p>
            </Card>
          </li>
          <li>
            <Card className="h-full text-center">
              <div
                className="mb-3 text-2xl font-bold text-primary-500 dark:text-primary-400"
                aria-hidden="true"
              >
                2
              </div>
              <h3 className="mb-2 font-semibold text-text dark:text-text-dark">
                Pick what sounds like you
              </h3>
              <p className="text-sm text-text-muted dark:text-text-muted-dark">
                Tap the option that fits best — no right or wrong answers.
              </p>
            </Card>
          </li>
          <li>
            <Card className="h-full text-center">
              <div
                className="mb-3 text-2xl font-bold text-primary-500 dark:text-primary-400"
                aria-hidden="true"
              >
                3
              </div>
              <h3 className="mb-2 font-semibold text-text dark:text-text-dark">
                See jobs that match
              </h3>
              <p className="text-sm text-text-muted dark:text-text-muted-dark">
                Discover careers that share your preferred work conditions.
              </p>
            </Card>
          </li>
        </ol>
      </section>

      {/* Trust Signals */}
      <section className="py-8" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="sr-only">
          Trust and privacy
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Based on established vocational psychology research",
            "No data leaves your device \u2014 ever",
            "Not a test \u2014 there are no wrong answers",
            "One input among many \u2014 use alongside conversations with counselors and mentors",
          ].map((text) => (
            <div
              key={text}
              className="rounded-lg border border-primary-100 p-4 dark:border-primary-900"
            >
              <p className="text-sm text-text-muted dark:text-text-muted-dark">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
