const input = await Deno.readTextFile("./input.txt");

const array = input.split(/\n\n/);

const sum = (i: string): number => {
  return i.split(/\n/).reduce((prev,curr) => {
    return prev + +curr;
  }, 0)
}

const sortedArr = array.reduce((prev, curr) => {
  const elfCarrying = sum(curr);

  return [...prev, elfCarrying];

}, [] as number[]).sort((a, b) => b - a)

console.log(sortedArr[0] + sortedArr[1] + sortedArr[2] );
