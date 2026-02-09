/**
 * URL State — encode/decode resolved profiles for shareable URLs.
 *
 * Encodes the resolved profile (8 dimension levels) into a compact
 * base64url string. This is more compact than encoding raw responses
 * and avoids exposing granular response data.
 *
 * Format: version byte (1) + 8 dimension level indices packed into bytes.
 * Total: ~4-6 base64url characters.
 */

import { ALL_DIMENSIONS, DIMENSION_META, type Dimension } from "@core/dimensions.js";
import type { UserDimensionProfile } from "@core/types.js";

const VERSION = 1;

/**
 * Encode a resolved profile into a compact base64url string.
 */
export function encodeProfile(profile: UserDimensionProfile): string {
  const bytes: number[] = [VERSION];

  for (const dim of ALL_DIMENSIONS) {
    const meta = DIMENSION_META[dim];
    const value = profile[dim];
    const index = meta.levels.findIndex((l) => l.value === value);
    bytes.push(index >= 0 ? index : 0);
  }

  const uint8 = new Uint8Array(bytes);
  // Convert to base64url (URL-safe, no padding)
  const base64 = btoa(String.fromCharCode(...uint8))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return base64;
}

/**
 * Decode a base64url string back to a resolved profile.
 * Returns null if the string is invalid or version is unsupported.
 */
export function decodeProfile(encoded: string): UserDimensionProfile | null {
  try {
    // Restore base64 padding
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    if (bytes.length < 1 + ALL_DIMENSIONS.length) return null;
    if (bytes[0] !== VERSION) return null;

    const profile: Record<string, string> = {};

    for (let i = 0; i < ALL_DIMENSIONS.length; i++) {
      const dim = ALL_DIMENSIONS[i] as Dimension;
      const meta = DIMENSION_META[dim];
      const index = bytes[i + 1];
      if (index >= meta.levels.length) return null;
      profile[dim] = meta.levels[index].value;
    }

    return profile as unknown as UserDimensionProfile;
  } catch {
    return null;
  }
}
