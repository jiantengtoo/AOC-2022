const input = await Deno.readTextFile("./input.txt");

enum DIRECTION {
  "right",
  "down",
  "left",
  "up",
}

const [mapInput, movementInput] = input.split(/\n\n/);

const parseMovement = (input: string): string[] => {
  let tempString = "";
  const output = [...input].reduce((prev, curr, index) => {
    if (isNaN(+curr)) {
      const prevNumber = tempString;
      tempString = "";
      return [...prev, prevNumber, curr];
    } else {
      tempString += curr;
      if (index === input.length - 1) {
        return [...prev, tempString];
      }
      return prev;
    }
  }, [] as string[]);
  return output;
};

const movements = parseMovement(movementInput);

const parseMap = (input: string): string[][] => {
  return input.split(/\n/).map((line) => {
    return [...line];
  });
};

// manual pre-process by adding space at borders
const map = parseMap(mapInput);

const turn = (currentDirection: DIRECTION, turn: string): DIRECTION => {
  if (turn === "R") {
    if (currentDirection + 1 === 4) {
      return 0;
    }
    return currentDirection + 1;
  } else {
    if (currentDirection - 1 === -1) {
      return 3;
    }
    return currentDirection - 1;
  }
};

const traceEndPos = (
  map: string[][],
  currentLocation: number[],
  direction: DIRECTION
): number[] => {
  let newLocCoor: number[] = [...currentLocation];

  while (true) {
    switch (direction) {
      case DIRECTION.up: {
        if (map[newLocCoor[0] + 1][newLocCoor[1]] === " ") {
          return newLocCoor;
        } else {
          newLocCoor = [newLocCoor[0] + 1, newLocCoor[1]];
        }
        break;
      }
      case DIRECTION.right: {
        if (map[newLocCoor[0]][newLocCoor[1] - 1] === " ") {
          return newLocCoor;
        } else {
          newLocCoor = [newLocCoor[0], newLocCoor[1] - 1];
        }
        break;
      }
      case DIRECTION.down: {
        if (map[newLocCoor[0] - 1][newLocCoor[1]] === " ") {
          return newLocCoor;
        } else {
          newLocCoor = [newLocCoor[0] - 1, newLocCoor[1]];
        }
        break;
      }
      case DIRECTION.left: {
        if (map[newLocCoor[0]][newLocCoor[1] + 1] === " ") {
          return newLocCoor;
        } else {
          newLocCoor = [newLocCoor[0], newLocCoor[1] + 1];
        }
        break;
      }
    }
  }
};

const move = (
  map: string[][],
  currentLocation: number[],
  steps: number,
  direction: DIRECTION
): number[] => {
  let trackLocation = [...currentLocation];

  for (let i = 0; i < steps; i++) {
    switch (direction) {
      case DIRECTION.up: {
        let newLoc = map[trackLocation[0] - 1][trackLocation[1]];
        let newLocCoor = [trackLocation[0] - 1, trackLocation[1]];

        if (newLoc === " ") {
          newLocCoor = traceEndPos(map, currentLocation, direction);
          newLoc = map[newLocCoor[0]][newLocCoor[1]];
        }

        if (newLoc === "#") {
          return trackLocation;
        } else {
          trackLocation = [...newLocCoor];
        }
        break;
      }
      case DIRECTION.right: {
        let newLoc = map[trackLocation[0]][trackLocation[1] + 1];
        let newLocCoor = [trackLocation[0], trackLocation[1] + 1];

        if (newLoc === " ") {
          newLocCoor = traceEndPos(map, currentLocation, direction);
          newLoc = map[newLocCoor[0]][newLocCoor[1]];
        }

        if (newLoc === "#") {
          return trackLocation;
        } else {
          trackLocation = [...newLocCoor];
        }
        break;
      }
      case DIRECTION.down: {
        let newLoc = map[trackLocation[0] + 1][trackLocation[1]];
        let newLocCoor = [trackLocation[0] + 1, trackLocation[1]];

        if (newLoc === " ") {
          newLocCoor = traceEndPos(map, currentLocation, direction);
          newLoc = map[newLocCoor[0]][newLocCoor[1]];
        }

        if (newLoc === "#") {
          return trackLocation;
        } else {
          trackLocation = [...newLocCoor];
        }
        break;
      }
      case DIRECTION.left: {
        let newLoc = map[trackLocation[0]][trackLocation[1] - 1];
        let newLocCoor = [trackLocation[0], trackLocation[1] - 1];

        if (newLoc === " ") {
          newLocCoor = traceEndPos(map, currentLocation, direction);
          newLoc = map[newLocCoor[0]][newLocCoor[1]];
        }

        if (newLoc === "#") {
          return trackLocation;
        } else {
          trackLocation = [...newLocCoor];
        }
        break;
      }
    }
  }

  return trackLocation;
};

const getStarting = (map: string[][]): number[] => {
  let col = 0;
  while (true) {
    if (map[1][col] !== " ") {
      return [1, col];
    }
    col++;
  }
};

let currentLocation = getStarting(map);
let currentDirection = DIRECTION.right;

movements.forEach((movement) => {
  if (["R", "L"].includes(movement)) {
    currentDirection = turn(currentDirection, movement);
  } else {
    currentLocation = move(map, currentLocation, +movement, currentDirection);
  }
});

const result =
  1000 * currentLocation[0] + 4 * currentLocation[1] + currentDirection;

console.log(result);
