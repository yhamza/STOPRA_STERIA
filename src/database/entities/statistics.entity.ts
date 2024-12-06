import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { IsJSON, IsString, IsNumber, IsDate } from 'class-validator';

@Entity('statistics')
export class StatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  @IsString()
  userId: string;

  @Column({ type: 'jsonb', nullable: false, default: '{}' })
  @IsJSON()
  categoryBreakdown: Record<string, number>;

  @Column({ type: 'jsonb', nullable: false, default: '{}' })
  @IsJSON()
  actionBreakdown: Record<string, number>;

  @Column({ type: 'int', nullable: false, default: 0 })
  @IsNumber()
  totalInteractions: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  @IsNumber()
  uniqueActions: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  @IsNumber()
  uniqueCategories: number;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  earliestInteraction: Date;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  latestInteraction: Date;

  @Column({ type: 'float', nullable: false, default: 0 })
  @IsNumber()
  interactionsPerHour: number;

  @Column({ type: 'jsonb', nullable: true })
  @IsJSON()
  additionalMetadata?: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  /**
   * Crée une nouvelle instance de StatisticsEntity à partir des statistiques brutes.
   * @param stats Objet contenant les données des statistiques.
   */
  static fromStatistics(stats: any): StatisticsEntity {
    const entity = new StatisticsEntity();
    entity.userId = stats.userId || 'unknown';
    entity.categoryBreakdown = stats.categoryBreakdown || {};
    entity.actionBreakdown = stats.actionBreakdown || {};
    entity.totalInteractions = stats.totalInteractions || 0;
    entity.uniqueActions = stats.uniqueActions || 0;
    entity.uniqueCategories = stats.uniqueCategories || 0;
    entity.earliestInteraction = stats.timespan?.earliest || new Date();
    entity.latestInteraction = stats.timespan?.latest || new Date();
    entity.interactionsPerHour = stats.interactionsPerHour?.perHour || 0;
    entity.additionalMetadata = stats.additionalMetadata || {};
    return entity;
  }
}
