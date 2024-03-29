import { Router } from 'express';
import MessagesControler from './controllers/MessagesController';
import SettingsController from './controllers/SettingsController';
import UserController from './controllers/UsersController';

const routes = Router();
const settingsController = new SettingsController();
const usersController = new UserController();
const messagesController = new MessagesControler();

routes.post('/settings', settingsController.create);
routes.post('/users', usersController.create);
routes.post('/messages', messagesController.create);

routes.put('/settings/:username', settingsController.update);

routes.get('/messages/:id', messagesController.showByUser);
routes.get('/settings/:username', settingsController.findByUserName);
export default routes;
