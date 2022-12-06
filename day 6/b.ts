const input = await Deno.readTextFile("./input.txt");

const checkCharactersUnique = (input: string): boolean => {
  return new Set(input).size == input.length;
};

let i = 13;

let result = -1;

do {
  const fourteenChar =
    input[i - 13] +
    input[i - 12] +
    input[i - 11] +
    input[i - 10] +
    input[i - 9] +
    input[i - 8] +
    input[i - 7] +
    input[i - 6] +
    input[i - 5] +
    input[i - 4] +
    input[i - 3] +
    input[i - 2] +
    input[i - 1] +
    input[i];

  if (checkCharactersUnique(fourteenChar)) {
    result = i + 1;
  }

  i++;
} while (result === -1);

console.log(result);
