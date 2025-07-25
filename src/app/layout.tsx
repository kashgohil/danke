import { AuthProvider } from "@/components/auth/auth-context";
import { IconButton } from "@/components/ui/button";
import { ThemeProvider, useTheme } from "@/components/ui/theme-context";
import { ClerkProvider } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Danke",
	description: "share and care",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// Theme toggle button (client component)
	function ThemeToggle() {
		const { theme, toggleTheme } = useTheme();
		return (
			<div className="fixed bottom-6 right-6 z-50">
				<IconButton
					icon={theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
					onClick={toggleTheme}
					aria-label="Toggle theme"
				/>
			</div>
		);
	}
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<div className="min-h-screen bg-background">
						<ThemeProvider>
							<AuthProvider>
								{children}
								<ThemeToggle />
							</AuthProvider>
						</ThemeProvider>
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
