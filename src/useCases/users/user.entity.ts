import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  personId?: number;

  @Column({ nullable: false })
  name: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, default: true })
  actived: boolean;

  @Column({ type: 'timestamp', nullable: true, precision: null, default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamp', nullable: true, precision: null, default: null, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @Column({ type: 'timestamp', nullable: true, precision: null })
  lastLogin?: Date;
}
