import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';

@Entity('interactions')
export class InteractionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string; 

  @Column()
  action: string; 

  
  @Column()
  category: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date; 

  
}

