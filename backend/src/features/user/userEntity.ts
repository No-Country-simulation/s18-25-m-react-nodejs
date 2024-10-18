import { Post } from '@/features/post/postEntity';
import { SocialNetworks } from '@/features/social_networks/socialNetworksEntity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/commentEntity';
import { Connection } from '../connection/ConnectionEntity';
import { UserProject } from '../userProject/userProjectEntity';

const defaultUserValue = '';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100, default: defaultUserValue })
  name: string;

  @Column({ type: 'varchar', length: 150, default: defaultUserValue })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  authId: string;

  @Column({ type: 'varchar', length: 150 })
  authName: string;

  @Column({ type: 'varchar', length: 150, default: defaultUserValue })
  token: string;

  @Column({ type: 'varchar', length: 100, default: defaultUserValue })
  role: string;

  @Column({ type: 'varchar', length: 150, default: defaultUserValue })
  avatar: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  job?: string;

  @OneToOne(() => SocialNetworks, { cascade: true })
  @JoinColumn()
  social_networks: SocialNetworks;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Connection, (connection) => connection.follower)
  followed: Connection[];

  @OneToMany(() => Connection, (connection) => connection.followed)
  followers: Connection[];

  @OneToMany(() => UserProject, (userProject) => userProject.user)
  projects: UserProject[];
}
