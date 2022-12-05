// get total column
export const getTotalColumn = (input: string): number => {
  const indexLayer = input.split(" ").filter(Boolean);

  return +indexLayer[indexLayer.length - 1];
};

// process drawing into stacks
export const processDrawingToStacks = (
  input: string,
  totalColumn: number
): Array<Array<string>> => {
  const inputArr = input.split(/\n/);

  // todo: make array of array dynamic
  const result: Array<Array<string>> = [[], [], [], [], [], [], [], [], []];

  for (let i = inputArr.length - 2; i > -1; i--) {
    for (let j = 0; j < totalColumn; j++) {
      const itemIndex = j * 4 + 1;

      const item = inputArr[i].charAt(itemIndex);

      if (item !== " ") {
        result[j].push(inputArr[i].charAt(itemIndex));
      }
    }
  }

  return result;
};

export const capturingRegex =
  /move\s(?<move>\d{1,})\sfrom\s(?<from>\d{1,})\sto\s(?<to>\d{1,})/;
