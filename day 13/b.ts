import { compare } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");
const listOfPackets = input.split(/\n/).filter((line) => line !== "");

const dividerA = "[[2]]";
const dividerB = "[[6]]";

const sorted = [...listOfPackets, dividerA, dividerB].sort((a, b) => {
  return compare(JSON.parse(b), JSON.parse(a));
});

const indexA = sorted.findIndex((v) => v === dividerA) + 1;
const indexB = sorted.findIndex((v) => v === dividerB) + 1;
console.log(indexA * indexB);
