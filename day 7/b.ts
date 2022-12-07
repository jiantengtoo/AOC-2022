import { Dir } from "./dir.ts";
import { createDirectories } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

// 1. create the file tree structure

const directories = createDirectories(input);

// 2. calculating size

const TOTAL_DISK_SPACE = 70000000;

const UNUSED_FOR_UPDATE = 30000000;

const freeSpace = TOTAL_DISK_SPACE - directories.getDirSize();

const spaceNeeded = UNUSED_FOR_UPDATE - freeSpace;

const recusiveGetSize = (tree: Dir): number[] => {
  return tree.children.reduce((prev, curr) => {
    if (curr.type === "directory") {
      const size = curr.getDirSize();
      if (size > spaceNeeded) {
        return [...prev, ...recusiveGetSize(curr), size];
      }
      return [...prev, ...recusiveGetSize(curr)];
    } else {
      return [...prev];
    }
  }, [] as number[]);
};

console.log(recusiveGetSize(directories).sort((a, b) => a - b)[0]);
