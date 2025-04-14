import { setCurrentUser, initializeChat } from './chat.js';

export async function registerNickname() {
  const nickname = document.getElementById('nicknameInput').value.trim();
  if (!nickname) {
    document.getElementById('nicknameError').textContent = 'Please enter a nickname!';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/new-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nickname })
    });
    const result = await response.json();

    if (result.status === 'ok') {
      setCurrentUser(result.user);
      sessionStorage.setItem('currentUser', JSON.stringify(result.user));
      document.getElementById('nicknameModal').style.display = 'none';
      document.getElementById('chatContainer').style.display = 'flex';
      initializeChat();
    } else {
      document.getElementById('nicknameError').textContent = result.message;
    }
  } catch (error) {
    document.getElementById('nicknameError').textContent = 'Error connecting to server!';
  }
}
