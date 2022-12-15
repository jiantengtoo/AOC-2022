// input: sensor x,y & beacon x,y
// return: find Manhattan distance
export const getManhattanDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

export const capturingRegex =
  /Sensor at x=(?<x1>-?\d{1,}), y=(?<y1>-?\d{1,}): closest beacon is at x=(?<x2>-?\d{1,}), y=(?<y2>-?\d{1,})/;
