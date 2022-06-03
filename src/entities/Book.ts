import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("books")
export class Book {
  @PrimaryColumn()
  id!: number;

  @Column()
  user_id!: number;

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
}
