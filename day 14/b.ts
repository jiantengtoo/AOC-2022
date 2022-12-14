import {
  getSmallerBiggerNumber,
  getBtmCoordinates2,
  getBtmLeftCoordinates2,
  getBtmRightCoordinates2,
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

// calculate and add floor
let mostBottom = 0;

rocks.forEach((rock) => {
  const [, y] = rock.split(",");
  if (+y > mostBottom) mostBottom = +y;
});

mostBottom += 2;

rocks.add(`*,${mostBottom}`);

// 2. pour sand
const source = "500,0";

const sands = new Set<string>();

let stopCondition = false;

let currentSand = source;

do {
  const btm = getBtmCoordinates2(currentSand, mostBottom);

  if (!(rocks.has(btm) || sands.has(btm))) {
    // move down
    currentSand = btm;

    continue;
  }

  const btmLeft = getBtmLeftCoordinates2(currentSand, mostBottom);

  if (!(rocks.has(btmLeft) || sands.has(btmLeft))) {
    // move step down and left
    currentSand = btmLeft;

    continue;
  }
  const btmRight = getBtmRightCoordinates2(currentSand, mostBottom);

  if (!(rocks.has(btmRight) || sands.has(btmRight))) {
    // move step down and right
    currentSand = btmRight;

    continue;
  }

  // sand rest and reset
  sands.add(currentSand);

  // stop when current sand rest at source
  if (currentSand === source) stopCondition = true;

  currentSand = source;
} while (!stopCondition);

console.log(sands.size);
