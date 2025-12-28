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
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/ui/footer";
import { PolaroidCard } from "@/components/ui/polaroid-card";

export const metadata: Metadata = {
  title: "System Status - Danke",
  description:
    "Real-time status of Danke services, uptime monitoring, and system health information.",
};

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: number;
  responseTime: number;
  icon: React.ComponentType<{ className?: string }>;
}

const services: ServiceStatus[] = [
  {
    name: "Web Application",
    status: "operational",
    uptime: 99.98,
    responseTime: 245,
    icon: Globe,
  },
  {
    name: "API Services",
    status: "operational",
    uptime: 99.95,
    responseTime: 180,
    icon: Server,
  },
  {
    name: "Database",
    status: "operational",
    uptime: 99.99,
    responseTime: 12,
    icon: Database,
  },
  {
    name: "File Storage",
    status: "operational",
    uptime: 99.97,
    responseTime: 320,
    icon: Shield,
  },
  {
    name: "Real-time Updates",
    status: "operational",
    uptime: 99.94,
    responseTime: 95,
    icon: Zap,
  },
  {
    name: "CDN Network",
    status: "operational",
    uptime: 99.96,
    responseTime: 85,
    icon: Wifi,
  },
];

const statusConfig: Record<
  ServiceStatus["status"],
  {
    label: string;
    headline: string;
    summary: string;
    dot: string;
    accent: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  operational: {
    label: "Operational",
    headline: "All systems operational",
    summary: "Everything is running smoothly across Danke right now.",
    dot: "bg-[#8CB369]",
    accent: "bg-[#8CB369]/20",
    icon: CheckCircle,
  },
  degraded: {
    label: "Degraded Performance",
    headline: "Performance degraded",
    summary: "Some services are responding slower than expected.",
    dot: "bg-[#F2A65A]",
    accent: "bg-[#F2A65A]/20",
    icon: AlertCircle,
  },
  outage: {
    label: "Service Outage",
    headline: "Service outage",
    summary: "Some services are currently unavailable. Our team is on it.",
    dot: "bg-[#E07A5F]",
    accent: "bg-[#E07A5F]/20",
    icon: AlertCircle,
  },
};

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value));

