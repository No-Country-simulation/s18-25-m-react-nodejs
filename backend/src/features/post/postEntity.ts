import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/emtities/userEntity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  content: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;
}
