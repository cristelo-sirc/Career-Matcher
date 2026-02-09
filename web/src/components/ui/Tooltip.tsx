"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";

export interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tooltipId = useRef(
    `tooltip-${Math.random().toString(36).slice(2, 9)}`,
  ).current;

  const show = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <span aria-describedby={visible ? tooltipId : undefined} tabIndex={0} role="note">
        {children}
      </span>
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-text px-3 py-1.5 text-xs text-surface shadow-lg dark:bg-text-dark dark:text-surface-dark"
        >
          {content}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text dark:border-t-text-dark"
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}
