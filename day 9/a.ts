const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const headPos = {
  x: 0,
  y: 0,
};

const tailPos = {
  x: 0,
  y: 0,
};

const result = new Set<string>(["0,0"]);

const checkIfTouching = (): boolean => {
  const surrounding = [
    { x: headPos.x + 1, y: headPos.y + 1 },
    { x: headPos.x - 1, y: headPos.y - 1 },
    { x: headPos.x + 1, y: headPos.y - 1 },
    { x: headPos.x - 1, y: headPos.y + 1 },

    { x: headPos.x, y: headPos.y + 1 },
    { x: headPos.x + 1, y: headPos.y },
    { x: headPos.x - 1, y: headPos.y },
    { x: headPos.x, y: headPos.y - 1 },

    { x: headPos.x, y: headPos.y },
  ];

  return surrounding.some((s) => s.x === tailPos.x && s.y === tailPos.y);
};

const moveTail = () => {
  if (checkIfTouching()) {
    return;
  }
  // move right
  if (headPos.x === tailPos.x && headPos.y === tailPos.y + 2) {
    tailPos.y++;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }

  // move left
  if (headPos.x === tailPos.x && headPos.y === tailPos.y - 2) {
    tailPos.y--;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }

  // move up
  if (headPos.x === tailPos.x + 2 && headPos.y === tailPos.y) {
    tailPos.x++;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }

  // move down
  if (headPos.x === tailPos.x - 2 && headPos.y === tailPos.y) {
    tailPos.x--;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }

  // move up right
  if (
    (headPos.x === tailPos.x + 2 && headPos.y === tailPos.y + 1) ||
    (headPos.x === tailPos.x + 1 && headPos.y === tailPos.y + 2)
  ) {
    tailPos.x++;
    tailPos.y++;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }

  // move up left
  if (
    (headPos.x === tailPos.x + 2 && headPos.y === tailPos.y - 1) ||
    (headPos.x === tailPos.x + 1 && headPos.y === tailPos.y - 2)
  ) {
    tailPos.x++;
    tailPos.y--;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }

  // move down right
  if (
    (headPos.x === tailPos.x - 1 && headPos.y === tailPos.y + 2) ||
    (headPos.x === tailPos.x - 2 && headPos.y === tailPos.y + 1)
  ) {
    tailPos.x--;
    tailPos.y++;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }

  // move down left
  if (
    (headPos.x === tailPos.x - 1 && headPos.y === tailPos.y - 2) ||
    (headPos.x === tailPos.x - 2 && headPos.y === tailPos.y - 1)
  ) {
    tailPos.x--;
    tailPos.y--;
    result.add(`${tailPos.x},${tailPos.y}`);
    return;
  }
};

// 1. tail movement logic
const executeMovement = (movement: string) => {
  const [direction, steps] = movement.split(" ");

  for (let i = 0; i < +steps; i++) {
    if (direction === "R") {
      headPos.y++;
      moveTail();
    }
    if (direction === "L") {
      headPos.y--;
      moveTail();
    }
    if (direction === "U") {
      headPos.x++;
      moveTail();
    }
    if (direction === "D") {
      headPos.x--;
      moveTail();
    }
  }
};

// 2. run each steps
inputArr.forEach((movement) => {
  executeMovement(movement);
});

console.log(result.size);
