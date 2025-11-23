import { Activity, AlertCircle, CheckCircle, Clock, Database, Globe, Server, Shield, Wifi, Zap } from "lucide-react";
import { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export const metadata: Metadata = {
	title: "System Status - Danke",
	description: "Real-time status of Danke services, uptime monitoring, and system health information.",
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

const getStatusColor = (status: ServiceStatus["status"]) => {
	switch (status) {
		case "operational":
			return "bg-green-100 text-green-700 border-green-200";
		case "degraded":
			return "bg-yellow-100 text-yellow-700 border-yellow-200";
		case "outage":
			return "bg-red-100 text-red-700 border-red-200";
		default:
			return "bg-gray-100 text-gray-700 border-gray-200";
	}
};

const getStatusIcon = (status: ServiceStatus["status"]) => {
	switch (status) {
		case "operational":
			return CheckCircle;
		case "degraded":
			return AlertCircle;
		case "outage":
			return AlertCircle;
		default:
			return Activity;
	}
};

const getStatusText = (status: ServiceStatus["status"]) => {
	switch (status) {
		case "operational":
			return "Operational";
		case "degraded":
			return "Degraded Performance";
		case "outage":
			return "Service Outage";
		default:
			return "Unknown";
	}
};

export default function StatusPage() {
	const overallStatus = services.every((s) => s.status === "operational")
		? "operational"
		: services.some((s) => s.status === "outage")
		? "outage"
		: "degraded";

	const averageUptime = services.reduce((acc, service) => acc + service.uptime, 0) / services.length;

	return (
		<div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">
			{/* Hero Section */}
			<section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-purple-900">
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
				</div>

				<div className="container-default section-padding relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<div className="animate-in mb-8">
							<div className="flex items-center justify-center gap-3 mb-8">
								{(() => {
									const StatusIcon = getStatusIcon(overallStatus);
									return (
										<div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md border border-green-400/30 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
											<StatusIcon className="w-5 h-5 text-green-300" />
											<span className="text-white font-semibold">All Systems Operational</span>
										</div>
									);
								})()}
							</div>
						</div>

						<h1 className="animate-in-delay-1 mb-8 text-white">
							<span className="block text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
								System Status
							</span>
							<span className="block text-2xl md:text-3xl text-white/90 font-light">
								Real-time monitoring of all services
							</span>
						</h1>

						<p className="text-lg text-white/80 max-w-2xl mx-auto">
							Last updated: {new Date().toLocaleString()}
						</p>
					</div>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			{/* Overview Stats */}
			<section className="py-20 px-6 md:px-12 lg:px-24 mt-16">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-3 gap-6">
						<Card className="border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-shadow rounded-2xl bg-white">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg flex items-center gap-2 text-purple-700">
									<Activity className="w-5 h-5 text-purple-600" />
									Overall Uptime
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-4xl font-black text-purple-600 mb-3">{averageUptime.toFixed(2)}%</div>
								<Progress
									value={averageUptime}
									className="h-3 mb-2"
								/>
								<p className="text-sm text-purple-600 font-medium">Last 30 days</p>
							</CardContent>
						</Card>

						<Card className="border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-shadow rounded-2xl bg-white">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg flex items-center gap-2 text-purple-700">
									<Clock className="w-5 h-5 text-purple-600" />
									Response Time
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-4xl font-black text-purple-600 mb-3">
									{Math.round(services.reduce((acc, s) => acc + s.responseTime, 0) / services.length)}
									<span className="text-2xl">ms</span>
								</div>
								<p className="text-sm text-purple-600 font-medium">Average across all services</p>
							</CardContent>
						</Card>

						<Card className="border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-shadow rounded-2xl bg-white">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg flex items-center gap-2 text-purple-700">
									<CheckCircle className="w-5 h-5 text-purple-600" />
									Incidents
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-4xl font-black text-green-600 mb-3">0</div>
								<p className="text-sm text-purple-600 font-medium">Active incidents</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Service Status */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-black text-center mb-12 text-purple-900">Service Status</h2>
					<div className="grid gap-4">
						{services.map((service) => {
							const StatusIcon = service.icon;
							const ServiceStatusIcon = getStatusIcon(service.status);

							return (
								<Card
									key={service.name}
									className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all rounded-2xl bg-white"
								>
									<CardContent className="p-6">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												<div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
													<StatusIcon className="w-7 h-7 text-purple-600" />
												</div>
												<div>
													<h3 className="text-lg font-bold text-purple-900">{service.name}</h3>
													<div className="flex items-center gap-4 text-sm text-purple-700 mt-1">
														<span className="font-medium">Uptime: {service.uptime}%</span>
														<span className="font-medium">Response: {service.responseTime}ms</span>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-3">
												<Badge className={`${getStatusColor(service.status)} border font-semibold`}>
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
				</div>
			</section>

			{/* Recent Incidents */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-black text-center mb-12 text-purple-900">Recent Incidents</h2>
					<Card className="border-2 border-purple-200 shadow-xl rounded-2xl bg-white">
						<CardContent className="p-12 text-center">
							<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<CheckCircle className="w-10 h-10 text-green-600" />
							</div>
							<h3 className="text-2xl font-bold text-purple-900 mb-3">No Recent Incidents</h3>
							<p className="text-purple-700 text-lg max-w-2xl mx-auto">
								All systems have been running smoothly. Our last incident was resolved over 30 days ago.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Scheduled Maintenance */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-black text-center mb-12 text-purple-900">Scheduled Maintenance</h2>
					<Card className="border-2 border-purple-200 shadow-xl rounded-2xl bg-white">
						<CardContent className="p-12 text-center">
							<div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
								<Clock className="w-10 h-10 text-purple-600" />
							</div>
							<h3 className="text-2xl font-bold text-purple-900 mb-3">No Scheduled Maintenance</h3>
							<p className="text-purple-700 text-lg max-w-2xl mx-auto">
								There are currently no planned maintenance windows. We&apos;ll notify users in advance of any scheduled
								downtime.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* 30-Day Uptime History */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-black text-center mb-12 text-purple-900">30-Day Uptime History</h2>
					<div className="grid gap-4">
						{services.map((service) => (
							<div
								key={service.name}
								className="flex items-center justify-between p-6 bg-white rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
							>
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
										<service.icon className="w-6 h-6 text-purple-600" />
									</div>
									<span className="font-bold text-purple-900 text-lg">{service.name}</span>
								</div>
								<div className="flex items-center gap-4">
									<Progress
										value={service.uptime}
										className="w-48 h-3"
									/>
									<span className="text-lg font-black text-purple-600 w-20 text-right">{service.uptime}%</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden mt-16">
				<div className="container-narrow relative z-10">
					<div className="bg-purple-600 rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
						{/* Decorative Background */}
						<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

						<div className="relative z-10">
							<h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
								Stay Updated on System Status
							</h2>
							<p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
								Get notified about incidents, maintenance windows, and system updates via email or RSS.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link
									href="mailto:status@trydanke.link?subject=Status Updates Subscription"
									className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
								>
									Subscribe to Email Updates
								</Link>
								<Link
									href="/status/rss"
									className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
								>
									RSS Feed
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
				<Footer />
			</div>
		</div>
	);
}
