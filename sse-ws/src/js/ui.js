export function updateUserList(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || {};

  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    const circle = document.createElement('div');
    circle.className = 'user-circle' + (user.id === currentUser.id ? ' you' : '');
    const name = document.createElement('span');
    name.textContent = user.id === currentUser.id ? 'You' : user.name;
    userDiv.appendChild(circle);
    userDiv.appendChild(name);
    userList.appendChild(userDiv);
  });
}

export function displayMessage(data, currentUser) {
  if (data.type !== 'send') return;

  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + (data.user.id === currentUser.id ? 'you' : 'other');

  const sender = document.createElement('div');
  sender.className = 'sender';
  sender.textContent = data.user.id === currentUser.id ? 'You' : data.user.name;

  const messageText = document.createElement('div');
  messageText.textContent = data.message;

  const timestamp = document.createElement('div');
  timestamp.className = 'timestamp';
  timestamp.textContent = new Date().toLocaleString();

  messageDiv.appendChild(sender);
  messageDiv.appendChild(messageText);
  messageDiv.appendChild(timestamp);
  chatMessages.appendChild(messageDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}
