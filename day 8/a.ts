const input = await Deno.readTextFile("./input.txt");

const inputArr = input.split(/\n/);

const noOfRows = inputArr.length;

const noOfCols = inputArr[0].length;

let result = noOfRows + noOfRows + noOfCols + noOfCols - 4;

for (let row = 1; row < noOfRows - 1; row++) {
  for (let col = 1; col < noOfCols - 1; col++) {
    const treeHeight = inputArr[row][col];

    // check top
    let topVisible = true;
    for (let t = row - 1; t >= 0; t--) {
      if (+inputArr[t][col] >= +treeHeight) {
        topVisible = false;
        break;
      }
    }

    // check btm
    let btmVisible = true;
    for (let b = row + 1; b < noOfRows; b++) {
      if (+inputArr[b][col] >= +treeHeight) {
        btmVisible = false;
        break;
      }
    }

    // check left
    let leftVisible = true;
    for (let l = col - 1; l >= 0; l--) {
      if (+inputArr[row][l] >= +treeHeight) {
        leftVisible = false;
        break;
      }
    }

    // check right
    let rightVisible = true;
    for (let r = col + 1; r < noOfCols; r++) {
      if (+inputArr[row][r] >= +treeHeight) {
        rightVisible = false;
        break;
      }
    }

    if (topVisible || btmVisible || leftVisible || rightVisible) {
      result++;
    }
  }
}

console.log(result);
