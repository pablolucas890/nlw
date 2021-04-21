import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
export default class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}
