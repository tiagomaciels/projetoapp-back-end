import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  release_date!: Date;

  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: "user_id" })
  users!: User;

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
