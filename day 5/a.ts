import {
  processDrawingToStacks,
  getTotalColumn,
  capturingRegex,
} from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

const [drawing, instructions] = input.split(/\n\n/);

const totalColumn = getTotalColumn(drawing);

const stacks = processDrawingToStacks(drawing, totalColumn);

const executeInstruction = (instruction: string) => {
  const [_, move, from, to] = instruction.match(
    capturingRegex
  ) as RegExpMatchArray;

  for (let i = 0; i < +move; i++) {
    const pop = stacks[+from - 1].pop();
    if (pop) stacks[+to - 1].push(pop);
  }
};

instructions.split(/\n/).forEach((instruction) => {
  executeInstruction(instruction);
});

let result = "";

for (let i = 0; i < totalColumn; i++) {
  result += stacks[i][stacks[i].length - 1];
}

console.log(result);
