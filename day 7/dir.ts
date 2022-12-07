export class Dir {
  name: string;
  type: "directory" | "file";
  parent: Dir | "root";
  children: Array<Dir>;
  fileSize?: number;

  constructor(
    name: string,
    parent: Dir | "root",
    type: "directory" | "file",
    size?: number
  ) {
    this.name = name;
    this.type = type;
    this.parent = parent;
    this.children = [];
    if (type === "file") {
      this.fileSize = size;
    }
  }

  setChild(input: Dir) {
    if (this.type === "directory") {
      const notExist =
        this.children.filter((x) => x.name === input.name).length === 0;
      if (notExist) this.children.push(input);
    }
  }

  getDirSize(): number {
    if (this.type === "directory") {
      return this.children.reduce((prev, curr) => {
        if (curr.type === "file") {
          return prev + (curr.fileSize ?? 0);
        }
        return prev + curr.getDirSize();
      }, 0);
    }
    return this.fileSize ?? 0;
  }
}
