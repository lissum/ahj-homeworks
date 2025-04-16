export default class GameBoard {
  constructor(size) {
    this.size = size;
    this.totalCells = size * size;
    this.boardElement = document.querySelector(".game-board");
    this.cells = [];
    this.createBoard();
  }

  createBoard() {
    for (let i = 0; i < this.totalCells; i += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      this.boardElement.append(cell);
    }
    this.cells = Array.from(document.querySelectorAll(".cell"));
  }

  getCell(index) {
    return this.cells[index];
  }

  getAllCells() {
    return this.cells;
  }

  getCellsCount() {
    return this.totalCells;
  }
}
