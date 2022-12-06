export const checkCharactersUnique = (input: string): boolean => {
  return new Set(input).size == input.length;
};
