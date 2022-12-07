import { Dir } from "./dir.ts";

const LS_REGEX = /\$ ls/;

const CD_REGEX = /\$ cd (?<dir>.+)/;

const DIR_REGEX = /dir (?<dir>.+)/;

const FILE_REGEX = /(?<size>[0-9]+) (?<name>.+)/;

export const createDirectories = (input: string): Dir => {
  const rootDirectree: Dir = new Dir("/", "root", "directory");

  let currentDir: Dir = rootDirectree;

  input.split(/\n/).forEach((line) => {
    if (line.match(CD_REGEX)) {
      const dir = line.match(CD_REGEX)?.groups?.dir as string;

      if (dir === "/") {
        currentDir = rootDirectree;
      } else if (dir === "..") {
        if (currentDir.parent === "root") {
          currentDir = rootDirectree;
        } else {
          currentDir = currentDir.parent;
        }
      } else {
        currentDir.setChild(new Dir(dir, currentDir, "directory"));
        currentDir = currentDir.children.filter((x) => x.name === dir)[0];
      }
    }

    if (line.match(LS_REGEX)) {
      return;
    }

    if (line.match(DIR_REGEX)) {
      const dir = line.match(DIR_REGEX)?.groups?.dir as string;

      currentDir.setChild(new Dir(dir, currentDir, "directory"));
    }

    if (line.match(FILE_REGEX)) {
      const { name, size } = line.match(FILE_REGEX)?.groups as {
        name: string;
        size: string;
      };

      currentDir.setChild(new Dir(name, currentDir, "file", +size));
    }
  });

  return rootDirectree;
};
