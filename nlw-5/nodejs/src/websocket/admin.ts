import { io } from '../http';
import ConnectionServices from '../services/ConnectionService';
import MessagesService from '../services/MessagesService';

io.on('connect', async (socket) => {
  const connectionsService = new ConnectionServices();
  const messagesService = new MessagesService();
  const allConnWitoutAdmin = await connectionsService.findAllWithoutAdmin();

  io.emit('admin_list_all_users', allConnWitoutAdmin);

  socket.on('admin_list_messages_by_user', async (user_id, callback) => {
    const allMessages = await messagesService.listByUser(user_id);
    console.log(allMessages);
    callback(allMessages);
  });

  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const connection = await connectionsService.findByUserId(user_id);
    if (connection) {
      io.to(connection.socket_id).emit('admin_send_to_client', {
        text,
        socket_id: socket.id,
      });
    }
  });
  socket.on('admin_user_in_support', async (params) => {
    console.log('oá', params);
    await connectionsService.updateAdminID(params, socket.id);

    const allConnWitoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit('admin_list_all_users', allConnWitoutAdmin);
  });
});
