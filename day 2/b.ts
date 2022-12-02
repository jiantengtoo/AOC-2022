const input = await Deno.readTextFile("./input.txt");

// A rock, B paper, C scissors
// X lose, Y draw, Z win

// score: 1 rock, 2 paper, 3 scissors
// 0 lost, 3 draw, 6 won

const scoring = {
  "A X": 0 + 3,
  "A Y": 3 + 1,
  "A Z": 6 + 2,
  "B X": 0 + 1,
  "B Y": 3 + 2,
  "B Z": 6 + 3,
  "C X": 0 + 2,
  "C Y": 3 + 3,
  "C Z": 6 + 1,
} as const;

const array = input.split(/\n/);

const total = array.reduce((prev, curr) => {
  return prev + scoring[curr as keyof typeof scoring];
}, 0);

console.log(total);
