const input = await Deno.readTextFile("./input.txt");

const mappings = input.split(/\n/).map((line) => {
  const [name, ops] = line.split(": ");
  return {
    name,
    ops,
  };
});

type Mapping = typeof mappings;

const findRoot = (mappings: Mapping, name: string): number => {
  const index = mappings.findIndex((obj) => {
    return obj.name === name;
  });

  if (isNaN(mappings[index].ops as unknown as number)) {
    const [first, operation, second] = mappings[index].ops.split(" ");

    switch (operation) {
      case "+":
        return findRoot(mappings, first) + findRoot(mappings, second);

      case "-":
        return findRoot(mappings, first) - findRoot(mappings, second);

      case "/":
        return findRoot(mappings, first) / findRoot(mappings, second);

      case "*":
        return findRoot(mappings, first) * findRoot(mappings, second);
      default:
        throw Error();
    }
  } else {
    return +mappings[index].ops;
  }
};

console.log(findRoot(mappings, "root"));
