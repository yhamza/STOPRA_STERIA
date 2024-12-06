import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('cache')
export class CacheEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  userId: string; 

  @Column('jsonb')
  value: { action: string; category: string; time: string }[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; 
}
