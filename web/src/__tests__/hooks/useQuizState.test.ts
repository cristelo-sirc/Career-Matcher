import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuizState } from "@/hooks/useQuizState";

describe("useQuizState", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });
  it("initializes with index 0 and empty responses", () => {
    const { result } = renderHook(() => useQuizState());
    expect(result.current.state.currentIndex).toBe(0);
    expect(Object.keys(result.current.state.responses)).toHaveLength(0);
  });

  it("selects an option", () => {
    const { result } = renderHook(() => useQuizState());
    act(() => result.current.selectOption("p-1", 2));
    expect(result.current.state.responses["p-1"]).toBe(2);
  });

  it("advances to next prompt", () => {
    const { result } = renderHook(() => useQuizState());
    act(() => result.current.next());
    expect(result.current.state.currentIndex).toBe(1);
  });

  it("goes back to previous prompt", () => {
    const { result } = renderHook(() => useQuizState());
    act(() => result.current.next());
    act(() => result.current.next());
    act(() => result.current.goBack());
    expect(result.current.state.currentIndex).toBe(1);
  });

  it("does not go below index 0", () => {
    const { result } = renderHook(() => useQuizState());
    act(() => result.current.goBack());
    expect(result.current.state.currentIndex).toBe(0);
  });

  it("does not go above index 31", () => {
    const { result } = renderHook(() => useQuizState());
    act(() => result.current.goTo(31));
    act(() => result.current.next());
    expect(result.current.state.currentIndex).toBe(31);
  });

  it("replays a section", () => {
    const { result } = renderHook(() => useQuizState());
    act(() => result.current.goTo(20));
    act(() => result.current.replaySection(2));
    expect(result.current.state.currentIndex).toBe(8);
  });

  it("resets state", () => {
    const { result } = renderHook(() => useQuizState());
    act(() => result.current.selectOption("p-1", 1));
    act(() => result.current.next());
    act(() => result.current.reset());
    expect(result.current.state.currentIndex).toBe(0);
    expect(Object.keys(result.current.state.responses)).toHaveLength(0);
  });

  it("generates a seed on init", () => {
    const { result } = renderHook(() => useQuizState());
    expect(result.current.state.seed).toBeGreaterThan(0);
  });
});
