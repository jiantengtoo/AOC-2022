const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const getSurfaceArea = (checkCube: string, setOfCubes: Set<string>) => {
  const [x, y, z] = checkCube.split(",");

  let surfaceArea = 6;

  const up = `${x},${+y + 1},${z}`;
  if (setOfCubes.has(up)) surfaceArea--;

  const down = `${x},${+y - 1},${z}`;
  if (setOfCubes.has(down)) surfaceArea--;

  const left = `${+x + 1},${y},${z}`;
  if (setOfCubes.has(left)) surfaceArea--;

  const right = `${+x - 1},${y},${z}`;
  if (setOfCubes.has(right)) surfaceArea--;

  const front = `${x},${y},${+z + 1}`;
  if (setOfCubes.has(front)) surfaceArea--;

  const back = `${x},${y},${+z - 1}`;
  if (setOfCubes.has(back)) surfaceArea--;

  return surfaceArea;
};

const totalSet = new Set<string>();

inputArr.forEach((cube) => {
  totalSet.add(cube);
});

let totalSurfaceArea = 0;

inputArr.forEach((cube) => {
  totalSurfaceArea += getSurfaceArea(cube, totalSet);
});

console.log(totalSurfaceArea);
