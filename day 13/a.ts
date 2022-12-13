import { compare } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");
const listOfPairPackets = input.split(/\n\n/).map((line) => line.split(/\n/));

const result = listOfPairPackets.reduce((prev, pairPackets, index) => {
  const firstPair = JSON.parse(pairPackets[0]);
  const secondPair = JSON.parse(pairPackets[1]);

  const compareResult = compare(firstPair, secondPair);

  if (compareResult === 1) {
    return prev + index + 1;
  }
  return prev;
}, 0);

console.log(result);
