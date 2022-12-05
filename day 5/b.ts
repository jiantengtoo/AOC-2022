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

  const movingContent = stacks[+from - 1].splice(
    stacks[+from - 1].length - +move
  );

  stacks[+to - 1].push(...movingContent);
};

instructions.split(/\n/).forEach((instruction) => {
  executeInstruction(instruction);
});

let result = "";

for (let i = 0; i < totalColumn; i++) {
  result += stacks[i][stacks[i].length - 1];
}

console.log(result);
