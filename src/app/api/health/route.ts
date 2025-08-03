import { checkDatabaseHealth, getDatabaseStats } from '@/lib/db/connection';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isHealthy = await checkDatabaseHealth();
    const stats = getDatabaseStats();

    if (!isHealthy) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          database: 'disconnected',
          stats,
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        database: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
