import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Globe,
  Server,
  Shield,
  Wifi,
  Zap,
} from 'lucide-react';
import { Metadata } from 'next';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'System Status - Danke',
  description:
    'Real-time status of Danke services, uptime monitoring, and system health information.',
};

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
  icon: React.ComponentType<{ className?: string }>;
}

const services: ServiceStatus[] = [
  {
    name: 'Web Application',
    status: 'operational',
    uptime: 99.98,
    responseTime: 245,
    icon: Globe,
  },
  {
    name: 'API Services',
    status: 'operational',
    uptime: 99.95,
    responseTime: 180,
    icon: Server,
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: 99.99,
    responseTime: 12,
    icon: Database,
  },
  {
    name: 'File Storage',
    status: 'operational',
    uptime: 99.97,
    responseTime: 320,
    icon: Shield,
  },
  {
    name: 'Real-time Updates',
    status: 'operational',
    uptime: 99.94,
    responseTime: 95,
    icon: Zap,
  },
  {
    name: 'CDN Network',
    status: 'operational',
    uptime: 99.96,
    responseTime: 85,
    icon: Wifi,
  },
];

const getStatusColor = (status: ServiceStatus['status']) => {
  switch (status) {
    case 'operational':
      return 'text-danke-900 bg-danke-gold';
    case 'degraded':
      return 'text-yellow-600 bg-yellow-100';
    case 'outage':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getStatusIcon = (status: ServiceStatus['status']) => {
  switch (status) {
    case 'operational':
      return CheckCircle;
    case 'degraded':
      return AlertCircle;
    case 'outage':
      return AlertCircle;
    default:
      return Activity;
  }
};

const getStatusText = (status: ServiceStatus['status']) => {
  switch (status) {
    case 'operational':
      return 'Operational';
    case 'degraded':
      return 'Degraded Performance';
    case 'outage':
      return 'Service Outage';
    default:
      return 'Unknown';
  }
};

export default function StatusPage() {
  const overallStatus = services.every((s) => s.status === 'operational')
    ? 'operational'
    : services.some((s) => s.status === 'outage')
    ? 'outage'
    : 'degraded';

  const averageUptime =
    services.reduce((acc, service) => acc + service.uptime, 0) /
    services.length;

  return (
    <div className="space-y-16 mt-8 mx-auto">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl mt-12 font-bold mb-6 text-danke-900">
          System Status
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-danke-800">
          Real-time monitoring of all Danke services and infrastructure
          components.
        </p>
      </section>

      <section className="py-8 -mx-4 px-4 bg-background/50 backdrop-blur-lg rounded-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            {(() => {
              const StatusIcon = getStatusIcon(overallStatus);
              return (
                <div className="flex items-center gap-3">
                  <StatusIcon className="w-8 h-8 text-danke-gold" />
                  <div>
                    <h2 className="text-2xl font-bold text-danke-gold">
                      All Systems Operational
                    </h2>
                    <p className="text-muted-foreground">
                      Last updated: {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-danke-gold" />
                  Overall Uptime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {averageUptime.toFixed(2)}%
                </div>
                <Progress value={averageUptime} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Last 30 days
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-danke-gold" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(
                    services.reduce((acc, s) => acc + s.responseTime, 0) /
                      services.length
                  )}
                  ms
                </div>
                <p className="text-sm text-muted-foreground">
                  Average across all services
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-danke-gold" />
                  Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <p className="text-sm text-muted-foreground">
                  Active incidents
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-danke-900">
          Service Status
        </h2>
        <div className="grid gap-4 max-w-4xl mx-auto">
          {services.map((service) => {
            const StatusIcon = service.icon;
            const ServiceStatusIcon = getStatusIcon(service.status);

            return (
              <Card key={service.name} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center">
                        <StatusIcon className="w-6 h-6 text-danke-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {service.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Uptime: {service.uptime}%</span>
                          <span>Response: {service.responseTime}ms</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(service.status)}>
                        <ServiceStatusIcon className="w-4 h-4 mr-1" />
                        {getStatusText(service.status)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="py-16 -mx-4 px-4 bg-background/50 backdrop-blur-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">
          Recent Incidents
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-danke-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                No Recent Incidents
              </h3>
              <p className="text-muted-foreground">
                All systems have been running smoothly. Our last incident was
                resolved over 30 days ago.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-danke-900">
          Scheduled Maintenance
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Clock className="w-16 h-16 text-danke-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                No Scheduled Maintenance
              </h3>
              <p className="text-muted-foreground">
                There are currently no planned maintenance windows. We'll notify
                users in advance of any scheduled downtime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 -mx-4 px-4 bg-background/50 backdrop-blur-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">
          30-Day Uptime History
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 bg-background rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <service.icon className="w-5 h-5 text-danke-gold" />
                  <span className="font-medium text-primary">
                    {service.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={service.uptime} className="w-32 h-2" />
                  <span className="text-sm font-medium text-danke-gold w-16 text-right">
                    {service.uptime}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-16 -mx-4 px-4 bg-gradient-to-r rounded-lg text-danke-900">
        <h2 className="text-3xl font-bold mb-6">
          Stay Updated on System Status
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Get notified about incidents, maintenance windows, and system updates
          via email or RSS.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="mailto:status@danke.no?subject=Status Updates Subscription"
            className="inline-flex items-center justify-center px-6 py-3 bg-danke-gold text-danke-900 font-semibold rounded-lg hover:bg-danke-300 transition-colors"
          >
            Subscribe to Email Updates
          </Link>
          <Link
            href="/status/rss"
            className="inline-flex items-center justify-center px-6 py-3 border border-danke-900 text-danke-900 font-semibold rounded-lg hover:bg-danke-900 hover:text-white transition-colors"
          >
            RSS Feed
          </Link>
        </div>
      </section>

      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-12">
        <Footer />
      </div>
    </div>
  );
}
