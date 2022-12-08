const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const noOfRows = inputArr.length;

const noOfCols = inputArr[0].length;

const result: number[] = [];

for (let row = 1; row < noOfRows - 1; row++) {
  for (let col = 1; col < noOfCols - 1; col++) {
    const treeHeight = inputArr[row][col];

    // check top
    let topVisible = true;
    let topViewable = 0;
    for (let t = row - 1; t >= 0; t--) {
      topViewable++;
      if (+inputArr[t][col] >= +treeHeight) {
        topVisible = false;
        break;
      }
    }

    // check btm
    let btmVisible = true;
    let btmViewable = 0;
    for (let b = row + 1; b < noOfRows; b++) {
      btmViewable++;
      if (+inputArr[b][col] >= +treeHeight) {
        btmVisible = false;
        break;
      }
    }

    // check left
    let leftVisible = true;
    let leftViewable = 0;
    for (let l = col - 1; l >= 0; l--) {
      leftViewable++;
      if (+inputArr[row][l] >= +treeHeight) {
        leftVisible = false;
        break;
      }
    }

    // check right
    let rightVisible = true;
    let rightViewable = 0;
    for (let r = col + 1; r < noOfCols; r++) {
      rightViewable++;
      if (+inputArr[row][r] >= +treeHeight) {
        rightVisible = false;
        break;
      }
    }

    if (topVisible || btmVisible || leftVisible || rightVisible) {
      result.push(topViewable * btmViewable * leftViewable * rightViewable);
    }
  }
}

console.log(Math.max(...result));
