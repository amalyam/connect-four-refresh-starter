"use strict";
const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " "],
    ];

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("t", "test command (remove)", ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    let emptyGrid = grid.every((row) => row.every((space) => space === " "));
    let fullGrid = grid.every((row) => row.every((space) => space !== " "));

    if (emptyGrid) {
      return false;
    } else if (ConnectFour.horizontalCheck(grid)) {
      return ConnectFour.horizontalCheck(grid);
    } else if (ConnectFour.verticalCheck(grid)) {
      return ConnectFour.verticalCheck(grid);
    } else if (ConnectFour.diagonalCheck(grid)) {
      return ConnectFour.diagonalCheck(grid);
    } else if (fullGrid) {
      return "T";
    } else {
      return false;
    }
  }

  static horizontalCheck(grid) {
    for (let row of grid) {
      let result = row.reduce((accumulator, value) => {
        if (accumulator.length === 4) {
          return accumulator;
        }
        return (
          value + (value !== " " && accumulator[0] === value ? accumulator : "")
        );
      }, "");
      if (result.length === 4) {
        return result[0];
      }
    }
  }

  static verticalCheck(grid) {
    for (let y = 0; y <= 3; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] !== " ") {
          if (
            [...new Array(3)].every((_, i) => grid[y + i + 1][x] === grid[y][x])
          ) {
            return grid[y][x];
          }
        }
      }
    }
    return false;
  }

  static diagonalCheck(grid) {
    // NW -> SE check ("downward wins")
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 4; x++) {
        if (grid[y][x] !== " ") {
          if (
            [...new Array(3)].every(
              (_, i) => grid[y + i + 1][x + i + 1] === grid[y][x]
            )
          ) {
            return grid[y][x];
          }
        }
      }
    }

    //NE -> SW check ("upward wins")
    for (let y = 0; y < 3; y++) {
      for (let x = 6; x >= 3; x--) {
        if (grid[y][x] !== " ") {
          if (
            [...new Array(3)].every(
              (_, i) => grid[y + i + 1][x - i - 1] === grid[y][x]
            )
          ) {
            return grid[y][x];
          }
        }
      }
    }
    return false;
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = ConnectFour;
