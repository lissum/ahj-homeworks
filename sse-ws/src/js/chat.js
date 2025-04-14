import { updateUserList, displayMessage } from './ui.js';

let ws;
let currentUser = null;

export function setCurrentUser(user) {
  currentUser = user;
}

export function initializeChat() {
  ws = new WebSocket('ws://localhost:3000');

  ws.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (Array.isArray(data)) {
      updateUserList(data);
    } else {
      displayMessage(data, currentUser);
    }
  };

  ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
    if (currentUser) {
      ws.send(JSON.stringify({
        type: 'exit',
        user: currentUser
      }));
    }
  };

  window.onbeforeunload = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'exit',
        user: currentUser
      }));
      ws.close();
    }
  };
}

export function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (!message) return;

  const messageData = {
    type: 'send',
    message: message,
    user: currentUser
  };

  ws.send(JSON.stringify(messageData));
  messageInput.value = '';
}
