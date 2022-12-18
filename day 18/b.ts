const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const totalSet = new Set<string>();

inputArr.forEach((cube) => {
  totalSet.add(cube);
});

let totalSurfaceArea = 0;

// bfs
const queue = ["0,0,0"];
const visited = new Set<string>();

const TOP_CONSTRAINT = 22;
const BTM_CONSTRAINT = -1;

const getNeighbours = (input: string) => {
  const [x, y, z] = input.split(",");
  const neighbours: string[] = [];

  if (+y + 1 <= TOP_CONSTRAINT) {
    const up = `${x},${+y + 1},${z}`;
    if (totalSet.has(up)) {
      totalSurfaceArea++;
    } else {
      neighbours.push(up);
    }
  }

  if (+y - 1 >= BTM_CONSTRAINT) {
    const down = `${x},${+y - 1},${z}`;
    if (totalSet.has(down)) {
      totalSurfaceArea++;
    } else {
      neighbours.push(down);
    }
  }

  if (+x + 1 <= TOP_CONSTRAINT) {
    const left = `${+x + 1},${y},${z}`;
    if (totalSet.has(left)) {
      totalSurfaceArea++;
    } else {
      neighbours.push(left);
    }
  }

  if (+x - 1 >= BTM_CONSTRAINT) {
    const right = `${+x - 1},${y},${z}`;
    if (totalSet.has(right)) {
      totalSurfaceArea++;
    } else {
      neighbours.push(right);
    }
  }

  if (+z + 1 <= TOP_CONSTRAINT) {
    const front = `${x},${y},${+z + 1}`;
    if (totalSet.has(front)) {
      totalSurfaceArea++;
    } else {
      neighbours.push(front);
    }
  }

  if (+z - 1 >= BTM_CONSTRAINT) {
    const back = `${x},${y},${+z - 1}`;
    if (totalSet.has(back)) {
      totalSurfaceArea++;
    } else {
      neighbours.push(back);
    }
  }

  return neighbours;
};

while (queue.length > 0) {
  const current = queue.shift();
  if (current && !visited.has(current)) {
    visited.add(current);

    getNeighbours(current).forEach((neighbour) => {
      queue.push(neighbour);
    });
  }
}

console.log(totalSurfaceArea);