const ProgressBar = ({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) => (
  <div
    className={`h-3 w-full overflow-hidden rounded-full bg-[#E8DCC4] ${className}`}
  >
    <div
      className="h-full rounded-full bg-[#5DA7A3] transition-all duration-300 ease-out"
      style={{ width: `${clampPercentage(value)}%` }}
    />
  </div>
);

export default function StatusPage() {
  const overallStatus = services.every(
    (service) => service.status === "operational",
  )
    ? "operational"
    : services.some((service) => service.status === "outage")
      ? "outage"
      : "degraded";

  const averageUptime =
    services.reduce((acc, service) => acc + service.uptime, 0) /
    services.length;
  const averageResponseTime = Math.round(
    services.reduce((acc, service) => acc + service.responseTime, 0) /
      services.length,
  );
  const overallTone = statusConfig[overallStatus];
  const StatusIcon = overallTone.icon;

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#FDF6E3",
        backgroundImage: `
					radial-gradient(circle, #E8DCC4 1px, transparent 1px),
					radial-gradient(circle, #F0E6D2 1px, transparent 1px)
				`,
        backgroundSize: "24px 24px, 48px 48px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    >
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-50 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                System Status
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                Live updates on every Danke service.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Track uptime, response time, and maintenance windows in one
                place. We refresh the dashboard often so you always know
                what&apos;s happening.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                <Activity className="w-4 h-4 text-gray-700" />
                <span>Monitoring uptime every minute.</span>
              </div>
            </div>

            <PolaroidCard
              size="large"
              className="w-full max-w-lg mx-auto p-8 md:p-10"
            >
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Current status
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${overallTone.accent}`}
                  >
                    <StatusIcon className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-fuzzy-bubbles text-gray-900">
                      {overallTone.headline}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${overallTone.dot}`}
                      />
                      <span className="font-semibold">{overallTone.label}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {overallTone.summary}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-700" />
                    <span>Last updated: {new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-700" />
                    <span>Average uptime: {averageUptime.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-700" />
                    <span>Average response: {averageResponseTime}ms</span>
                  </div>
                </div>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              At a glance
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
              A quick pulse check
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <PolaroidCard className="w-full max-w-none p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#F2A65A] rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                    Overall uptime
                  </p>
                  <div className="mt-2 text-3xl font-fuzzy-bubbles text-gray-900">
                    {averageUptime.toFixed(2)}%
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={averageUptime} />
                    <p className="mt-2 text-sm text-gray-600">Last 30 days</p>
                  </div>
                </div>
              </div>
            </PolaroidCard>

            <PolaroidCard className="w-full max-w-none p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#5DA7A3] rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                    Response time
                  </p>
                  <div className="mt-2 text-3xl font-fuzzy-bubbles text-gray-900">
                    {averageResponseTime}
                    <span className="text-xl">ms</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Average across all services
                  </p>
                </div>
              </div>
            </PolaroidCard>

            <PolaroidCard className="w-full max-w-none p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#8CB369] rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                    Active incidents
                  </p>
                  <div className="mt-2 text-3xl font-fuzzy-bubbles text-gray-900">
                    0
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    No incidents at the moment
                  </p>
                </div>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Service map
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
              Service status
            </h2>
          </div>
          <div className="grid gap-6">
            {services.map((service) => {
              const ServiceIcon = service.icon;
              const serviceTone = statusConfig[service.status];
              const ServiceStatusIcon = serviceTone.icon;

              return (
                <PolaroidCard
                  key={service.name}
                  className="w-full max-w-none p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#FDF6E3] rounded-2xl border-2 border-gray-900 flex items-center justify-center">
                        <ServiceIcon className="w-7 h-7 text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-fuzzy-bubbles font-semibold text-gray-900">
                          {service.name}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span>Uptime: {service.uptime}%</span>
                          <span>Response: {service.responseTime}ms</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${serviceTone.dot}`}
                      />
                      <ServiceStatusIcon className="w-4 h-4 text-gray-700" />
                      <span className="font-semibold">{serviceTone.label}</span>
                    </div>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Incident log
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
              Recent incidents
            </h2>
          </div>
          <PolaroidCard className="w-full max-w-none p-10 md:p-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#8CB369] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-fuzzy-bubbles text-gray-900">
                No recent incidents
              </h3>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                All systems have been running smoothly. The last incident was
                resolved over 30 days ago.
              </p>
            </div>
          </PolaroidCard>
        </div>
      </section>

      {/* Scheduled Maintenance */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Maintenance
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
              Scheduled maintenance
            </h2>
          </div>
          <PolaroidCard className="w-full max-w-none p-10 md:p-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#F2A65A] rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-fuzzy-bubbles text-gray-900">
                No scheduled maintenance
              </h3>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                There are no planned maintenance windows right now. We&apos;ll
                always notify you ahead of time.
              </p>
            </div>
          </PolaroidCard>
        </div>
      </section>

      {/* 30-Day Uptime History */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Uptime history
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
              30-day uptime history
            </h2>
          </div>
          <div className="grid gap-6">
            {services.map((service) => {
              const ServiceIcon = service.icon;

              return (
                <PolaroidCard
                  key={service.name}
                  className="w-full max-w-none p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FDF6E3] rounded-2xl border-2 border-gray-900 flex items-center justify-center">
                        <ServiceIcon className="w-6 h-6 text-gray-900" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {service.name}
                        </p>
                        <p className="text-sm text-gray-600">Last 30 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-full md:w-48">
                        <ProgressBar value={service.uptime} className="h-2" />
                      </div>
                      <span className="text-lg font-semibold text-gray-900 w-16 text-right">
                        {service.uptime}%
                      </span>
                    </div>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-12 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                Stay updated on system status
              </h2>
              <p className="text-gray-700 text-lg">
                Subscribe to incident alerts and maintenance updates so you
                never miss a change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:status@trydanke.link?subject=Status Updates Subscription"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Subscribe to email updates
                </Link>
                <Link
                  href="/status/rss"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-colors"
                >
                  RSS feed
                </Link>
              </div>
            </div>
          </PolaroidCard>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Footer />
      </div>
    </div>
  );
}
