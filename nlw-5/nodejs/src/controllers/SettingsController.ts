import { Request, Response } from 'express';
import SettingsService from '../services/SettingsService';

export default class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.create({ chat, username });

      return response.status(200).json(settings);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }

  async findByUserName(request: Request, response: Response) {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const setting = await settingsService.findByUserName(username);

    return response.json(setting);
  }

  async update(request: Request, response: Response) {
    const settingsService = new SettingsService();

    const setting = await settingsService.update(request.params.username, request.body.chat);

    return response.json(setting);
  }
}
