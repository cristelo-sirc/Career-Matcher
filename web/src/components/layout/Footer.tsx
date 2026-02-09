import Link from "next/link";
import { SCOPE_DISCLAIMER } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-surface px-4 py-6 dark:border-primary-900 dark:bg-surface-dark">
      <div className="mx-auto max-w-3xl text-center text-sm text-text-muted dark:text-text-muted-dark">
        <p>{SCOPE_DISCLAIMER}</p>
        <p className="mt-2">
          Built on the Theory of Work Adjustment (Dawis &amp; Lofquist, 1984)
        </p>
        <nav className="mt-3 flex items-center justify-center gap-4" aria-label="Footer navigation">
          <Link
            href="/about/"
            className="text-primary-700 hover:underline dark:text-primary-300"
          >
            About &amp; Methodology
          </Link>
          <span aria-hidden="true" className="text-primary-200 dark:text-primary-800">|</span>
          <Link
            href="/about/#privacy"
            className="text-primary-700 hover:underline dark:text-primary-300"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
