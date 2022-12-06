const input = await Deno.readTextFile("./input.txt");

const checkCharactersUnique = (input: string): boolean => {
  return new Set(input).size == input.length;
};

let i = 3;

let result = -1;

do {
  const fourChar = input[i - 3] + input[i - 2] + input[i - 1] + input[i];

  if (checkCharactersUnique(fourChar)) {
    result = i + 1;
  }

  i++;
} while (result === -1);

console.log(result);
