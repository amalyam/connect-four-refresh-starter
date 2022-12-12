const ConnectFour = require("./connect-four");

let grid1 = [
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", "O"],
  [" ", " ", " ", " ", " ", "O", " "],
  [" ", " ", " ", " ", "O", " ", " "],
  [" ", " ", " ", "O", " ", " ", " "],
];

let grid2 = [
  ["X", "O", "X", "O", "X", "O", "X"],
  ["X", "O", "X", "O", "X", "O", "X"],
  ["O", "X", "O", "X", "O", "X", "O"],
  ["O", "X", "O", "X", "O", "X", "O"],
  ["O", "X", "O", "X", "O", "X", "O"],
  ["X", "O", "X", "O", "X", "O", "X"],
];

console.log(ConnectFour.diagonalCheck(grid1));
console.log(ConnectFour.diagonalCheck(grid2));
