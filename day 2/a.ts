const input = await Deno.readTextFile("./input.txt");

// A rock, B paper, C scissors
// X rock, Y paper, Z scissors

// score: 1 rock, 2 paper, 3 scissors
// 0 lost, 3 draw, 6 won

const scoring = {
  "A X": 1 + 3,
  "A Y": 2 + 6,
  "A Z": 3 + 0,
  "B X": 1 + 0,
  "B Y": 2 + 3,
  "B Z": 3 + 6,
  "C X": 1 + 6,
  "C Y": 2 + 0,
  "C Z": 3 + 3,
} as const;

const array = input.split(/\n/);

const total = array.reduce((prev, curr) => {
  return prev + scoring[curr as keyof typeof scoring];
}, 0);

console.log(total);
