import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Post } from "../post/postEntity";
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 255 })
    content: string;
  
    @Column()
    user_id: number;
  
    @Column()
    post_id: number;
  
    @CreateDateColumn({ type: "datetime" })
    created_at: Date;

    @ManyToOne(() => Post, post => post.id) 
    post: Post;
  }