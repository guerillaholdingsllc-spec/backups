import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPod1700000000000 implements MigrationInterface {
  name = 'InitPod1700000000000';

  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      create table pods (
        id uuid primary key default gen_random_uuid(),
        call_id uuid not null,
        status varchar not null default 'DRAFT',
        geo jsonb,
        created_at timestamptz default now()
      );
      create table pod_artifacts (
        id uuid primary key default gen_random_uuid(),
        call_id uuid not null,
        artifact_type varchar not null,
        s3_key varchar not null,
        sha256 varchar not null,
        geo jsonb,
        captured_at timestamptz default now()
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query('drop table pod_artifacts; drop table pods;');
  }
}

