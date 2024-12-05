import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('cache')
export class CacheEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID comme identifiant unique

  @Column()
  userId: string; // Référence à l'ID de l'utilisateur dans la table UserEntity

  @Column('text')
  value: [{actions:string , category : string , time : Date}]; // Valeur sérialisée contenant [{ action, timestamp }]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Date de création




}
