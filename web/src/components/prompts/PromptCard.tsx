"use client";

import { useCallback, useRef } from "react";
import type { SituationalPrompt } from "@core/types.js";
import { OptionCard } from "./OptionCard";

interface PromptCardProps {
  prompt: SituationalPrompt;
  selectedOption: number | undefined;
  onSelectOption: (optionIndex: number) => void;
}

export function PromptCard({
  prompt,
  selectedOption,
  onSelectOption,
}: PromptCardProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>(
        'button[aria-pressed]',
      );
      if (!buttons || buttons.length === 0) return;

      const currentIdx = Array.from(buttons).findIndex(
        (btn) => btn === document.activeElement,
      );
      if (currentIdx === -1) return;

      let nextIdx = currentIdx;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIdx = (currentIdx + 1) % buttons.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIdx = (currentIdx - 1 + buttons.length) % buttons.length;
      }
      if (nextIdx !== currentIdx) {
        buttons[nextIdx].focus();
      }
    },
    [],
  );

  return (
    <div>
      <h2
        id="scenario-heading"
        className="text-center text-lg font-semibold text-text sm:text-xl dark:text-text-dark"
      >
        {prompt.scenario}
      </h2>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- arrow key navigation delegates to child buttons */}
      <div
        ref={groupRef}
        role="group"
        aria-labelledby="scenario-heading"
        className={`mt-6 gap-3 ${
          prompt.options.length === 4
            ? "grid grid-cols-1 sm:grid-cols-2"
            : "flex flex-col"
        }`}
        onKeyDown={handleKeyDown}
      >
        {prompt.options.map((option, i) => (
          <OptionCard
            key={`${prompt.id}-${option.dimension}-${option.nudgeToward}`}
            text={option.text}
            selected={selectedOption === i}
            onSelect={() => onSelectOption(i)}
          />
        ))}
      </div>
      {selectedOption !== undefined && (
        <div aria-live="polite" className="sr-only">
          Selected: {prompt.options[selectedOption]?.text}
        </div>
      )}
    </div>
  );
}
