import "../css/style.css";
import goblinImg from "../img/goblin.png";

document.addEventListener("DOMContentLoaded", () => {
  // Game variables
  const boardSize = 4;
  const totalCells = boardSize * boardSize;
  const moveInterval = 2000;

  let currentPosition = null;

  const gameBoard = document.querySelector(".game-board");

  const goblin = document.createElement("img");

  goblin.classList.add("goblin");
  goblin.src = goblinImg;
  goblin.alt = "Goblin";

  for (let i = 0; i < totalCells; i += 1) {
    const cell = document.createElement("div");

    cell.classList.add("cell");
    cell.dataset.index = i;

    gameBoard.appendChild(cell);
  }

  const cells = Array.from(document.querySelectorAll(".cell"));

  function moveGoblin() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * totalCells);
    } while (newPosition === currentPosition);

    currentPosition = newPosition;

    cells[currentPosition].appendChild(goblin);
  }

  moveGoblin();

  setInterval(moveGoblin, moveInterval);
});
