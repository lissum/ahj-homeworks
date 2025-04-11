import StorageManager from './StorageManager.js';
import CardManager from './CardManager.js';

export class Board {
  constructor() {
    this.state = StorageManager.loadState();
    this.cardManager = new CardManager(this);
    this.render();
  }

  saveState() {
    StorageManager.saveState(this.state);
  }

  render() {
    const columns = ['todo', 'in-progress', 'done'];
    columns.forEach(column => {
      const cardList = document.querySelector(`.card-list[data-column="${column}"]`);
      cardList.innerHTML = '';
      this.state[column].forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('draggable', 'true');
        cardElement.setAttribute('data-card-id', card.id);
        cardElement.innerHTML = `
          <span>${card.text}</span>
          <button class="delete-btn">✕</button>
        `;
        cardList.appendChild(cardElement);
      });
    });
    this.cardManager.attachEventListeners();
  }
}
