// @vitest-environment node
import { describe, it, expect } from "vitest";
import { Utility } from "@app/src/utility.js";

describe("Utility.shallowEqual", () => {
  it("returns true for the same object", () => {
    const obj = { a: 1 };

    expect(Utility.shallowEqual(obj, obj)).toBe(true);
  });

  it("returns true for equal objects", () => {
    expect(
        Utility.shallowEqual(
            { a: 1, b: 2 },
            { a: 1, b: 2 }
        )
    ).toBe(true);
  });

  it("returns false when values differ", () => {
    expect(
        Utility.shallowEqual(
            { a: 1 },
            { a: 2 }
        )
    ).toBe(false);
  });

  it("returns false when key counts differ", () => {
    expect(
        Utility.shallowEqual(
            { a: 1 },
            { a: 1, b: 2 }
        )
    ).toBe(false);
  });

  it("returns false for null", () => {
    expect(
        Utility.shallowEqual(null, {})
    ).toBe(false);
  });

  it("returns true for primitive values", () => {
    expect(
        Utility.shallowEqual(1, 1)
    ).toBe(true);

    expect(
        Utility.shallowEqual("a", "b")
    ).toBe(false);
  });

  it("does not compare nested objects deeply", () => {
    expect(
        Utility.shallowEqual(
            { a: { x: 1 } },
            { a: { x: 1 } }
        )
    ).toBe(false);
  });

  it("returns true when nested object references are identical", () => {
    const nested = { x: 1 };

    expect(
        Utility.shallowEqual(
            { a: nested },
            { a: nested }
        )
    ).toBe(true);
  });
});