import { getCustomRepository, Repository } from 'typeorm';
import Connection from '../entities/Connection';
import ConnectionRepository from '../repositories/ConnectionsRepository';

interface IConnectionCreate{
    socket_id : string;
    user_id : string;
    admin_id ?: string;
    id ?: string
}
export default class ConnectionServices {
  private connectionRepository: Repository<Connection>

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionRepository);
  }

  async create({
    socket_id, user_id, admin_id, id,
  }: IConnectionCreate) {
    const connection = this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const conn = await this.connectionRepository.findOne({ user_id });

    return conn;
  }

  async findAllWithoutAdmin() {
    const all_connections = await this.connectionRepository.find({
      where: {
        admin_id: null,
      },
      relations: ['user'],
    });

    return all_connections;
  }

  async findBySocketID(socket_id: string) {
    const conn = await this.connectionRepository.findOne({ socket_id });

    return conn;
  }

  async updateAdminID(user_id: string, admin_id: string) {
    await this.connectionRepository.createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }
}
