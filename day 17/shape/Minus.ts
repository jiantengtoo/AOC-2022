import { Shape } from "./Shape.ts";

export class Minus extends Shape {
  constructor(leftEdge: number, highestRock: number) {
    super(leftEdge, highestRock);
    this.numberOfRocks = 4;
    this.coordinates = [
      `${leftEdge + 3},${highestRock + 4}`,
      `${leftEdge + 4},${highestRock + 4}`,
      `${leftEdge + 5},${highestRock + 4}`,
      `${leftEdge + 6},${highestRock + 4}`,
    ];
  }
}
