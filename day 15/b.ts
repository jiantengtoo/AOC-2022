import { capturingRegex, getManhattanDistance } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

const LOWEST = 0;
const HIGHEST = 4_000_000 + 1;

const data: {
  // middle
  x0: number;
  y0: number;
  // top
  xTop: number;
  yTop: number;
  // bottom
  xBtm: number;
  yBtm: number;
  // left
  xLeft: number;
  yLeft: number;
  // right
  xRight: number;
  yRight: number;
  distance: number;
}[] = [];

input.split(/\n/).forEach((line) => {
  const [_, x1, y1, x2, y2] = line.match(capturingRegex) as RegExpMatchArray;

  const distance = getManhattanDistance(+x1, +y1, +x2, +y2);

  data.push({
    x0: +x1,
    y0: +y1,
    // top
    xTop: +x1,
    yTop: +y1 - distance - 1,
    // btm
    xBtm: +x1,
    yBtm: +y1 + distance + 1,
    // left
    xLeft: +x1 - distance - 1,
    yLeft: +y1,
    // right
    xRight: +x1 + distance + 1,
    yRight: +y1,
    distance: distance + 1,
  });
});

data.sort((a, b) => b.distance - a.distance);

let shldBreak = false;

const result = {
  x: 0,
  y: 0,
};

// loop through the input data
for (let d = 0; d < data.length; d++) {
  if (shldBreak) break;
  const dataCheck = data[d];

  // loop through the edges of each sensor distance
  for (let i = 0; i < dataCheck.distance; i++) {
    if (shldBreak) break;

    const checkArr = [
      {
        // top to right
        checkX: dataCheck.xTop + i,
        checkY: dataCheck.yTop + i,
      },
      {
        // right to btm
        checkX: dataCheck.xRight - i,
        checkY: dataCheck.yRight + i,
      },
      {
        // btm to left
        checkX: dataCheck.xBtm - i,
        checkY: dataCheck.yBtm - i,
      },
      {
        // left to top
        checkX: dataCheck.xLeft + i,
        checkY: dataCheck.yLeft - i,
      },
    ];

    for (let j = 0; j < checkArr.length; j++) {
      if (shldBreak) break;

      // break if out of limit
      if (
        checkArr[j].checkX < LOWEST ||
        checkArr[j].checkX > HIGHEST ||
        checkArr[j].checkY < LOWEST ||
        checkArr[j].checkY > HIGHEST
      ) {
        break;
      }

      for (let k = 0; k < data.length; k++) {
        const distance = getManhattanDistance(
          checkArr[j].checkX,
          checkArr[j].checkY,
          data[k].x0,
          data[k].y0
        );
        if (distance < data[k].distance) {
          break;
        }

        if (k === data.length - 1) {
          result.x = checkArr[j].checkX;
          result.y = checkArr[j].checkY;
          shldBreak = true;
        }
      }
    }
  }
}

console.log(result.x * 4_000_000 + result.y);

// can be improve - nested loops to be destroyed
