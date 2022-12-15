import { getManhattanDistance, capturingRegex } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

const IMPORTANT_ROW_Y = 2000000;

// input: sensor x,y & Manhattan distance
// find all the spaces?
const findSpacesWithinManhattanDistance = (
  x: number,
  y: number,
  distance: number,
  importantRow: number
) => {
  const check = getManhattanDistance(x, y, x, importantRow);

  if (check > distance) {
    return;
  }

  const displacement = distance - Math.abs(importantRow - y) + 1;

  const resultSet = new Set<string>();
  if (y === importantRow) {
    resultSet.add(`${x},${y}`);
  }
  resultSet.add(`${x},${importantRow}`);

  for (let i = 0; i < displacement; i++) {
    resultSet.add(`${x + i},${importantRow}`);
    resultSet.add(`${x - i},${importantRow}`);
  }

  return resultSet;
};

let result = new Set<string>();

const beacon = new Set<string>();

input.split(/\n/).forEach((line) => {
  const [_, x1, y1, x2, y2] = line.match(capturingRegex) as RegExpMatchArray;

  beacon.add(`${x2},${y2}`);

  const distance = getManhattanDistance(+x1, +y1, +x2, +y2);

  const set = findSpacesWithinManhattanDistance(
    +x1,
    +y1,
    distance,
    IMPORTANT_ROW_Y
  );
  if (set) result = new Set([...result, ...set]);
});

beacon.forEach((b) => {
  result.delete(b);
});

console.log(result.size);

// learning - a more optimized solution would be to keep track of the
// biggest & smallest x values (biggestX, IMPORTANT_ROW_Y) (smallestX, IMPORTANT_ROW_Y)
