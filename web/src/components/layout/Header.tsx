"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-surface/95 px-4 py-3 backdrop-blur-sm dark:border-primary-900 dark:bg-surface-dark/95">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Career-Matcher
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href="/about/"
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-50 dark:hover:bg-primary-950 ${
                    pathname === "/about" || pathname === "/about/"
                      ? "text-primary-700 dark:text-primary-300"
                      : "text-text dark:text-text-dark"
                  }`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
