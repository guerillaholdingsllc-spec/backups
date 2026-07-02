import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUsers1700000000000 implements MigrationInterface {
  name = 'InitUsers1700000000000';

  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      create table users (
        id uuid primary key default gen_random_uuid(),
        email varchar not null unique,
        role varchar not null,
        org_id varchar,
        status varchar not null default 'ACTIVE',
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query('drop table users;');
  }
}

