import { coodinates } from "./types.ts";

export const checkIfTouching = (
  firstPos: coodinates,
  secondPos: coodinates
): boolean => {
  const surrounding = [
    { x: secondPos.x + 1, y: secondPos.y + 1 },
    { x: secondPos.x - 1, y: secondPos.y - 1 },
    { x: secondPos.x + 1, y: secondPos.y - 1 },
    { x: secondPos.x - 1, y: secondPos.y + 1 },

    { x: secondPos.x, y: secondPos.y + 1 },
    { x: secondPos.x + 1, y: secondPos.y },
    { x: secondPos.x - 1, y: secondPos.y },
    { x: secondPos.x, y: secondPos.y - 1 },

    { x: secondPos.x, y: secondPos.y },
  ];

  return surrounding.some((s) => s.x === firstPos.x && s.y === firstPos.y);
};
