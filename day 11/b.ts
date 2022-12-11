import { Monkey } from "./monkey.ts";
import { lcm } from "./helper.ts";

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

const divisibleLcm = monkeys.map((m) => m.testDivisible).reduce(lcm);

const ROUNDS = 10000;

// monkey buisness
for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      monkey.inspected++;

      /*
       * to prevent number going out of bound
       *
       * 1. given set of integers (a,b,c,...)
       * 2. X is divisible by subset(a,b,c,...)
       * 3. X % LCM(a,b,c,...) = Y
       * 4. Y is divisible by the same subset(a,b,c,...)
       */
      const newWorryLevel = monkey.operation(item) % divisibleLcm;

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
