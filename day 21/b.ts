const input = await Deno.readTextFile("./input.txt");

const mappings = input.split(/\n/).map((line) => {
  const [name, ops] = line.split(": ");
  return {
    name,
    ops,
  };
});

type Mapping = typeof mappings;

const findValue = (
  mappings: Mapping,
  name: string,
  humanValue: number
): number => {
  if (name === "humn") return humanValue;

  const index = mappings.findIndex((obj) => {
    return obj.name === name;
  });

  if (isNaN(mappings[index].ops as unknown as number)) {
    const [first, operation, second] = mappings[index].ops.split(" ");

    switch (operation) {
      case "+":
        return (
          findValue(mappings, first, humanValue) +
          findValue(mappings, second, humanValue)
        );

      case "-":
        return (
          findValue(mappings, first, humanValue) -
          findValue(mappings, second, humanValue)
        );

      case "/":
        return (
          findValue(mappings, first, humanValue) /
          findValue(mappings, second, humanValue)
        );

      case "*":
        return (
          findValue(mappings, first, humanValue) *
          findValue(mappings, second, humanValue)
        );
      default:
        throw Error();
    }
  } else {
    return +mappings[index].ops;
  }
};

const haveHumn = (mappings: Mapping, name: string): boolean => {
  if (name === "humn") return true;

  const index = mappings.findIndex((obj) => {
    return obj.name === name;
  });

  if (isNaN(mappings[index].ops as unknown as number)) {
    const [first, _, second] = mappings[index].ops.split(" ");

    return haveHumn(mappings, first) || haveHumn(mappings, second);
  } else {
    return false;
  }
};

const root = mappings[mappings.findIndex((obj) => obj.name === "root")];

const [first, _, second] = root.ops.split(" ");

const theOneWithHuman = haveHumn(mappings, second) ? second : first;
const theOneWithoutHuman = haveHumn(mappings, second) ? first : second;

const theOneWithoutHumanValue = findValue(mappings, theOneWithoutHuman, 0);

let max = Number.MAX_VALUE;

let min = 0;

while (true) {
  const value = Math.round(min + (max - min) / 2);

  const result = findValue(mappings, theOneWithHuman, value);

  if (result === theOneWithoutHumanValue) {
    console.log("answer:" + value);
    console.log("break");
    break;
  }

  if (result > theOneWithoutHumanValue) {
    min = value;
  } else {
    max = value;
  }
}

console.log("done");
