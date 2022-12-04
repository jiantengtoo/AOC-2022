const input = await Deno.readTextFile("./input.txt");

// 1. group first 3
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

let firstPart = new Set<string>();
let secondPart = new Set<string>();
let thirdPart = new Set<string>();

const result = array.reduce((prev, curr, index) => {
  if (index % 3 === 0) {
    firstPart = new Set(Array.from(curr));

    return prev;
  }
  if ((index - 1) % 3 === 0) {
    secondPart = new Set(Array.from(curr));

    return prev;
  }
  thirdPart = new Set(Array.from(curr));
  const intersect = [...firstPart].filter(
    (x) => secondPart.has(x) && thirdPart.has(x)
  );

  return prev + calculatePriority(intersect[0]);
}, 0);

console.log(result);
