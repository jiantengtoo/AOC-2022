import {
  getSmallerBiggerNumber,
  getBtmCoordinates,
  getBtmLeftCoordinates,
  getBtmRightCoordinates,
} from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

// 1. parse input to create rocks

const rocks = new Set<string>();

// accepts x,y x,y
// draw rocks
const drawLine = (from: string, to: string) => {
  const [fromX, fromY] = from.split(",");
  const [toX, toY] = to.split(",");
  if (fromX === toX) {
    const [smallerNumber, biggerNumber] = getSmallerBiggerNumber(+fromY, +toY);

    let index = smallerNumber;
    while (index <= biggerNumber) {
      rocks.add(`${fromX},${index}`);
      index++;
    }
  } else {
    const [smallerNumber, biggerNumber] = getSmallerBiggerNumber(+fromX, +toX);

    let index = smallerNumber;
    while (index <= biggerNumber) {
      rocks.add(`${index},${fromY}`);
      index++;
    }
  }
};

input.split(/\n/).forEach((line) => {
  const coordinates = line.split(" -> ");
  for (let i = 0; i < coordinates.length - 1; i++) {
    drawLine(coordinates[i], coordinates[i + 1]);
  }
});

// 2. pour sand
const source = "500,0";

const sands = new Set<string>();

const thresholdMovingSand = 1000; // stop when hit threshold - assume reached abyss

let moving = 0;

let currentSand = source;

do {
  const btm = getBtmCoordinates(currentSand);

  // bottom have
  if (!(rocks.has(btm) || sands.has(btm))) {
    // move down
    currentSand = btm;
    moving++;

    continue;
  }

  const btmLeft = getBtmLeftCoordinates(currentSand);

  if (!(rocks.has(btmLeft) || sands.has(btmLeft))) {
    // move step down and left
    currentSand = btmLeft;
    moving++;

    continue;
  }
  const btmRight = getBtmRightCoordinates(currentSand);

  if (!(rocks.has(btmRight) || sands.has(btmRight))) {
    // move step down and right
    currentSand = btmRight;
    moving++;

    continue;
  }

  // sand rest and reset
  sands.add(currentSand);
  currentSand = source;
  moving = 0;
} while (moving < thresholdMovingSand);

console.log(sands.size);
