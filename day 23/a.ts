const input = await Deno.readTextFile("./input.txt");

const ROUNDS = 10;

const elfSet = new Set<string>();

input.split(/\n/).forEach((line, row) => {
  [...line].forEach((value, col) => {
    if (value === "#") {
      elfSet.add(`${row},${col}`);
    }
  });
});

const doNothing = (elfSet: Set<string>, input: string): boolean => {
  const [row, col] = input.split(",");

  if (
    elfSet.has(`${+row - 1},${+col - 1}`) ||
    elfSet.has(`${+row - 1},${col}`) ||
    elfSet.has(`${+row - 1},${+col + 1}`) ||
    elfSet.has(`${+row + 1},${+col - 1}`) ||
    elfSet.has(`${+row + 1},${col}`) ||
    elfSet.has(`${+row + 1},${+col + 1}`) ||
    elfSet.has(`${row},${+col - 1}`) ||
    elfSet.has(`${row},${+col + 1}`)
  ) {
    return false;
  }

  return true;
};

const checkNorth = (elfSet: Set<string>, input: string): string | undefined => {
  const [row, col] = input.split(",");

  if (
    elfSet.has(`${+row - 1},${+col - 1}`) ||
    elfSet.has(`${+row - 1},${col}`) ||
    elfSet.has(`${+row - 1},${+col + 1}`)
  ) {
    return;
  }

  return `${+row - 1},${col}`;
};

const checkSouth = (elfSet: Set<string>, input: string): string | undefined => {
  const [row, col] = input.split(",");

  if (
    elfSet.has(`${+row + 1},${+col - 1}`) ||
    elfSet.has(`${+row + 1},${col}`) ||
    elfSet.has(`${+row + 1},${+col + 1}`)
  ) {
    return;
  }

  return `${+row + 1},${col}`;
};

const checkWest = (elfSet: Set<string>, input: string): string | undefined => {
  const [row, col] = input.split(",");

  if (
    elfSet.has(`${+row - 1},${+col - 1}`) ||
    elfSet.has(`${row},${+col - 1}`) ||
    elfSet.has(`${+row + 1},${+col - 1}`)
  ) {
    return;
  }

  return `${row},${+col - 1}`;
};

const checkEast = (elfSet: Set<string>, input: string): string | undefined => {
  const [row, col] = input.split(",");

  if (
    elfSet.has(`${+row - 1},${+col + 1}`) ||
    elfSet.has(`${row},${+col + 1}`) ||
    elfSet.has(`${+row + 1},${+col + 1}`)
  ) {
    return;
  }

  return `${row},${+col + 1}`;
};

const moveLogic = (
  movementMap: Map<string, number>,
  elfMoveWhere: Map<string, string>,
  can: string,
  elfPos: string
) => {
  if (movementMap.has(can)) {
    movementMap.set(can, (movementMap.get(can) as number) + 1);
  } else {
    movementMap.set(can, 1);
  }

  elfMoveWhere.set(elfPos, can);
};

