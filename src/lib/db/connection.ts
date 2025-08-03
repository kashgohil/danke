import { db } from './index';

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.execute('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

export function getDatabaseStats() {
  return {
    timestamp: new Date().toISOString(),
    status: 'connected',
  };
}
