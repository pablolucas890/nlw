import { getCustomRepository, Repository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

export default class UsersService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async findByEmail(email:string) {
    const userExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return userExists;
  }

  async create(email: string) {
    const userExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return userExists;
    }

    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async findEmailById(user_id: string){
    const userEmail = await this.usersRepository.findOne({
      where: {
        id: user_id
      },
    });
    return userEmail;
  }
}