for (let i = 0; i < ROUNDS; i++) {
  const movementMap = new Map<string, number>();

  const elfMoveWhere = new Map<string, string>();

  const seq = i % 4;

  if (seq === 0) {
    elfSet.forEach((elfPos) => {
      if (doNothing(elfSet, elfPos)) return;

      const canNorth = checkNorth(elfSet, elfPos);
      if (canNorth) {
        moveLogic(movementMap, elfMoveWhere, canNorth, elfPos);
        return;
      }

      const canSouth = checkSouth(elfSet, elfPos);
      if (canSouth) {
        moveLogic(movementMap, elfMoveWhere, canSouth, elfPos);
        return;
      }

      const canWest = checkWest(elfSet, elfPos);
      if (canWest) {
        moveLogic(movementMap, elfMoveWhere, canWest, elfPos);
        return;
      }

      const canEast = checkEast(elfSet, elfPos);
      if (canEast) {
        moveLogic(movementMap, elfMoveWhere, canEast, elfPos);
        return;
      }
    });
  }

  if (seq === 1) {
    elfSet.forEach((elfPos) => {
      if (doNothing(elfSet, elfPos)) return;

      const canSouth = checkSouth(elfSet, elfPos);
      if (canSouth) {
        moveLogic(movementMap, elfMoveWhere, canSouth, elfPos);
        return;
      }

      const canWest = checkWest(elfSet, elfPos);
      if (canWest) {
        moveLogic(movementMap, elfMoveWhere, canWest, elfPos);
        return;
      }

      const canEast = checkEast(elfSet, elfPos);
      if (canEast) {
        moveLogic(movementMap, elfMoveWhere, canEast, elfPos);
        return;
      }

      const canNorth = checkNorth(elfSet, elfPos);
      if (canNorth) {
        moveLogic(movementMap, elfMoveWhere, canNorth, elfPos);
        return;
      }
    });
  }

  if (seq === 2) {
    elfSet.forEach((elfPos) => {
      if (doNothing(elfSet, elfPos)) return;

      const canWest = checkWest(elfSet, elfPos);
      if (canWest) {
        moveLogic(movementMap, elfMoveWhere, canWest, elfPos);
        return;
      }

      const canEast = checkEast(elfSet, elfPos);
      if (canEast) {
        moveLogic(movementMap, elfMoveWhere, canEast, elfPos);
        return;
      }

      const canNorth = checkNorth(elfSet, elfPos);
      if (canNorth) {
        moveLogic(movementMap, elfMoveWhere, canNorth, elfPos);
        return;
      }

      const canSouth = checkSouth(elfSet, elfPos);
      if (canSouth) {
        moveLogic(movementMap, elfMoveWhere, canSouth, elfPos);
        return;
      }
    });
  }

  if (seq === 3) {
    elfSet.forEach((elfPos) => {
      if (doNothing(elfSet, elfPos)) return;

      const canEast = checkEast(elfSet, elfPos);
      if (canEast) {
        moveLogic(movementMap, elfMoveWhere, canEast, elfPos);
        return;
      }

      const canNorth = checkNorth(elfSet, elfPos);
      if (canNorth) {
        moveLogic(movementMap, elfMoveWhere, canNorth, elfPos);
        return;
      }

      const canSouth = checkSouth(elfSet, elfPos);
      if (canSouth) {
        moveLogic(movementMap, elfMoveWhere, canSouth, elfPos);
        return;
      }

      const canWest = checkWest(elfSet, elfPos);
      if (canWest) {
        moveLogic(movementMap, elfMoveWhere, canWest, elfPos);
        return;
      }
    });
  }

  elfSet.forEach((elfPos) => {
    const moveWhere = elfMoveWhere.get(elfPos);
    if (!moveWhere) return;

    if (movementMap.get(moveWhere) === 1) {
      elfSet.delete(elfPos);
      elfSet.add(moveWhere);
    }
  });
}

let minRow: number = Number.MAX_SAFE_INTEGER;
let maxRow: number = Number.MIN_SAFE_INTEGER;
let minCol: number = Number.MAX_SAFE_INTEGER;
let maxCol: number = Number.MIN_SAFE_INTEGER;

elfSet.forEach((elfPos) => {
  const [row, col] = elfPos.split(",");
  minRow = Math.min(minRow, +row);
  maxRow = Math.max(maxRow, +row);
  minCol = Math.min(minCol, +col);
  maxCol = Math.max(maxCol, +col);
});

let empty = 0;

for (let i = minRow; i <= maxRow; i++) {
  for (let j = minCol; j <= maxCol; j++) {
    if (!elfSet.has(`${i},${j}`)) {
      empty++;
    }
  }
}

console.log(empty);

// debug
// for (let i = -10; i < 20; i++) {
//   let string = "";
//   for (let j = -10; j < 20; j++) {
//     if (elfSet.has(`${i},${j}`)) {
//       string += "#";
//     } else {
//       string += ".";
//     }
//   }
//   console.log(string);
// }
