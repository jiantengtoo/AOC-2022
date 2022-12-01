const input = await Deno.readTextFile("./input.txt");

const array = input.split(/\n\n/);

const sum = (i: string): number => {
  return i.split(/\n/).reduce((prev,curr) => {
    return prev + +curr;
  }, 0)
}

const answer = array.reduce((prev, curr) => {
  const elfCarrying = sum(curr);

  if (elfCarrying > prev) return elfCarrying;

  return prev;

}, 0)

console.log(answer);
