import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// Configure connection with proper pooling and limits
const client = postgres(process.env.DATABASE_URL, {
  // Connection pool settings
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout in seconds

  // Prevent connection leaks
  max_lifetime: 60 * 30, // Close connections after 30 minutes

  // Enable connection reuse
  prepare: false, // Disable prepared statements for better connection reuse

  // Handle connection errors gracefully
  onnotice: () => {}, // Suppress notices

  // Transform column names from snake_case to camelCase
  transform: postgres.camel,
});

export const db = drizzle(client, { schema });

// Graceful shutdown handler
const gracefulShutdown = async () => {
  console.log('Closing database connections...');
  await client.end();
  console.log('Database connections closed.');
};

// Handle process termination
if (typeof process !== 'undefined') {
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('beforeExit', gracefulShutdown);
}

export * from './schema';
