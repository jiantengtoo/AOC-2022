import { coodinates } from "./types.ts";
import { checkIfTouching } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const result = new Set<string>(["0,0"]);

const rope: Array<coodinates> = Array.from({ length: 10 }, () => ({
  x: 0,
  y: 0,
}));

// tail movement logic
const moveTail = () => {
  rope.forEach((_, index) => {
    if (index === 0) return;

    if (checkIfTouching(rope[index], rope[index - 1])) {
      return;
    }

    // move right
    if (
      rope[index - 1].x === rope[index].x &&
      rope[index - 1].y === rope[index].y + 2
    ) {
      rope[index].y++;
      return;
    }

    // move left
    if (
      rope[index - 1].x === rope[index].x &&
      rope[index - 1].y === rope[index].y - 2
    ) {
      rope[index].y--;
      return;
    }

    // move up
    if (
      rope[index - 1].x === rope[index].x + 2 &&
      rope[index - 1].y === rope[index].y
    ) {
      rope[index].x++;
      return;
    }

    // move down
    if (
      rope[index - 1].x === rope[index].x - 2 &&
      rope[index - 1].y === rope[index].y
    ) {
      rope[index].x--;
      return;
    }

    // move up right
    if (
      (rope[index - 1].x === rope[index].x + 2 &&
        rope[index - 1].y === rope[index].y + 1) ||
      (rope[index - 1].x === rope[index].x + 1 &&
        rope[index - 1].y === rope[index].y + 2) ||
      (rope[index - 1].x === rope[index].x + 2 &&
        rope[index - 1].y === rope[index].y + 2)
    ) {
      rope[index].x++;
      rope[index].y++;
      return;
    }

    // move up left
    if (
      (rope[index - 1].x === rope[index].x + 2 &&
        rope[index - 1].y === rope[index].y - 1) ||
      (rope[index - 1].x === rope[index].x + 1 &&
        rope[index - 1].y === rope[index].y - 2) ||
      (rope[index - 1].x === rope[index].x + 2 &&
        rope[index - 1].y === rope[index].y - 2)
    ) {
      rope[index].x++;
      rope[index].y--;
      return;
    }

    // move down right
    if (
      (rope[index - 1].x === rope[index].x - 1 &&
        rope[index - 1].y === rope[index].y + 2) ||
      (rope[index - 1].x === rope[index].x - 2 &&
        rope[index - 1].y === rope[index].y + 1) ||
      (rope[index - 1].x === rope[index].x - 2 &&
        rope[index - 1].y === rope[index].y + 2)
    ) {
      rope[index].x--;
      rope[index].y++;
      return;
    }

    // move down left
    if (
      (rope[index - 1].x === rope[index].x - 1 &&
        rope[index - 1].y === rope[index].y - 2) ||
      (rope[index - 1].x === rope[index].x - 2 &&
        rope[index - 1].y === rope[index].y - 1) ||
      (rope[index - 1].x === rope[index].x - 2 &&
        rope[index - 1].y === rope[index].y - 2)
    ) {
      rope[index].x--;
      rope[index].y--;
      return;
    }
  });
};

const executeMovement = (movement: string) => {
  const [direction, steps] = movement.split(" ");

  for (let i = 0; i < +steps; i++) {
    if (direction === "R") {
      rope[0].y++;
      moveTail();
    }
    if (direction === "L") {
      rope[0].y--;
      moveTail();
    }
    if (direction === "U") {
      rope[0].x++;
      moveTail();
    }
    if (direction === "D") {
      rope[0].x--;
      moveTail();
    }

    result.add(`${rope[rope.length - 1].x},${rope[rope.length - 1].y}`);
  }
};

inputArr.forEach((movement) => {
  executeMovement(movement);
});

console.log(result.size);
