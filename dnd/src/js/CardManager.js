export default class CardManager {
  constructor(board) {
    this.board = board;
  }

  attachEventListeners() {
    this.attachAddCardListeners();
    this.attachDeleteCardListeners();
    this.attachDragAndDropListeners();
  }

  attachAddCardListeners() {
    document.querySelectorAll(".add-card-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const column = e.target.closest(".column");
        const form = column.querySelector(".add-card-form");
        const addBtn = column.querySelector(".add-card-btn");
        addBtn.style.display = "none";
        form.style.display = "block";
        form.querySelector("textarea").focus();
      });
    });

    document.querySelectorAll(".submit-card-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const column = e.target.closest(".column");
        const columnId = column.dataset.columnId;
        const textarea = column.querySelector("textarea");
        const text = textarea.value.trim();
        if (text) {
          const newCard = { id: Date.now().toString(), text };
          this.board.state[columnId].push(newCard);
          this.board.saveState();
          this.board.render();
        }
        this.hideForm(column);
      });
    });

    document.querySelectorAll(".cancel-card-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const column = e.target.closest(".column");
        this.hideForm(column);
      });
    });
  }

  hideForm(column) {
    const form = column.querySelector(".add-card-form");
    const addBtn = column.querySelector(".add-card-btn");
    form.style.display = "none";
    addBtn.style.display = "block";
    column.querySelector("textarea").value = "";
  }

  attachDeleteCardListeners() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const cardElement = e.target.closest(".card");
        const cardId = cardElement.dataset.cardId;
        const column = cardElement.closest(".card-list").dataset.column;
        this.board.state[column] = this.board.state[column].filter(
          (card) => card.id !== cardId,
        );
        this.board.saveState();
        this.board.render();
      });
    });
  }

  attachDragAndDropListeners() {
    let draggedCard = null;
    let offsetX, offsetY;
    let placeholder = null;

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("dragstart", (e) => {
        draggedCard = card;
        draggedCard.classList.add("dragging");
        setTimeout(() => (card.style.display = "none"), 0);

        const rect = card.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      });

      card.addEventListener("dragend", () => {
        draggedCard.style.display = "block";
        draggedCard.classList.remove("dragging");
        draggedCard = null;
        if (placeholder) {
          placeholder.remove();
          placeholder = null;
        }
      });
    });

    document.querySelectorAll(".card-list").forEach((cardList) => {
      cardList.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!draggedCard) return;

        const allCards = [...cardList.querySelectorAll(".card:not(.dragging)")];
        const closestCard = allCards.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = e.clientY - (box.top + box.height / 2);
            if (offset < 0 && offset > closest.offset) {
              return { offset, element: child };
            }
            return closest;
          },
          { offset: Number.NEGATIVE_INFINITY, element: null },
        ).element;

        if (placeholder) placeholder.remove();
        placeholder = document.createElement("div");
        placeholder.classList.add("card-placeholder");
        placeholder.style.height = `${draggedCard.offsetHeight}px`;

        if (closestCard) {
          cardList.insertBefore(placeholder, closestCard);
        } else {
          cardList.appendChild(placeholder);
        }
      });

      cardList.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!draggedCard) return;

        const sourceColumn = draggedCard.closest(".card-list").dataset.column;
        const targetColumn = cardList.dataset.column;
        const cardId = draggedCard.dataset.cardId;

        const cardData = this.board.state[sourceColumn].find(
          (card) => card.id === cardId,
        );
        this.board.state[sourceColumn] = this.board.state[sourceColumn].filter(
          (card) => card.id !== cardId,
        );

        const allCards = [...cardList.querySelectorAll(".card:not(.dragging)")];
        const closestCard = allCards.find(
          (card) => card.nextSibling === placeholder,
        );
        const insertIndex = closestCard
          ? this.board.state[targetColumn].findIndex(
              (card) => card.id === closestCard.dataset.cardId,
            ) + 1
          : this.board.state[targetColumn].length;
        this.board.state[targetColumn].splice(insertIndex, 0, cardData);

        this.board.saveState();
        this.board.render();
      });
    });
  }
}
