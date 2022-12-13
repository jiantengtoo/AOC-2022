const isNumber = (input: unknown): input is number => {
  return typeof input === "number";
};

const isArray = (unknown: unknown): unknown is unknown[] => {
  return typeof unknown === "object";
};

export const compare = (left: unknown, right: unknown): number => {
  // 1. both are number
  if (isNumber(left) && isNumber(right)) {
    if (left > right) {
      return -1;
    }
    if (left < right) {
      return 1;
    }
    return 0;
  }

  // 2. if both are lists
  if (isArray(left) && isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      if (compare(left[i], right[i]) !== 0) {
        return compare(left[i], right[i]);
      }
    }

    if (left.length > right.length) return -1;
    if (left.length < right.length) return 1;
    return 0;
  }

  // 3. if one is list, one is array
  if (isArray(left) && isNumber(right)) return compare(left, [right]);
  if (isNumber(left) && isArray(right)) return compare([left], right);

  // wont reach here
  return 0;
};
