import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('statistics')
export class StatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  feature: string; // Fonctionnalité analysée

  @Column('int')
  usageCount: number; // Nombre d'utilisations

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  calculatedAt: Date; // Date du calcul

  // Relation avec l'utilisateur
  @ManyToOne(() => UserEntity, (user) => user.statistics)
  user: UserEntity;
}
