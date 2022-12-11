import { Monkey } from "./monkey.ts";

const input = await Deno.readTextFile("./input.txt");

const monkeysInput = input.split(/\n\n/);

// parse to monkey object
const monkeys = monkeysInput.map((monkeyText, index) => {
  const lines = monkeyText.split(/\n/);

  const items = lines[1]
    .split(": ")[1]
    .split(",")
    .map((i) => +i);

  const [operator, operand] = lines[2].split(" old ")[1].split(" ");

  const operationFn = (oldNumber: number) => {
    if (operator === "+") {
      return oldNumber + (operand === "old" ? oldNumber : +operand);
    }
    return oldNumber * (operand === "old" ? oldNumber : +operand);
  };

  const divisible = lines[3].split("divisible by ")[1];

  const trueMonkey = lines[4].split("If true: throw to monkey ")[1];
  const falseMonkey = lines[5].split("If false: throw to monkey ")[1];

  return new Monkey(
    index,
    items,
    operationFn,
    +divisible,
    +trueMonkey,
    +falseMonkey
  );
});

const ROUNDS = 20;

// monkey buisness
for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      monkey.inspected++;

      const newWorryLevel = Math.floor(monkey.operation(item) / 3);

      const divisible = newWorryLevel % monkey.testDivisible === 0;

      if (divisible) {
        monkeys[monkey.trueMonkey].items.push(newWorryLevel);
      } else {
        monkeys[monkey.falseMonkey].items.push(newWorryLevel);
      }
    });

    monkey.items = [];
  });
}

const sorted = monkeys.sort((a, b) => b.inspected - a.inspected);

console.log(sorted[0].inspected * sorted[1].inspected);
