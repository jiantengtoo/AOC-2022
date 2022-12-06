import { checkCharactersUnique } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

const numberOfChar = 4;

let i = numberOfChar;

let result = -1;

do {
  const segment = input.substring(i - numberOfChar, i);

  if (checkCharactersUnique(segment)) {
    result = i;
  }

  i++;
} while (result === -1);

console.log(result);
