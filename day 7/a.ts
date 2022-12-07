import { Dir } from "./dir.ts";
import { createDirectories } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");

// 1. create the file tree structure

const directories = createDirectories(input);

// 2. calculating size

const recusiveGetSize = (tree: Dir): number => {
  return tree.children.reduce((prev, curr) => {
    if (curr.type === "directory") {
      const size = curr.getDirSize();
      if (size <= 100000) {
        return recusiveGetSize(curr) + prev + size;
      }
      return recusiveGetSize(curr) + prev;
    } else {
      return prev;
    }
  }, 0);
};

console.log(recusiveGetSize(directories));
