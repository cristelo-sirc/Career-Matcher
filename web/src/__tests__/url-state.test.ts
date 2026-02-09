import { describe, it, expect } from "vitest";
import { encodeProfile, decodeProfile } from "@/lib/url-state";
import type { UserDimensionProfile } from "@core/types.js";

describe("URL state encoding/decoding", () => {
  const allZeroProfile: UserDimensionProfile = {
    energyRhythm: "steady",
    peopleDensity: "solo",
    interactionDemand: "minimal",
    schedulePredictability: "predictable",
    ruleDensity: "loose",
    primaryLoadType: "physical",
    errorPressure: "low",
    workValue: "autonomy",
  };

  const allMaxProfile: UserDimensionProfile = {
    energyRhythm: "mixed",
    peopleDensity: "crowd",
    interactionDemand: "constant",
    schedulePredictability: "chaotic",
    ruleDensity: "strict",
    primaryLoadType: "organizational",
    errorPressure: "high",
    workValue: "achievement",
  };

  const mixedProfile: UserDimensionProfile = {
    energyRhythm: "burst",
    peopleDensity: "small-group",
    interactionDemand: "moderate",
    schedulePredictability: "variable",
    ruleDensity: "moderate",
    primaryLoadType: "creative",
    errorPressure: "moderate",
    workValue: "altruism",
  };

  it("round-trips all-zero profile", () => {
    const encoded = encodeProfile(allZeroProfile);
    const decoded = decodeProfile(encoded);
    expect(decoded).toEqual(allZeroProfile);
  });

  it("round-trips all-max profile", () => {
    const encoded = encodeProfile(allMaxProfile);
    const decoded = decodeProfile(encoded);
    expect(decoded).toEqual(allMaxProfile);
  });

  it("round-trips mixed profile", () => {
    const encoded = encodeProfile(mixedProfile);
    const decoded = decodeProfile(encoded);
    expect(decoded).toEqual(mixedProfile);
  });

  it("produces a compact string (< 20 chars)", () => {
    const encoded = encodeProfile(mixedProfile);
    expect(encoded.length).toBeLessThan(20);
  });

  it("produces URL-safe characters only", () => {
    const encoded = encodeProfile(mixedProfile);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("returns null for empty string", () => {
    expect(decodeProfile("")).toBeNull();
  });

  it("returns null for invalid base64", () => {
    expect(decodeProfile("!!!invalid!!!")).toBeNull();
  });

  it("returns null for wrong version", () => {
    // Version byte = 99 instead of 1
    const bytes = new Uint8Array([99, 0, 0, 0, 0, 0, 0, 0, 0]);
    const base64 = btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    expect(decodeProfile(base64)).toBeNull();
  });

  it("returns null for truncated data", () => {
    // Only version byte, no dimension data
    const bytes = new Uint8Array([1]);
    const base64 = btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    expect(decodeProfile(base64)).toBeNull();
  });

  it("returns null for out-of-range level index", () => {
    // Version 1, but first dimension index = 99 (out of range)
    const bytes = new Uint8Array([1, 99, 0, 0, 0, 0, 0, 0, 0]);
    const base64 = btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    expect(decodeProfile(base64)).toBeNull();
  });
});
