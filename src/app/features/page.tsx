import { Check, Heart, ImageIcon, MessageCircle, Palette, Share2, Sparkles } from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Features - Danke",
	description:
		"Discover all the powerful features that make Danke the perfect platform for creating beautiful appreciation boards and celebrating your community.",
};

export default function FeaturesPage() {
	return (
		<div className="space-y-16 mt-8 mx-auto">
			<section className="text-center">
				<h1 className="text-4xl md:text-6xl mt-12 font-bold mb-6 text-danke-900">
					Powerful Features for
					<br />
					<span className="text-danke-gold">Beautiful Boards</span>
				</h1>
				<p className="text-xl max-w-3xl mx-auto leading-relaxed text-danke-900">
					Everything you need to create stunning appreciation boards that bring your community together and celebrate
					the moments that matter most.
				</p>
			</section>

			<section className="py-16 -mx-4 px-4 bg-background/80 backdrop-blur-lg rounded-lg">
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">Core Features</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<MessageCircle className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Rich Text Messages</CardTitle>
							<CardDescription>
								Create beautiful messages with full text formatting, colors, and styling options. Express your
								appreciation with bold text, italics, lists, and more.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<ImageIcon className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Media Uploads</CardTitle>
							<CardDescription>
								Add photos, videos, and audio files to make your messages more personal and memorable. Support for all
								common media formats.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Sparkles className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Beautiful Layouts</CardTitle>
							<CardDescription>
								Automatic masonry layouts that adapt to your content and look stunning on any device, from mobile phones
								to large displays.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Share2 className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Easy Sharing</CardTitle>
							<CardDescription>
								Share your boards with unique, secure links. No account required for contributors - they can add
								messages instantly.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Heart className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Real-time Updates</CardTitle>
							<CardDescription>
								Watch your board come alive as new messages appear instantly. See contributions from your community in
								real-time.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Palette className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Custom Themes</CardTitle>
							<CardDescription>
								Personalize your boards with custom colors, themes, and branding to match your community&apos;s style
								and personality.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			<section>
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-900">Why Choose Danke?</h2>
				<div className="max-w-4xl mx-auto text-danke-900">
					<div className="grid md:grid-cols-2 gap-12">
						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-danke-900 mb-6 text-center">Built for Scale</h3>
							<div className="flex items-center gap-3">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>Handle thousands of messages per board</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>Enterprise-grade security and reliability</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>99.9% uptime guarantee</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>Global CDN for fast loading worldwide</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>24/7 customer support</span>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-danke-900 mb-6 text-center">What Makes Us Different</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>No account required for contributors</span>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>Beautiful, responsive design out of the box</span>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>Real-time collaboration and updates</span>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>Advanced privacy and moderation tools</span>
							</div>
							<div className="flex items-center gap-4">
								<div className="flex items-center bg-background rounded-full p-1">
									<Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
								</div>
								<span>Unlimited media uploads and storage</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 -mx-4 px-4 bg-background/80 backdrop-blur-lg rounded-lg">
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">Perfect For Every Occasion</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Farewell Celebrations</CardTitle>
							<CardDescription>Collect heartfelt goodbye messages for departing colleagues or friends</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Birthday Wishes</CardTitle>
							<CardDescription>Create memorable birthday boards filled with photos and messages</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Team Recognition</CardTitle>
							<CardDescription>Celebrate project completions and acknowledge outstanding work</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Wedding Memories</CardTitle>
							<CardDescription>Gather well-wishes and memories from wedding guests</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Graduation Tributes</CardTitle>
							<CardDescription>Honor achievements with messages from family and friends</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Customer Feedback</CardTitle>
							<CardDescription>Collect testimonials and appreciation from satisfied customers</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Community Events</CardTitle>
							<CardDescription>Document special moments and gather feedback from participants</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
						<CardHeader>
							<CardTitle className="text-lg">Memorial Boards</CardTitle>
							<CardDescription>Create lasting tributes with shared memories and stories</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			<section className="text-center py-16 -mx-4 px-4 bg-gradient-to-r rounded-lg text-danke-900">
				<h2 className="text-3xl font-bold mb-6">Ready to Experience These Features?</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
					Start creating beautiful appreciation boards today and see why thousands of communities choose Danke.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/create-board">
						<Button
							size="lg"
							className="inline-flex items-center justify-center px-6 py-3 bg-danke-gold text-background font-medium rounded-lg hover:bg-danke-gold/90 transition-colors"
						>
							Create Your First Board
						</Button>
					</Link>
					<Link href="/dashboard">
						<Button
							size="lg"
							variant="outline"
							className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
						>
							View Dashboard
						</Button>
					</Link>
				</div>
			</section>

			<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-12 md:p-12">
				<Footer />
			</div>
		</div>
	);
}
