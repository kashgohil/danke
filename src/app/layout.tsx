import { AuthProvider } from "@/components/auth/auth-context";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { PerformanceDashboard } from "@/components/ui/performance-dashboard";
import { PerformanceProvider } from "@/components/ui/performance-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

import { AuthHeader } from "@/components/auth/auth-header";
import { Toaster } from "@/components/ui/sonner";
import { PostEditProvider } from "@/contexts/post-edit-context";
import logo from "public/danke.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Danke - Appreciation Board",
	description: "Create beautiful appreciation boards to collect heartfelt messages and memories",
	keywords: ["danke", "appreciation", "gratitude", "messages", "board", "memories"],
	authors: [{ name: "Danke Team" }],
	viewport: "width=device-width, initial-scale=1",
	robots: "index, follow",
	openGraph: {
		title: "Danke - Appreciation Board",
		description: "Create beautiful appreciation boards to collect heartfelt messages and memories",
		type: "website",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className="dark"
			>
				<head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
				</head>
				<body className={inter.className}>
					<PerformanceProvider>
						<div className="min-h-screen">
							<ErrorBoundary>
								<AuthProvider>
									<PostEditProvider>
										<div
											aria-hidden="true"
											className="pointer-events-none fixed inset-0 -z-10 bg-[hsl(250,40%,99%)]"
										/>
										<div className="min-h-screen flex flex-col">
											<header className="border-b border-purple-200/50 bg-purple-50/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
												<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
													<Link
														href="/"
														className="text-2xl font-black text-purple-900 hover:text-purple-600 transition-colors flex items-center gap-3 group"
													>
														<div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-purple-500/30 rotate-3 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
															<Image
																src={logo}
																alt="Danke"
																width={28}
																height={28}
																className="w-7 h-7 brightness-0 invert"
															/>
														</div>
														<span className="tracking-tight">Danke</span>
													</Link>
													<AuthHeader />
												</div>
											</header>
											<main className="flex-1 w-full">{children}</main>
										</div>
									</PostEditProvider>
								</AuthProvider>
							</ErrorBoundary>
						</div>
						<PerformanceDashboard />
					</PerformanceProvider>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
