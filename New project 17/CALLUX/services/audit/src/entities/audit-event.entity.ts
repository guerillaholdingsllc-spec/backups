import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_events')
export class AuditEvent {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column('uuid') callId!: string;
  @Column('varchar') actorType!: 'DRIVER' | 'VENDOR' | 'ADMIN' | 'SYSTEM';
  @Column('varchar', { nullable: true }) actorId?: string;
  @Column('varchar') event!: string;
  @Column('jsonb', { nullable: true }) payload?: Record<string, unknown>;
  @Column('varchar') hash!: string;
  @Column('varchar', { nullable: true }) prevHash?: string;
  @CreateDateColumn() timestamp!: Date;
}

