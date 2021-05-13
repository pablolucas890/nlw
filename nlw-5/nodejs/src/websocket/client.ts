import { io } from '../http';
import ConnectionService from '../services/ConnectionService';
import UserService from '../services/UsersService';
import MessagesService from '../services/MessagesService';

io.on('connect', (socket) => {
  const connectionService = new ConnectionService();
  const usersService = new UserService();
  const messagesService = new MessagesService();

  socket.on('client-first-access', async (params) => {
    const { text, email } = params;
    const socket_id = socket.id;
    let user_id = null;
    const userExists = await usersService.findByEmail(email);

    if (userExists) {
      const connection = await connectionService.findByUserId(userExists.id);
      user_id = userExists.id;

      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionService.create(connection);
      }
    } else {
      const user = await usersService.create(email);
      user_id = user.id;

      await connectionService.create({
        socket_id,
        user_id,
      });
    }

    await messagesService.create({
      text,
      user_id,
    });

    const AllMessages = await messagesService.listByUser(user_id);

    socket.emit('client-list-all-messages', AllMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();

    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;
    console.log(params);

    const socket_id = socket.id;
    const conn = await connectionService.findBySocketID(socket_id);
    let userEmail;
    if(conn?.user_id){
      userEmail = await usersService.findEmailById(conn.user_id);
    }
    if (conn) {
      const message = await messagesService.create({
        text,
        user_id: conn.user_id
      });

      io.to(socket_admin_id).emit('admin_receive_message', {
        message,
        socket_id,
        email: userEmail?.email
      });
    } else {
      console.log('error');
    }
  });
});
