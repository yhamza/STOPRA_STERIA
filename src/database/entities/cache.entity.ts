import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cache')
export class CacheEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string; // Clé du cache

  @Column('text')
  value: string; // Valeur sérialisée

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Date d'expiration
}
