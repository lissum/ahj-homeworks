export default class StorageManager {
  static saveState(state) {
    localStorage.setItem("boardState", JSON.stringify(state));
  }

  static loadState() {
    return (
      JSON.parse(localStorage.getItem("boardState")) || {
        todo: [
          { id: "1", text: "Welcome to Trello!" },
          { id: "2", text: "This is a card." },
          { id: "3", text: "Click on a card to see what’s behind it." },
        ],
        "in-progress": [
          {
            id: "4",
            text: "Drag people onto a card to indicate that they’re responsible for it.",
          },
          { id: "5", text: "Use color-coded labels for organization." },
          { id: "6", text: "Make as many lists as you need!" },
          { id: "7", text: "Try dragging cards anywhere." },
        ],
        done: [
          { id: "8", text: "To learn more tricks, check out the guide." },
          { id: "9", text: "Use as many boards as you want. We’ll make more!" },
          { id: "10", text: "Want to use keyboard shortcuts? We have them!" },
        ],
      }
    );
  }
}
