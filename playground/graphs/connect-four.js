/*
connect-4
[
  [ x,  x,  x,  x,  x,  x ]
  [ x,  x,  x,  x,  x,  x ]
  [ x,  x,  x,  x,  1,  x ]
  [ x,  x,  x,  1,  1,  x ]
  [ x,  x,  1,  1,  2,  x ]
  [ x,  1,  2,  2,  1,  2 ]
]

// validate line (check character, if next matches, keep going, otherwise restart. If 4 match, exit)
// 6 horizontal lines - check horizontal starting point: {row 0-5, col 0}
    // function to return an array of [[0, 0], [0, 1], [0, 2], [0, 3], etc]
    // function to return an array of [[1, 0], [1, 1], [1, 2], [1, 3], etc]
// 6 vertical lines - check vertical starting point: {row 0, col 0-5}
// 5 left-diagonals - check left diag 
// 5 right-diagonals - check right diag

*/

const graph = [
  [ "x",  "x",  "x",  "x",  "x",  "x" ]
  [ "x",  "x",  "x",  "x",  "x",  "x" ]
  [ "x",  "x",  "x",  "x",  "1",  "x" ]
  [ "x",  "x",  "x",  "1",  "1",  "x" ]
  [ "x",  "x",  "1",  "1",  "2",  "x" ]
  [ "x",  "1",  "2",  "2",  "1",  "2" ]
];

const findWinner = (board) => {
  // nested loop to traverse
  // for each node, give me path for node (of consecutive chars: 1/2)
  // if consecutive === 4 isAWinner
  // return value (1/2)
  let winner = undefined;
  for (let row = 0; row <= board.length; row++) {
    for (let col = 0; col <= board[row].length; col++) {
      if (board[row][col] === 'x') {
        continue;
      }
      winner = exploreBoard(board, [row, col]);
    }
  }
  return winner;
}

const getConsecutiveNeighbors = (acc, [r, c]) => {
  const isConsecutive = (
    acc.isConsecutive && board[r][c] === board[row][col]
  );
  return {
    isConsecutive,
    length: isConsecutive ? acc.length + 1 : acc.length
  };
}

const isDiagonalRight = (board, [row, col], neighbors1, neighbors2) => {
  // get topRight 3 neighbors
  const { length: topRightConsecutive } = getNeighbors(board, [row, col])
    .reduce(getConsecutiveNeighbors, { isConsecutive: true, length: 0 });
  const bottomLeftConsecutive = getNeighbors()
    .reduce(getConsecutiveNeighbors, { isConsecutive: true, length: 0 });
  return bottomLeftConsecutive + topRightConsecutive <= 3;
}


const exploreBoard = (board, [row, col]) => {
  if (isDiagonalRight(board, [row, col])) {
    return board[row][col];
  }
  if (isDiagonalLeft(board, [row, col])) {
    return board[row][col];
  }
  if (isVertical(board, [row, col])) {
    return board[row][col];
  }
  if (isHorizontal(board, [row, col])) {
    return board[row][col];
  }
}

// is neighborInBounds?
const getNeighbors = (board, [row, col]) => {
  const neighbors = [];
  // row above
  if (row < board.length - 1) {
    neighbors.push([row + 1, col])
  }
  // bottom beneath
  if (row > 0) {
    neighbors.push([row - 1, col])
  }
  // col above
  if (col < board[row].length - 1) {
    neighbors.push([row, col + 1])
  }
  // col beneath   
  if (col > 0) {
    neighbors.push([row, col - 1])
  }
  // row above col left
  // row above col right
  // row beneath col left
  // row beneath col right

  return neighbors;
} 