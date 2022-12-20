const input = await Deno.readTextFile("./input.txt");

const arr = input.split(/\n/).map((number, index) => {
  return {
    index,
    number: +number,
  };
});
const SIZE = arr.length - 1;

const moveNumber = (index: number, number: number) => {
  if (number === 0) return;
  const oldIndex = arr.findIndex((element) => {
    return element.index === index && element.number === number;
  });

  if (oldIndex === -1) throw Error;

  const [node] = arr.splice(oldIndex, 1);

  let newIndex = oldIndex + node.number;

  newIndex %= SIZE;

  arr.splice(newIndex, 0, node);
};

input.split(/\n/).forEach((number, index) => {
  moveNumber(index, +number);
});

const zeroIndex = arr.findIndex((element) => element.number === 0);

const oneThousand = (zeroIndex + 1000) % arr.length;
const twoThousand = (zeroIndex + 2000) % arr.length;
const threeThousand = (zeroIndex + 3000) % arr.length;

const result =
  arr[oneThousand].number + arr[twoThousand].number + arr[threeThousand].number;

console.log(result);
