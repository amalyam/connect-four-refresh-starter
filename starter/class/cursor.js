const Screen = require("./screen");
const ConnectFour = require("./connect-four");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = "black";
    this.cursorColor = "yellow";
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  left() {
    if (this.col > 0) {
      this.col--;
    }
  }

  right() {
    if (this.col < this.numCols - 1) {
      this.col++;
    }
  }

  up() {
    if (this.row > 0) {
      this.row--;
    }
  }

  down() {
    if (this.row < this.numRows - 1) {
      this.row++;
    }
  }
}

module.exports = Cursor;
