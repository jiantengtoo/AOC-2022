console.time("time1");
console.time("time2");

const input = await Deno.readTextFile("./input.txt");

const BLIZZARD_MOVEMENT = ["^", ">", "v", "<"];

const MOVE_SET = [
  [0, 0],
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let startPosition = "";
let endPosition = "";
const height = input.split(/\n/).length;
const width = input.split(/\n/)[0].length;

const walls = new Set<string>();

let blizzardsState = new Set<string>();

input.split(/\n/).forEach((line, i, arr) => {
  [...line].forEach((char, j) => {
    if (i === 0 && char === ".") {
      startPosition = `${i},${j}`;
    }
    if (i === arr.length - 1 && char === ".") {
      endPosition = `${i},${j}`;
    }
    if (char === "#") {
      walls.add(`${i},${j}`);
    }
    if (BLIZZARD_MOVEMENT.includes(char)) {
      blizzardsState.add(`${char},${i},${j}`);
    }
  });
});

const moveBlizzard = (blizzardsState: Set<string>): Set<string> => {
  const newBlizzardsState = new Set<string>();

  blizzardsState.forEach((blizzard) => {
    const [move, row, col] = blizzard.split(",");
    switch (move) {
      case "^": {
        if (walls.has(`${+row - 1},${col}`)) {
          newBlizzardsState.add(`${move},${height - 2},${col}`);
        } else {
          newBlizzardsState.add(`${move},${+row - 1},${col}`);
        }
        break;
      }
      case ">": {
        if (walls.has(`${row},${+col + 1}`)) {
          newBlizzardsState.add(`${move},${row},${1}`);
        } else {
          newBlizzardsState.add(`${move},${row},${+col + 1}`);
        }
        break;
      }
      case "v": {
        if (walls.has(`${+row + 1},${col}`)) {
          newBlizzardsState.add(`${move},${1},${col}`);
        } else {
          newBlizzardsState.add(`${move},${+row + 1},${col}`);
        }
        break;
      }
      case "<": {
        if (walls.has(`${row},${+col - 1}`)) {
          newBlizzardsState.add(`${move},${row},${width - 2}`);
        } else {
          newBlizzardsState.add(`${move},${row},${+col - 1}`);
        }
        break;
      }
      default:
        throw "ERR";
    }
  });

  return newBlizzardsState;
};

const travelling = (start: string, end: string): number => {
  let minute = 0;

  let possiblePositions = new Set<string>([start]);

  while (true) {
    if (possiblePositions.has(end)) {
      break;
    }

    blizzardsState = moveBlizzard(blizzardsState);

    const temp = [...possiblePositions];
    possiblePositions = new Set<string>();

    temp.forEach((position) => {
      MOVE_SET.forEach((move) => {
        const [row, col] = position.split(",");

        const newMove = `${+row + move[0]},${+col + move[1]}`;

        if (
          !walls.has(newMove) &&
          !blizzardsState.has(`^,${newMove}`) &&
          !blizzardsState.has(`>,${newMove}`) &&
          !blizzardsState.has(`v,${newMove}`) &&
          !blizzardsState.has(`<,${newMove}`) &&
          +row + move[0] > -1 &&
          +row + move[0] < height
        ) {
          possiblePositions.add(newMove);
        }
      });
    });

    minute++;
  }

  return minute;
};

const travelTime = travelling(startPosition, endPosition);

// part 1
console.log("Reached end: " + travelTime);
console.timeEnd("time1");

// part 2
console.log("dumb elf forget snack");

const travelTime2 = travelling(endPosition, startPosition);
const travelTime3 = travelling(startPosition, endPosition);

console.log(`Reached end: ${+travelTime + +travelTime2 + +travelTime3}`);
console.timeEnd("time2");
