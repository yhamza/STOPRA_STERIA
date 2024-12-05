import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { InteractionEntity } from './interactions.entity';
import { StatisticsEntity } from './statistics.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' }) // Rôles possibles : ADMIN, ANALYST, USER
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;



}
