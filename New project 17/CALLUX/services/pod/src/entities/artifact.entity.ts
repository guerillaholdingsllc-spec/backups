import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pod_artifacts')
export class Artifact {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'uuid' }) callId!: string;
  @Column({ type: 'varchar' }) artifactType!: 'PHOTO' | 'SIGNATURE' | 'DOCUMENT';
  @Column({ type: 'varchar' }) s3Key!: string;
  @Column({ type: 'varchar' }) sha256!: string;
  @Column({ type: 'jsonb', nullable: true }) geo?: { lat: number; lng: number };
  @CreateDateColumn() capturedAt!: Date;
}

