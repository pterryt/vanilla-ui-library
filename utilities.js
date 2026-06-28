export const utilities = {

  shallowEqual(a, b) {
    if (Object.is(a, b)) {
      return true;
    }

    if (typeof a !== "object" || typeof b !== "object" || !a || !b) {
      return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Object.is(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }
}