import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import {v4 as uuid} from "uuid";
import { User } from "./User";

@Entity("books")
export class Book {
  @PrimaryColumn()
  id!: string;

  @Column()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  release_date!: Date;

  @Column()
  created_at!: Date;

  constructor(){
    if(!this.id) this.id = uuid()
  }
}
