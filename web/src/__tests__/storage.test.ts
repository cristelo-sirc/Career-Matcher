import { describe, it, expect } from "vitest";
import { StorageAdapter } from "@/lib/storage";

describe("StorageAdapter", () => {
  it("stores and retrieves values", () => {
    const storage = new StorageAdapter();
    storage.set("key", "value");
    expect(storage.get("key")).toBe("value");
  });

  it("returns null for missing keys", () => {
    const storage = new StorageAdapter();
    expect(storage.get("nonexistent")).toBeNull();
  });

  it("removes values", () => {
    const storage = new StorageAdapter();
    storage.set("key", "value");
    storage.remove("key");
    expect(storage.get("key")).toBeNull();
  });

  it("handles JSON serialization round-trip", () => {
    const storage = new StorageAdapter();
    const data = { responses: { "p-1": 0, "p-2": 2 }, currentIndex: 5 };
    storage.set("quiz", JSON.stringify(data));
    const retrieved = JSON.parse(storage.get("quiz")!);
    expect(retrieved).toEqual(data);
  });
});
