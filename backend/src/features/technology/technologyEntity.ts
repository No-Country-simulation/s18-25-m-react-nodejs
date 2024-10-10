import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Technology {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  name: number;

  @Column({ type: 'varchar', length: 120 })
  color: string;
}
