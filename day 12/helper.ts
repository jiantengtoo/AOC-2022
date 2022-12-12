const alphabet = "abcdefghijklmnopqrstuvwxyz";

const convertStartAndEnd = (input: string) => {
  if (input === "S") {
    return "a";
  }
  if (input === "E") {
    return "z";
  }
  return input;
};

export const checkIfConnected = (src: string, dst: string) => {
  const dstValue = alphabet.indexOf(convertStartAndEnd(dst));
  const srcValue = alphabet.indexOf(convertStartAndEnd(src));

  return dstValue <= srcValue + 1;
};
