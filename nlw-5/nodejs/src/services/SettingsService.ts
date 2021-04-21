import { getCustomRepository, Repository } from 'typeorm';
import Setting from '../entities/Settings';
import SettingsRepository from '../repositories/SettingsRepository';

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

export default class SettingsService {
  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username } : ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error('User Already Exists!!');
    }

    const settings = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }
}
