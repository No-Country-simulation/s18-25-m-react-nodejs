import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SocialNetworks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true, default: '' })
  github: string;

  @Column({ type: 'varchar', length: 150, nullable: true, default: '' })
  gitlab: string;

  @Column({ type: 'varchar', length: 150, nullable: true, default: '' })
  linkedin: string;

  @Column({ type: 'varchar', length: 150, nullable: true, default: '' })
  facebook: string;

  @Column({ type: 'varchar', length: 150, nullable: true, default: '' })
  instagram: string;

  @Column({ type: 'varchar', length: 150, nullable: true, default: '' })
  twitter: string;
}
