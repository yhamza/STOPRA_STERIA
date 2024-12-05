import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('interactions')
export class InteractionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string; // Référence à UserEntity

  @Column()
  action: string; // Action réalisée par l'utilisateur

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date; // Date de l'interaction

  // Relation avec l'utilisateur
  @ManyToOne(() => UserEntity, (user) => user.interactions)
  user: UserEntity;
}
