import { coodinates } from "./types.ts";
import { checkIfTouching } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const headPos: coodinates = {
  x: 0,
  y: 0,
};

const tailPos: coodinates = {
  x: 0,
  y: 0,
};

const result = new Set<string>(["0,0"]);

// tail movement logic
const moveTail = () => {
  if (checkIfTouching(headPos, tailPos)) {
    return;
  }
  // move right
  if (headPos.x === tailPos.x && headPos.y === tailPos.y + 2) {
    tailPos.y++;
    return;
  }

  // move left
  if (headPos.x === tailPos.x && headPos.y === tailPos.y - 2) {
    tailPos.y--;
    return;
  }

  // move up
  if (headPos.x === tailPos.x + 2 && headPos.y === tailPos.y) {
    tailPos.x++;
    return;
  }

  // move down
  if (headPos.x === tailPos.x - 2 && headPos.y === tailPos.y) {
    tailPos.x--;
    return;
  }

  // move up right
  if (
    (headPos.x === tailPos.x + 2 && headPos.y === tailPos.y + 1) ||
    (headPos.x === tailPos.x + 1 && headPos.y === tailPos.y + 2)
  ) {
    tailPos.x++;
    tailPos.y++;
    return;
  }

  // move up left
  if (
    (headPos.x === tailPos.x + 2 && headPos.y === tailPos.y - 1) ||
    (headPos.x === tailPos.x + 1 && headPos.y === tailPos.y - 2)
  ) {
    tailPos.x++;
    tailPos.y--;
    return;
  }

  // move down right
  if (
    (headPos.x === tailPos.x - 1 && headPos.y === tailPos.y + 2) ||
    (headPos.x === tailPos.x - 2 && headPos.y === tailPos.y + 1)
  ) {
    tailPos.x--;
    tailPos.y++;
    return;
  }

  // move down left
  if (
    (headPos.x === tailPos.x - 1 && headPos.y === tailPos.y - 2) ||
    (headPos.x === tailPos.x - 2 && headPos.y === tailPos.y - 1)
  ) {
    tailPos.x--;
    tailPos.y--;
    return;
  }
};

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
    result.add(`${tailPos.x},${tailPos.y}`);
  }
};

inputArr.forEach((movement) => {
  executeMovement(movement);
});

console.log(result.size);
