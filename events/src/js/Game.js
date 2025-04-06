import GameBoard from "./GameBoard";
import Character from "./Character";
import goblinImg from "../img/goblin.png";
import hammerCursorImg from "../img/hammer.png";

export default class Game {
  constructor() {
    this.board = new GameBoard(4);
    this.goblin = new Character(goblinImg, "Goblin", "goblin");
    this.score = 0;
    this.missedCount = 0;
    this.maxMissed = 5;
    this.gameActive = true;
    this.appearanceTime = 1000; // 1 second
    this.nextMoveTimeout = null;
    this.scoreElement = document.querySelector(".js-score-value");
    this.missedElement = document.querySelector(".missed-value");
    this.gameOverElement = document.querySelector(".game-over");
    this.gameOverScoreElement = document.querySelector(".final-score");
    this.resetButton = document.querySelector(".reset-button");

    this.bindEvents();
    this.updateScoreDisplay();
    this.initCursor();
    this.startGame();
  }

  bindEvents() {
    this.board.getAllCells().forEach(cell => {
      cell.addEventListener("click", () => this.handleCellClick(cell));
    });

    if (this.resetButton) {
      this.resetButton.addEventListener("click", () => this.resetGame());
    }
  }

  initCursor() {
    // Add custom cursor to game board
    this.board.boardElement.style.cursor = `url(${hammerCursorImg}), auto`;
  }

  startGame() {
    this.moveGoblin();
  }

  moveGoblin() {
    if (!this.gameActive) return;

    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.board.getCellsCount());
    } while (newPosition === this.goblin.getPosition());

    this.goblin.setPosition(newPosition);
    this.board.getCell(newPosition).appendChild(this.goblin.getElement());

    // Clear any existing timeout
    if (this.nextMoveTimeout) {
      clearTimeout(this.nextMoveTimeout);
    }

    // Schedule next move
    this.nextMoveTimeout = setTimeout(() => {
      // Remove goblin from current cell if it's still there
      if (this.board.getCell(newPosition).contains(this.goblin.getElement())) {
        this.board.getCell(newPosition).removeChild(this.goblin.getElement());
        this.missedCount += 1;
        this.updateScoreDisplay();
        this.checkGameOver();
      }

      if (this.gameActive) {
        this.moveGoblin();
      }
    }, this.appearanceTime);
  }

  handleCellClick(cell) {
    if (!this.gameActive) return;

    const cellIndex = parseInt(cell.dataset.index, 10);

    // If clicked on the cell with goblin
    if (cellIndex === this.goblin.getPosition() &&
      cell.contains(this.goblin.getElement())) {
      cell.removeChild(this.goblin.getElement());
      this.score += 1;
      this.updateScoreDisplay();

      // Clear current timeout and move goblin immediately
      clearTimeout(this.nextMoveTimeout);
      this.moveGoblin();
    }
  }

  updateScoreDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
    if (this.missedElement) {
      this.missedElement.textContent = `${this.missedCount}/${this.maxMissed}`;
    }
  }

  checkGameOver() {
    if (this.missedCount >= this.maxMissed) {
      this.gameActive = false;
      this.showGameOver();
    }
  }

  showGameOver() {
    if (this.gameOverElement) {
      this.gameOverElement.classList.remove("hidden");
      if (this.gameOverScoreElement) {
        this.gameOverScoreElement.textContent = this.score;
      }
    } else {
      alert(`Game Over! Your score: ${this.score}`);
    }
  }

  resetGame() {
    this.score = 0;
    this.missedCount = 0;
    this.gameActive = true;

    // Remove goblin if it's on the board
    const currentCell = this.board.getCell(this.goblin.getPosition());
    if (currentCell && currentCell.contains(this.goblin.getElement())) {
      currentCell.removeChild(this.goblin.getElement());
    }

    // Clear any existing timeout
    if (this.nextMoveTimeout) {
      clearTimeout(this.nextMoveTimeout);
    }

    this.updateScoreDisplay();

    if (this.gameOverElement) {
      this.gameOverElement.classList.add("hidden");
    }

    this.startGame();
  }
}
