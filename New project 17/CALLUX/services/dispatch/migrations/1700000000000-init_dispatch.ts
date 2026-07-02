import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDispatch1700000000000 implements MigrationInterface {
  name = 'InitDispatch1700000000000';

  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      create table calls (
        id uuid primary key default gen_random_uuid(),
        org_id varchar not null,
        origin_facility_id varchar not null,
        destination_name varchar not null,
        call_type varchar not null,
        market varchar not null,
        metadata jsonb,
        assigned_driver_id varchar,
        status varchar not null default 'OPEN',
        accepted_at timestamptz,
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      );
      create index idx_calls_org on calls(org_id);
      create index idx_calls_market_status on calls(market, status);

      create table drivers (
        id uuid primary key default gen_random_uuid(),
        market varchar not null,
        rank varchar not null default 'ROOKIE',
        rating decimal not null default 5,
        certifications jsonb not null default '[]'::jsonb,
        equipment jsonb not null default '[]'::jsonb,
        status varchar not null default 'OFFLINE',
        cooldown_until timestamptz
      );

      create table offers (
        id uuid primary key default gen_random_uuid(),
        call_id uuid not null,
        driver_id uuid not null,
        status varchar not null default 'SENT',
        expires_at timestamptz not null,
        created_at timestamptz default now()
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query('drop table offers; drop table drivers; drop table calls;');
  }
}

