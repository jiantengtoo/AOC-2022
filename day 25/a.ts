const input = await Deno.readTextFile("./input.txt");

const snafuSystem = {
  "=": -2,
  "-": -1,
  "0": 0,
  "1": 1,
  "2": 2,
} as const;

type snafuSystemKey = keyof typeof snafuSystem;

const convertFromSnafuToDecimal = (input: string): string => {
  let decimalAnswer = 0;

  [...input].reverse().forEach((char, index) => {
    decimalAnswer += 5 ** index * snafuSystem[char as snafuSystemKey];
  });

  return decimalAnswer.toString();
};

const convertFromDecimalToSnafu = (input: string): string => {
  let sanfu = "";
  let rem;

  let x = +input;

  while (x != 0) {
    rem = x % 5;
    x = (x - rem) / 5;

    switch (rem) {
      case 0:
        sanfu = "0" + sanfu;
        break;
      case 1:
        sanfu = "1" + sanfu;
        break;
      case 2:
        sanfu = "2" + sanfu;
        break;
      case 3:
        sanfu = "=" + sanfu;
        x++;
        break;
      case 4:
        sanfu = "-" + sanfu;
        x++;
        break;
    }
  }

  return sanfu;
};

const decimalAns = input.split(/\n/).reduce((prev, line) => {
  return prev + +convertFromSnafuToDecimal(line);
}, 0);

console.log(convertFromDecimalToSnafu(decimalAns.toString()));
