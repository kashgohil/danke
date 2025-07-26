import { AuthProvider } from "@/components/auth/auth-context";
import { ThemeProvider } from "@/components/ui/theme-context";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Danke",
	description: "share and care",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<div className="min-h-screen bg-background">
						<ThemeProvider>
							<AuthProvider>{children}</AuthProvider>
						</ThemeProvider>
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
