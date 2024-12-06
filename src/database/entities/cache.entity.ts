import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('cache')
export class CacheEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID comme identifiant unique

  @Column()
  userId: string; // Référence à l'ID de l'utilisateur

  @Column('jsonb')
  value: { action: string; category: string; time: string }[]; // Tableau d'objets contenant l'action, la catégorie et le timestamp

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Date de création automatique
}
