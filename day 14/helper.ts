export const getSmallerBiggerNumber = (first: number, second: number) => {
  if (first > second) {
    return [second, first];
  }
  return [first, second];
};

export const getBtmCoordinates = (input: string) => {
  const [x, y] = input.split(",");
  return `${x},${+y + 1}`;
};

export const getBtmLeftCoordinates = (input: string) => {
  const [x, y] = input.split(",");
  return `${+x - 1},${+y + 1}`;
};

export const getBtmRightCoordinates = (input: string) => {
  const [x, y] = input.split(",");
  return `${+x + 1},${+y + 1}`;
};

export const getBtmCoordinates2 = (input: string, mostBottom: number) => {
  const [x, y] = input.split(",");
  if (+y + 1 === mostBottom) {
    return `*,${+y + 1}`;
  }
  return `${x},${+y + 1}`;
};

export const getBtmLeftCoordinates2 = (input: string, mostBottom: number) => {
  const [x, y] = input.split(",");
  if (+y + 1 === mostBottom) {
    return `*,${+y + 1}`;
  }
  return `${+x - 1},${+y + 1}`;
};

export const getBtmRightCoordinates2 = (input: string, mostBottom: number) => {
  const [x, y] = input.split(",");
  if (+y + 1 === mostBottom) {
    return `*,${+y + 1}`;
  }
  return `${+x + 1},${+y + 1}`;
};
