import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pods')
export class Pod {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'uuid' }) callId!: string;
  @Column({ type: 'varchar', default: 'DRAFT' }) status!: 'DRAFT' | 'SUBMITTED' | 'REJECTED';
  @Column({ type: 'jsonb', nullable: true }) geo?: { lat: number; lng: number };
  @CreateDateColumn() createdAt!: Date;
}

