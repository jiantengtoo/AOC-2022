import { Shape } from "./Shape.ts";

export class Square extends Shape {
  constructor(leftEdge: number, highestRock: number) {
    super(leftEdge, highestRock);
    this.numberOfRocks = 4;
    this.coordinates = [
      `${leftEdge + 3},${highestRock + 4}`,
      `${leftEdge + 3},${highestRock + 5}`,
      `${leftEdge + 4},${highestRock + 4}`,
      `${leftEdge + 4},${highestRock + 5}`,
    ];
  }
}
