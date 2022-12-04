const input = await Deno.readTextFile("./input.txt");

// convert number-number to array of numbers
const convertToNumberList = (input: string): number[] => {
  const [firstNumber, secondNumber] = input.split("-");

  const resultArr: number[] = [];

  for (let i = +firstNumber; i <= +secondNumber; i++) {
    resultArr.push(i);
  }

  return resultArr;
};

const arrayInput = input.split(/\n/);

const result = arrayInput.reduce((prev, curr) => {
  const [firstPair, secondPair] = curr.split(",");

  const firstNumberList = convertToNumberList(firstPair);
  const secondNumberList = convertToNumberList(secondPair);

  if (
    firstNumberList.some((x) => secondNumberList.includes(x)) ||
    secondNumberList.some((x) => firstNumberList.includes(x))
  ) {
    return prev + 1;
  }

  return prev;
}, 0);

console.log(result);
