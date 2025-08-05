import { NextResponse } from 'next/server';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

export async function GET() {
  const services: ServiceStatus[] = [
    {
      name: 'Web Application',
      status: 'operational',
      uptime: 99.98,
      responseTime: 245,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'API Services',
      status: 'operational',
      uptime: 99.95,
      responseTime: 180,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: 99.99,
      responseTime: 12,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: 99.97,
      responseTime: 320,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'Real-time Updates',
      status: 'operational',
      uptime: 99.94,
      responseTime: 95,
      lastChecked: new Date().toISOString(),
    },
    {
      name: 'CDN Network',
      status: 'operational',
      uptime: 99.96,
      responseTime: 85,
      lastChecked: new Date().toISOString(),
    },
  ];

  const overallStatus = services.every((s) => s.status === 'operational')
    ? 'operational'
    : services.some((s) => s.status === 'outage')
    ? 'outage'
    : 'degraded';

  const averageUptime =
    services.reduce((acc, service) => acc + service.uptime, 0) /
    services.length;
  const averageResponseTime = Math.round(
    services.reduce((acc, s) => acc + s.responseTime, 0) / services.length
  );

  const statusData = {
    overall: {
      status: overallStatus,
      uptime: Number(averageUptime.toFixed(2)),
      responseTime: averageResponseTime,
      lastUpdated: new Date().toISOString(),
    },
    services,
    incidents: {
      active: 0,
      resolved: 0,
    },
    maintenance: {
      scheduled: [],
      inProgress: false,
    },
  };

  return NextResponse.json(statusData, {
    headers: {
      'Cache-Control': 'public, max-age=60', // Cache for 1 minute
    },
  });
}
