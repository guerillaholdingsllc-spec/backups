import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'varchar' }) market!: string;
  @Column({ type: 'varchar', default: 'ROOKIE' }) rank!: string;
  @Column({ type: 'decimal', default: 5 }) rating!: number;
  @Column({ type: 'jsonb', default: [] }) certifications!: string[];
  @Column({ type: 'jsonb', default: [] }) equipment!: string[];
  @Column({ type: 'varchar', default: 'OFFLINE' }) status!: 'ONLINE' | 'OFFLINE';
  @Column({ type: 'timestamptz', nullable: true }) cooldownUntil?: Date;
}

