import { AuthHeader } from "@/components/auth/auth-header";
import { BoardCreationForm } from "@/components/boards/board-creation-form";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Heart, MessageCircle, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "public/danke.png";

export default async function CreateBoardPage() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in?redirect_url=/create-board");
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 dark:from-danke-700 dark:via-danke-300 dark:to-danke-600">
			<header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 xl:top-4 xl:rounded-xl z-40 xl:mx-auto w-full xl:max-w-1/2">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
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
				</div>
			</header>

			<div className="container mx-auto px-4 py-12">
				<div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
					<div className="lg:w-1/2 space-y-8 ">
						<div>
							<Link href="/">
								<Button
									variant="ghost"
									className="flex items-center gap-2 text-danke-700 dark:text-danke-900"
								>
									<ArrowLeft className="w-4 h-4" />
									Back to Home
								</Button>
							</Link>
						</div>

						<div className="space-y-6">
							<div className="inline-flex items-center gap-2 bg-danke-300 dark:bg-danke-gold/40 text-danke-900 dark:text-danke-900 px-4 py-2 rounded-full text-sm font-medium">
								<Sparkles className="w-4 h-4" />
								Create Something Special
							</div>

							<h1 className="text-4xl lg:text-5xl font-bold text-danke-900 dark:text-danke-900 leading-tight">
								Create Your
								<br />
								Danke Board
							</h1>

							<p className="text-lg text-danke-900 dark:text-danke-900 leading-relaxed">
								Start collecting heartfelt messages, memories, and celebrations from your community. Share the love and
								create lasting connections with those who matter most.
							</p>
						</div>

						<div className="grid gap-4">
							<Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center">
											<MessageCircle className="w-5 h-5 text-danke-900 dark:text-danke-900" />
										</div>
										<div>
											<CardTitle className="text-lg">Rich Messages</CardTitle>
											<CardDescription>Beautiful formatting and styling for heartfelt messages</CardDescription>
										</div>
									</div>
								</CardHeader>
							</Card>

							<Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center">
											<Users className="w-5 h-5 text-danke-900 dark:text-danke-900" />
										</div>
										<div>
											<CardTitle className="text-lg">Easy Sharing</CardTitle>
											<CardDescription>Unique links for viewing and contributing to your board</CardDescription>
										</div>
									</div>
								</CardHeader>
							</Card>

							<Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center">
											<Heart className="w-5 h-5 text-danke-900 dark:text-danke-900" />
										</div>
										<div>
											<CardTitle className="text-lg">Privacy Control</CardTitle>
											<CardDescription>Full control over who can view and contribute to your board</CardDescription>
										</div>
									</div>
								</CardHeader>
							</Card>
						</div>

						<div className="pt-4">
							<p className="text-sm text-danke-700 dark:text-danke-900">
								Your board will be created instantly with unique sharing links. You can customize settings and manage
								contributions from your dashboard.
							</p>
						</div>
					</div>

					<div className="lg:w-1/2 lg:sticky lg:top-24">
						<BoardCreationForm />
					</div>
				</div>
			</div>
		</div>
	);
}
