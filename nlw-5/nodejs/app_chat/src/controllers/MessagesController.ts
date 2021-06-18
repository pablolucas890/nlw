import { Request, Response } from 'express';
import MessageService from '../services/MessagesService';

export default class MessagesControler {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;

    const messagesService = new MessageService();

    try {
      const message = await messagesService.create({ admin_id, text, user_id });

      return response.status(200).json(message);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }

  async showByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messagesService = new MessageService();

    const list = await messagesService.listByUser(id);
    return response.status(200).json(list);
  }
}
