import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CallType, Market } from '@callux/types';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Index()
  @Column({ type: 'varchar' }) orgId!: string;
  @Column({ type: 'varchar' }) originFacilityId!: string;
  @Column({ type: 'varchar' }) destinationName!: string;
  @Column({ type: 'varchar' }) callType!: CallType;
  @Column({ type: 'varchar' }) market!: Market;
  @Column({ type: 'jsonb', nullable: true }) metadata?: Record<string, unknown>;
  @Column({ type: 'varchar', nullable: true }) assignedDriverId?: string;
  @Column({ type: 'varchar', default: 'OPEN' }) status!: string;
  @Column({ type: 'timestamptz', nullable: true }) acceptedAt?: Date;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}

