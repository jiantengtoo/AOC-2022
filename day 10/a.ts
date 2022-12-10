const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const xArr = [1];

inputArr.forEach((instruction) => {
  if (instruction === "noop") {
    xArr.push(xArr[xArr.length - 1]);
  }
  if (instruction.startsWith("addx")) {
    const [_, value] = instruction.split(" ");

    xArr.push(xArr[xArr.length - 1]);
    xArr.push(xArr[xArr.length - 1] + +value);
  }
});

const cyclesThatMatters = [20, 60, 100, 140, 180, 220];

let result = 0;

cyclesThatMatters.forEach((cycle) => {
  result += xArr[cycle - 1] * cycle;
});

console.log("result: " + result);
