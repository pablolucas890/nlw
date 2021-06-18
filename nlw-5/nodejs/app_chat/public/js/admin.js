const socket = io();
let connections = [];

socket.on('admin_list_all_users', (all_connections) => {
  connections = all_connections;
  document.getElementById('list_users').innerHTML = '';

  const template = document.getElementById('template').innerHTML;
  all_connections.forEach((conn) => {
    const rendered = Mustache.render(template, {
      email: conn.user.email,
      id: conn.socket_id,
    });

    document.getElementById('list_users').innerHTML += rendered;
  });
});

function call(id) {
  const connection = connections.find((connection) => connection.socket_id === id);

  const template = document.getElementById('admin_template').innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id,
  });

  document.getElementById('supports').innerHTML += rendered;

  socket.emit('admin_user_in_support', connection.user_id);
  socket.emit('admin_list_messages_by_user', connection.user_id, (messages) => {
    const divMessages = document.getElementById(`allMessages${connection.user_id}`);

    messages.forEach((message) => {
      const createDiv = document.createElement('div');

      if (message.admin_id === null) {
        createDiv.className = 'admin_message_client';

        createDiv.innerHTML = `<span><b>${connection.user.email}</b><br><br>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at)
          .format('DD/MM/YYYY HH:mm:ss')}</span>`;
      } else {
        createDiv.className = 'admin_message_admin';

        createDiv.innerHTML = `<b><i>Atendente:</b></i><br><br><span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at)
          .format('DD/MM/AAA HH:mm:ss')}</span>`;
      }

      divMessages.appendChild(createDiv);
    });
  });
}

function sendMessage(id) {
  const text_message = document.getElementById(`send_message_${id}`);

  const params = {
    text: text_message.value,
    user_id: id,
  };
  socket.emit('admin_send_message', params);

  const divMessages = document.getElementById(`allMessages${id}`);
  const createDiv = document.createElement('div');
  createDiv.className = 'admin_message_admin';

  createDiv.innerHTML = `<b><i>Atendente:</b></i><br><br><span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs()
    .format('DD/MM/AAA HH:mm:ss')}</span>`;

  divMessages.appendChild(createDiv);
  text_message.value = '';
}
socket.on('admin_receive_message', (data) => {
  console.log(data);
  const divMessages = document.getElementById(`allMessages${data.message.user_id}`);
  const createDiv = document.createElement('div');

  createDiv.className = 'admin_message_client';

  createDiv.innerHTML = `<span><b>${data.email}</b><br><br>${data.message.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs(data.message.created_at)
    .format('DD/MM/YYYY HH:mm:ss')}</span>`;
  divMessages.appendChild(createDiv);
});
