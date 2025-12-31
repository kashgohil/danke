import { config } from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import postgres from 'postgres';
import { fileURLToPath } from 'url';

config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

const MIGRATION_MILLIS = 1767012405746;
const MIGRATION_TAG = '0009_many_loki';
const MIGRATION_HASH = 'manual-baseline-0009_many_loki';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationPath = path.resolve(
  __dirname,
  '../drizzle/0009_many_loki.sql',
);

const db = postgres(databaseUrl, { max: 1 });

const ensureMigrationsTable = async () => {
  await db`create schema if not exists drizzle`;
  await db`
    create table if not exists drizzle.__drizzle_migrations (
      id serial primary key,
      hash text not null,
      created_at bigint
    )
  `;
};

const getLatestMigration = async () => {
  const [row] = await db`
    select hash, created_at
    from drizzle.__drizzle_migrations
    order by created_at desc
    limit 1
  `;
  return row;
};

const getPostsCreatedAtType = async () => {
  const [row] = await db`
    select data_type
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'posts'
      and column_name = 'created_at'
  `;
  return row?.data_type;
};

const runMigrationSql = async () => {
  const rawSql = await fs.readFile(migrationPath, 'utf8');
  const statements = rawSql
    .split('--> statement-breakpoint')
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await db.unsafe(statement);
  }
};

const recordMigration = async () => {
  await db`
    insert into drizzle.__drizzle_migrations ("hash", "created_at")
    values (${MIGRATION_HASH}, ${MIGRATION_MILLIS})
  `;
};

const main = async () => {
  await ensureMigrationsTable();

  const latest = await getLatestMigration();
  if (latest?.created_at && Number(latest.created_at) >= MIGRATION_MILLIS) {
    console.log(`Migration ${MIGRATION_TAG} already recorded.`);
    return;
  }

  const createdAtType = await getPostsCreatedAtType();
  if (!createdAtType) {
    throw new Error('Could not determine posts.created_at data type.');
  }

  if (createdAtType !== 'timestamp with time zone') {
    console.log('Applying timezone migration SQL...');
    await runMigrationSql();
  } else {
    console.log('Database already uses timestamp with time zone.');
  }

  await recordMigration();
  console.log(`Recorded migration ${MIGRATION_TAG}.`);
};

try {
  await main();
} catch (error) {
  console.error('Baseline/migration failed:', error);
  process.exitCode = 1;
} finally {
  await db.end({ timeout: 5 });
}
