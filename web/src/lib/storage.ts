/**
 * StorageAdapter — sessionStorage with in-memory fallback.
 *
 * Tries sessionStorage first (works in all incognito modes).
 * Falls back to an in-memory Map if sessionStorage is unavailable.
 * NEVER uses localStorage (Safari incognito throws on write).
 */
export class StorageAdapter {
  private fallback = new Map<string, string>();
  private useSessionStorage: boolean;

  constructor() {
    this.useSessionStorage = false;
    try {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("__cm_test", "1");
        sessionStorage.removeItem("__cm_test");
        this.useSessionStorage = true;
      }
    } catch {
      this.useSessionStorage = false;
    }
  }

  get(key: string): string | null {
    if (this.useSessionStorage) {
      return sessionStorage.getItem(key);
    }
    return this.fallback.get(key) ?? null;
  }

  set(key: string, value: string): void {
    if (this.useSessionStorage) {
      try {
        sessionStorage.setItem(key, value);
      } catch {
        this.fallback.set(key, value);
      }
    } else {
      this.fallback.set(key, value);
    }
  }

  remove(key: string): void {
    if (this.useSessionStorage) {
      sessionStorage.removeItem(key);
    }
    this.fallback.delete(key);
  }

  /** Returns true if using in-memory fallback (no persistence across refresh). */
  get isMemoryOnly(): boolean {
    return !this.useSessionStorage;
  }
}
