import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('statistics')
export class StatisticsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId : string

  @Column({ type: 'jsonb' })
  categoryBreakdown: {
      content_interaction: number;
      auth_interaction: number;
  };

  @Column({ type: 'jsonb' })
  actionBreakdown: {
      like: number;
      login: number;
  };

  @Column()
  totalInteractions: number;

  @Column({ type: 'timestamptz' })
  earliestInteraction: Date;

  @Column({ type: 'timestamptz' })
  latestInteraction: Date;

  @Column()
  uniqueActions: number;

  @Column()
  uniqueCategories: number;

  @Column()
  interactionsPerHour: number;
  
}
