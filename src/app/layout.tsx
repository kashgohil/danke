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
											className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-danke-700 via-danke-300 to-danke-600"
										/>
										<div className="min-h-screen">
											<header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 md:top-3 md:rounded-xl z-40 md:mx-auto w-full md:w-[calc(100%-5rem)]">
												<div className="flex justify-between items-center mx-auto px-4 py-4 md:px-6">
													<Link
														href="/"
														className="text-2xl font-bold bg-gradient-to-r from-danke-600 to-danke-gold bg-clip-text text-transparent hover:from-danke-700 hover:to-danke-500 transition-all flex items-center gap-2"
													>
														<Image
															src={logo}
															alt="Danke"
															width={32}
															height={32}
														/>
														Danke
													</Link>
													<AuthHeader />
												</div>
											</header>
											<main className="container mx-auto px-4 py-12 flex-1">{children}</main>
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
