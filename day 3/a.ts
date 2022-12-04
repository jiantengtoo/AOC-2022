const input = await Deno.readTextFile("./input.txt");

// 1. split half
// 2. find intersect
// 3. calculate priority

const lowerCasePriorityOffset = 96 as const;
const upperCasePriorityOffset = 38 as const;

const isUpperCase = (input: string) => {
  return input.toUpperCase() === input;
};

const calculatePriority = (input: string): number => {
  if (isUpperCase(input)) {
    return input.charCodeAt(0) - upperCasePriorityOffset;
  }
  return input.charCodeAt(0) - lowerCasePriorityOffset;
};

const array = input.split(/\n/);

const result = array.reduce((prev, curr) => {
  const firstPart = new Set(Array.from(curr.slice(0, curr.length / 2)));
  const secondPart = new Set(Array.from(curr.slice(curr.length / 2)));

  const intersect = [...firstPart].filter((x) => secondPart.has(x));

  return prev + calculatePriority(intersect[0]);
}, 0);

console.log(result);
