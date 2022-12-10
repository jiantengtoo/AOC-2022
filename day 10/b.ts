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

const result: string[] = ["", "", "", "", "", "", ""];

xArr.forEach((x, index) => {
  const pixelToDraw = index + 1;
  const row = Math.ceil(pixelToDraw / 40) - 1;

  if ([x, x + 1, x + 2].includes(pixelToDraw - row * 40)) {
    result[row] = result[row] + "#";
  } else {
    result[row] = result[row] + ".";
  }
});

console.log(result);
