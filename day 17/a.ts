import { Shape } from "./shape/Shape.ts";
import { Minus } from "./shape/Minus.ts";
import { Plus } from "./shape/Plus.ts";
import { MirrorL } from "./shape/MirrorL.ts";
import { I } from "./shape/I.ts";
import { Square } from "./shape/Square.ts";

console.time("time");

const input = await Deno.readTextFile("./input.txt");

const LEFT_EDGE = 0;
const RIGHT_EDGE = 8;

const NUMBER_OF_ROCKS = 2022;

const chamber = new Set<string>([
  "1,0",
  "2,0",
  "3,0",
  "4,0",
  "5,0",
  "6,0",
  "7,0",
]);

let spawnRocksSeqPos = 0;

let highestRock = 0;

let inputPos = 0;

let numberOfRocks = 0;

const spawnRocksSeq = (input: number): Shape => {
  const seq = input % 5;

  switch (seq) {
    case 0:
      return new Minus(LEFT_EDGE, highestRock);
    case 1:
      return new Plus(LEFT_EDGE, highestRock);
    case 2:
      return new MirrorL(LEFT_EDGE, highestRock);
    case 3:
      return new I(LEFT_EDGE, highestRock);
    case 4:
      return new Square(LEFT_EDGE, highestRock);
    default:
      throw Error();
  }
};

do {
  let rested = false;

  const shape = spawnRocksSeq(spawnRocksSeqPos);
  spawnRocksSeqPos++;
  numberOfRocks++;

  while (!rested) {
    if (input[inputPos % input.length] === ">") {
      shape.moveRight(RIGHT_EDGE, chamber);
    } else {
      shape.moveLeft(LEFT_EDGE, chamber);
    }
    inputPos++;

    if (!shape.moveDown(chamber)) {
      shape.coordinates.forEach((coordinate) => {
        chamber.add(coordinate);
      });
      highestRock = Math.max(
        ...[...chamber.values()].map((v) => +v.split(",")[1])
      );
      rested = true;
    }
  }
} while (numberOfRocks < NUMBER_OF_ROCKS);

console.log("highest:" + highestRock);

console.timeEnd("time");

//debug
// for (let row = 25; row >= 0; row--) {
//   if (row === 0) {
//     console.log(" +  =  =  =  =  =  =  =  + ");
//     break;
//   }
//   let string = "";
//   for (let col = 0; col <= 8; col++) {
//     const test = col + "," + row;
//     if ([...chamber.values()].includes(test)) {
//       string += " @ ";
//     } else if (col === 0 || col === 8) {
//       string += " | ";
//     } else {
//       string += " . ";
//     }
//   }
//   console.log(string);
// }
