import { Shape } from "./Shape.ts";

export class Plus extends Shape {
  constructor(leftEdge: number, highestRock: number) {
    super(leftEdge, highestRock);
    this.numberOfRocks = 5;
    this.coordinates = [
      `${leftEdge + 3},${highestRock + 5}`,
      `${leftEdge + 4},${highestRock + 4}`,
      `${leftEdge + 4},${highestRock + 5}`,
      `${leftEdge + 4},${highestRock + 6}`,
      `${leftEdge + 5},${highestRock + 5}`,
    ];
  }
}
