import { Check, Globe, Heart, ImageIcon, MessageCircle, Palette, Share2, Shield, Sparkles, Zap } from "lucide-react";
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
		<div className="relative min-h-screen bg-white flex flex-col overflow-hidden">
			{/* Hero Section */}
			<section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-purple-900 overflow-hidden">
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
				</div>

				<div className="container-default relative z-10 text-center">
					<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-sm font-medium shadow-lg mb-8">
						<Sparkles className="w-4 h-4 text-pink-300" />
						<span className="text-white font-semibold">Features</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
						<span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
							Powerful Features
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
						Everything you need to create stunning appreciation boards that bring your community together.
					</p>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 mt-16 relative z-20">
				<div className="container-default">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Core Capabilities</h2>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 relative rounded-3xl overflow-hidden group hover:-translate-y-1">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<MessageCircle className="w-7 h-7 text-purple-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Rich Text Messages</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Create beautiful messages with full text formatting, colors, and styling options. Express your
									appreciation with bold text, italics, lists, and more.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-pink-200 transition-all duration-300 relative rounded-3xl overflow-hidden group hover:-translate-y-1">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<ImageIcon className="w-7 h-7 text-pink-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Media Uploads</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Add photos, videos, and audio files to make your messages more personal and memorable. Support for all
									common media formats.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-cyan-200 transition-all duration-300 relative rounded-3xl overflow-hidden group hover:-translate-y-1">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Sparkles className="w-7 h-7 text-cyan-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Beautiful Layouts</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Automatic masonry layouts that adapt to your content and look stunning on any device, from mobile phones
									to large displays.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-orange-200 transition-all duration-300 relative rounded-3xl overflow-hidden group hover:-translate-y-1">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Share2 className="w-7 h-7 text-orange-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Easy Sharing</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Share your boards with unique, secure links. No account required for contributors - they can add
									messages instantly.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-red-200 transition-all duration-300 relative rounded-3xl overflow-hidden group hover:-translate-y-1">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Heart className="w-7 h-7 text-red-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Real-time Updates</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Watch your board come alive as new messages appear instantly. See contributions from your community in
									real-time.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 relative rounded-3xl overflow-hidden group hover:-translate-y-1">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Palette className="w-7 h-7 text-indigo-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Custom Themes</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Personalize your boards with custom colors, themes, and branding to match your community&apos;s style
									and personality.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default">
					<h2 className="text-3xl md:text-4xl font-black text-center mb-16 text-gray-900">Why Choose Danke?</h2>
					<div className="max-w-5xl mx-auto">
						<div className="grid md:grid-cols-2 gap-12 lg:gap-20">
							<div className="space-y-8">
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
										<Zap className="w-6 h-6 text-purple-600" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">Built for Scale</h3>
										<p className="text-gray-600 leading-relaxed">
											Whether it's 10 messages or 10,000, Danke handles it all with ease. Our platform is optimized for performance.
										</p>
										<ul className="mt-4 space-y-2">
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Handle thousands of messages</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>99.9% uptime guarantee</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Global CDN for fast loading</span>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="space-y-8">
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
										<Shield className="w-6 h-6 text-pink-600" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
										<p className="text-gray-600 leading-relaxed">
											Your data is safe with us. We use enterprise-grade encryption and security practices to protect your boards.
										</p>
										<ul className="mt-4 space-y-2">
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Advanced moderation tools</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Password protection options</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>GDPR compliant</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
							
							<div className="space-y-8">
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
										<Globe className="w-6 h-6 text-cyan-600" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">Universal Access</h3>
										<p className="text-gray-600 leading-relaxed">
											Designed to work perfectly on any device, anywhere in the world. No barriers to participation.
										</p>
										<ul className="mt-4 space-y-2">
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>No account required for contributors</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Mobile-first design</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Works on all modern browsers</span>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="space-y-8">
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
										<Heart className="w-6 h-6 text-orange-600" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-900 mb-2">Community Focused</h3>
										<p className="text-gray-600 leading-relaxed">
											We build features based on what communities need to connect and celebrate better.
										</p>
										<ul className="mt-4 space-y-2">
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Real-time collaboration</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>Unlimited media storage</span>
											</li>
											<li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
												<Check className="w-4 h-4 text-green-500" />
												<span>24/7 customer support</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default">
					<h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900">Perfect For Every Occasion</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
						{[
							{ title: "Farewell Celebrations", desc: "Collect heartfelt goodbye messages for departing colleagues or friends" },
							{ title: "Birthday Wishes", desc: "Create memorable birthday boards filled with photos and messages" },
							{ title: "Team Recognition", desc: "Celebrate project completions and acknowledge outstanding work" },
							{ title: "Wedding Memories", desc: "Gather well-wishes and memories from wedding guests" },
							{ title: "Graduation Tributes", desc: "Honor achievements with messages from family and friends" },
							{ title: "Customer Feedback", desc: "Collect testimonials and appreciation from satisfied customers" },
							{ title: "Community Events", desc: "Document special moments and gather feedback from participants" },
							{ title: "Memorial Boards", desc: "Create lasting tributes with shared memories and stories" }
						].map((item, index) => (
							<Card key={index} className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:border-purple-200 hover:-translate-y-1 bg-gray-50/50">
								<CardHeader>
									<CardTitle className="text-lg font-bold text-gray-900 mb-2">{item.title}</CardTitle>
									<CardDescription className="text-gray-600">{item.desc}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden mt-16">
				<div className="container-narrow relative z-10">
					<div className="bg-purple-600 rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
						{/* Decorative Background */}
						<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
						
						<div className="relative z-10">
							<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-sm font-medium mb-8">
								<Sparkles className="w-4 h-4 text-white" />
								<span className="text-white font-bold">Ready to Start?</span>
							</div>
							
							<h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
								Experience these features today
							</h2>
							<p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
								Start creating beautiful appreciation boards today and see why thousands of communities choose Danke.
							</p>
							
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/create-board">
									<Button
										size="lg"
										className="bg-white text-purple-600 hover:bg-gray-100 font-bold h-16 px-8 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
									>
										Create Your First Board
									</Button>
								</Link>
								<Link href="/dashboard">
									<Button
										size="lg"
										variant="outline"
										className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold h-16 px-8 text-lg"
									>
										View Dashboard
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
				<Footer />
			</div>
		</div>
	);
}
