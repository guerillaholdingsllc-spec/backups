import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'uuid' }) callId!: string;
  @Column({ type: 'uuid' }) driverId!: string;
  @Column({ type: 'varchar', default: 'SENT' }) status!: 'SENT' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
  @Column({ type: 'timestamptz' }) expiresAt!: Date;
  @CreateDateColumn() createdAt!: Date;
}

