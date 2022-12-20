const input = await Deno.readTextFile("./input.txt");

const D_KEY = 811589153;

const arr = input.split(/\n/).map((number, index) => {
  return {
    index,
    number: +number * D_KEY,
  };
});

const SIZE = arr.length - 1;

const moveNumber = (index: number) => {
  const oldIndex = arr.findIndex((element) => {
    return element.index === index;
  });

  if (oldIndex === -1) throw Error;

  const [node] = arr.splice(oldIndex, 1);

  let newIndex = oldIndex + node.number;

  newIndex %= SIZE;

  if (newIndex < 0) {
    newIndex += SIZE;
  }
  arr.splice(newIndex, 0, node);
};

for (let i = 0; i < 10; i++) {
  input.split(/\n/).forEach((_, index) => {
    moveNumber(index);
  });
}

const zeroIndex = arr.findIndex((element) => element.number === 0);

const oneThousand = (zeroIndex + 1000) % arr.length;
const twoThousand = (zeroIndex + 2000) % arr.length;
const threeThousand = (zeroIndex + 3000) % arr.length;

const result =
  arr[oneThousand].number + arr[twoThousand].number + arr[threeThousand].number;

console.log(result);
