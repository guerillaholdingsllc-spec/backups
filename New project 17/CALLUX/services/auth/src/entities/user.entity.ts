import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'varchar' }) email!: string;
  @Column({ type: 'varchar' }) role!: 'DRIVER' | 'VENDOR' | 'ADMIN' | 'DISPATCHER';
  @Column({ type: 'varchar', nullable: true }) orgId?: string;
  @Column({ type: 'varchar', default: 'ACTIVE' }) status!: 'ACTIVE' | 'SUSPENDED';
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}

