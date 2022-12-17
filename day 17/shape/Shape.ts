export abstract class Shape {
  numberOfRocks: number;
  coordinates: string[]; // 'x,y'

  constructor(_leftEdge: number, _highestRock: number) {
    this.numberOfRocks = 0;
    this.coordinates = [];
  }

  moveDown(restedRocks: Set<string>): boolean {
    const tempSet = new Set([...restedRocks]);

    const tempMap = this.coordinates.map((coordinate) => {
      const [x, y] = coordinate.split(",");
      return `${x},${+y - 1}`;
    });

    tempMap.forEach((coordinate) => {
      tempSet.add(coordinate);
    });

    if (tempSet.size === restedRocks.size + this.numberOfRocks) {
      this.coordinates = [...tempMap];
      return true;
    } else {
      return false;
    }
  }

  moveRight(rightEdge: number, restedRocks: Set<string>): boolean {
    const reachEdge = this.coordinates.some((coordinate) => {
      const [x] = coordinate.split(",");
      return +x + 1 === rightEdge;
    });

    if (reachEdge) {
      return false;
    } else {
      const tempSet = new Set([...restedRocks]);

      const tempMap = this.coordinates.map((coordinate) => {
        const [x, y] = coordinate.split(",");
        return `${+x + 1},${y}`;
      });

      tempMap.forEach((coordinate) => {
        tempSet.add(coordinate);
      });

      if (tempSet.size === restedRocks.size + this.numberOfRocks) {
        this.coordinates = [...tempMap];
        return true;
      } else {
        return false;
      }
    }
  }

  moveLeft(leftEdge: number, restedRocks: Set<string>): boolean {
    const reachEdge = this.coordinates.some((coordinate) => {
      const [x] = coordinate.split(",");
      return +x - 1 === leftEdge;
    });

    if (reachEdge) {
      return false;
    } else {
      const tempSet = new Set([...restedRocks]);

      const tempMap = this.coordinates.map((coordinate) => {
        const [x, y] = coordinate.split(",");
        return `${+x - 1},${y}`;
      });

      tempMap.forEach((coordinate) => {
        tempSet.add(coordinate);
      });

      if (tempSet.size === restedRocks.size + this.numberOfRocks) {
        this.coordinates = [...tempMap];
        return true;
      } else {
        return false;
      }
    }
  }
}
