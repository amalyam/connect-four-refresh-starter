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

    Screen.addCommand(
      "left",
      "move cursor left",
      this.cursor.left.bind(this.cursor)
    );

    Screen.addCommand(
      "right",
      "move cursor right",
      this.cursor.right.bind(this.cursor)
    );

    Screen.addCommand("return", "place move", ConnectFour.placeMove.bind(this));

    Screen.addCommand("r", "reset the game", ConnectFour.newGame);

    Screen.addCommand("q", "quit the game", Screen.quit);

    //do I need this here?
    this.cursor.setBackgroundColor();

    Screen.render();

    console.log(
      `Welcome to Connect Four! Drop Xs and Os into the board until you line up 4 of the same kind.\nPlayer ${this.playerTurn}'s move.`
    );
    Screen.printCommands();
  }

  static placeMove() {
    Screen.render();

    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      this.cursor.return(this.playerTurn);
      if (this.playerTurn === "O") {
        this.playerTurn = "X";
      } else if (this.playerTurn === "X") {
        this.playerTurn = "O";
      }

      Screen.render();
      let winner = ConnectFour.checkWin(Screen.grid);
      if (winner) {
        ConnectFour.endGame(winner);
      }
    } else {
      Screen.setMessage(
        "That space is already occupied. Choose another space."
      );
      Screen.render();
    }
    Screen.setMessage(`Player ${this.playerTurn}'s move.`);
    Screen.render();
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
    for (let y = 0; y <= 2; y++) {
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

  static newGame() {
    Screen.initialize(6, 7);
    Screen.render();
  }

  static endGame(winner) {
    Object.keys(Screen.commands).forEach((cmd) => {
      if (!["r", "q"].includes(cmd)) {
        Screen.pauseCommand(cmd);
      }
    });

    let playAgainMsg =
      "Would you like to play again? Press 'r' to reset the game or 'q' to quit.";

    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!\n${playAgainMsg}`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!\n${playAgainMsg}`);
    } else {
      Screen.setMessage(`Game Over\n${playAgainMsg}`);
    }
    Screen.render();
  }
}

module.exports = ConnectFour;
