import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAudit1700000000000 implements MigrationInterface {
  name = 'InitAudit1700000000000';

  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      create table audit_events (
        id uuid primary key default gen_random_uuid(),
        call_id uuid not null,
        actor_type varchar not null,
        actor_id varchar,
        event varchar not null,
        payload jsonb,
        hash varchar not null,
        prev_hash varchar,
        timestamp timestamptz default now()
      );
      create index idx_audit_call on audit_events(call_id, timestamp);
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query('drop table audit_events;');
  }
}

