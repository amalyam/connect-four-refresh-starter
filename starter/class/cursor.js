const Screen = require("./screen");
const ConnectFour = require("./connect-four");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = "black";
    this.cursorColor = "green";
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  left() {
    this.resetBackgroundColor();
    if (this.col > 0) {
      this.col--;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  right() {
    this.resetBackgroundColor();
    if (this.col < this.numCols - 1) {
      this.col++;
    }
    this.setBackgroundColor();
    Screen.render();
  }

  return(playerTurn) {
    this.resetBackgroundColor();
    this.setBackgroundColor();
    let openRow = Cursor.dropPiece(this.col);
    Screen.setGrid(openRow, this.col, playerTurn);
  }

  static dropPiece(col) {
    for (let r = 5; r >= 0; r--) {
      if (Screen.grid[r][col] === " ") {
        return r;
      }
    }
  }
}

module.exports = Cursor;
