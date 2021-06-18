import { EntityRepository, Repository } from 'typeorm';
import Message from '../entities/Messages';

@EntityRepository(Message)
export default class MessagesRepository extends Repository<Message> {

}
