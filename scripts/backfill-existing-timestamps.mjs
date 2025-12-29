import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

const sourceTz = process.env.SOURCE_TZ || 'UTC';
const assumedTzEnv = process.env.ASSUMED_TZ;
const dryRun = process.env.DRY_RUN === 'true';

const db = postgres(databaseUrl, { max: 1 });

const tables = [
  { name: 'users', columns: ['created_at', 'updated_at'] },
  {
    name: 'boards',
    columns: ['created_at', 'updated_at', 'expiration_date'],
  },
  { name: 'board_moderators', columns: ['created_at', 'updated_at'] },
  {
    name: 'posts',
    columns: [
      'created_at',
      'updated_at',
      'moderated_at',
      'delete_scheduled_date',
    ],
  },
  { name: 'notifications', columns: ['created_at', 'updated_at'] },
];

const getDbTimezone = async () => {
  const [row] = await db`select current_setting('TIMEZONE') as tz`;
  return row?.tz ?? 'UTC';
};

const buildUpdate = (table, columns) => {
  const setClause = columns
    .map(
      (col) => `"${col}" = ("${col}" AT TIME ZONE $1) AT TIME ZONE $2`,
    )
    .join(', ');
  return `update "${table}" set ${setClause}`;
};

const main = async () => {
  const assumedTz = assumedTzEnv || (await getDbTimezone());

  console.log(`Assumed TZ: ${assumedTz}`);
  console.log(`Source TZ: ${sourceTz}`);

  if (assumedTz === sourceTz) {
    console.log('Assumed/source timezones match; no changes applied.');
    return;
  }

  await db.begin(async (tx) => {
    for (const table of tables) {
      const sql = buildUpdate(table.name, table.columns);
      if (dryRun) {
        console.log(`[DRY_RUN] ${sql}`);
      } else {
        await tx.unsafe(sql, [assumedTz, sourceTz]);
        console.log(`Updated ${table.name}`);
      }
    }
  });
};

try {
  await main();
} catch (error) {
  console.error('Backfill failed:', error);
  process.exitCode = 1;
} finally {
  await db.end({ timeout: 5 });
}
