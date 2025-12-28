import {
	ArrowRight,
	BookOpen,
	Calendar,
	CheckCircle,
	Clock,
	Heart,
	Lightbulb,
	MessageSquare,
	Sparkles,
	Star,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog - Danke",
	description:
		"Discover tips, stories, and inspiration for creating meaningful appreciation boards. Learn how to celebrate the people who matter most.",
};

export default function BlogPage() {
	const featuredPost = {
		title: "The Psychology Behind Why Appreciation Matters",
		excerpt:
			"Discover the science-backed reasons why expressing gratitude and appreciation strengthens relationships, boosts mental health, and creates lasting positive impact in communities.",
		category: "Insights",
		readTime: "8 min read",
		date: "Nov 20, 2024",
		image: "🧠",
		author: "Danke Team",
	};

	const blogPosts = [
		{
			title: "10 Creative Ways to Use Appreciation Boards",
			excerpt:
				"From farewell parties to milestone celebrations, discover unique and creative ways to use appreciation boards that go beyond the traditional use cases.",
			category: "Tips & Tricks",
			readTime: "6 min read",
			date: "Nov 18, 2024",
			image: "💡",
			author: "Sarah Chen",
		},
		{
			title: "How Remote Teams Stay Connected with Danke",
			excerpt:
				"Learn how distributed teams use appreciation boards to maintain culture, celebrate wins, and foster genuine connections across time zones.",
			category: "Use Cases",
			readTime: "5 min read",
			date: "Nov 15, 2024",
			image: "🌍",
			author: "Michael Roberts",
		},
		{
			title: "Writing Meaningful Messages: A Guide",
			excerpt:
				"Struggling with what to write? This guide will help you craft heartfelt, authentic messages that truly resonate and make lasting impressions.",
			category: "How-To",
			readTime: "7 min read",
			date: "Nov 12, 2024",
			image: "✍️",
			author: "Emma Taylor",
		},
		{
			title: "The Ultimate Farewell Board Checklist",
			excerpt:
				"Planning a farewell celebration? Follow this comprehensive checklist to create a memorable send-off that your colleague will treasure forever.",
			category: "Resources",
			readTime: "10 min read",
			date: "Nov 10, 2024",
			image: "✅",
			author: "Alex Kumar",
		},
		{
			title: "Celebrating Milestones: A Year in Review",
			excerpt:
				"Real stories from teams who used appreciation boards to celebrate anniversaries, promotions, and major achievements throughout the year.",
			category: "Stories",
			readTime: "8 min read",
			date: "Nov 8, 2024",
			image: "🎉",
			author: "Jessica Martinez",
		},
		{
			title: "5 Templates to Kickstart Your Next Board",
			excerpt:
				"Save time with these proven board templates designed for birthdays, retirements, thank you boards, team celebrations, and more.",
			category: "Templates",
			readTime: "4 min read",
			date: "Nov 5, 2024",
			image: "📋",
			author: "David Park",
		},
		{
			title: "Building Company Culture Through Recognition",
			excerpt:
				"How regular appreciation and recognition rituals can transform your company culture and boost employee engagement and retention.",
			category: "Insights",
			readTime: "9 min read",
			date: "Nov 3, 2024",
			image: "🏢",
			author: "Rachel Green",
		},
		{
			title: "The Art of Timing: When to Share Your Board",
			excerpt:
				"Timing is everything. Learn the best practices for when to create, share, and reveal your appreciation board for maximum emotional impact.",
			category: "Tips & Tricks",
			readTime: "6 min read",
			date: "Oct 30, 2024",
			image: "⏰",
			author: "Tom Wilson",
		},
		{
			title: "Privacy & Security: How We Protect Your Memories",
			excerpt:
				"A transparent look at how we handle data, maintain privacy, and ensure your appreciation boards and memories remain secure.",
			category: "Product Updates",
			readTime: "7 min read",
			date: "Oct 28, 2024",
			image: "🔒",
			author: "Danke Team",
		},
	];

	const categories = [
		{ name: "All Posts", count: 9, color: "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900" },
		{ name: "Tips & Tricks", count: 2, color: "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-900" },
		{ name: "Use Cases", count: 1, color: "bg-pink-100 text-pink-700 hover:bg-pink-200 hover:text-pink-900" },
		{ name: "How-To", count: 1, color: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 hover:text-cyan-900" },
		{ name: "Insights", count: 2, color: "bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-900" },
		{ name: "Stories", count: 1, color: "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900" },
		{ name: "Resources", count: 1, color: "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900" },
		{ name: "Templates", count: 1, color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-900" },
	];

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
						<BookOpen className="w-4 h-4 text-pink-300" />
						<span className="text-white font-semibold">Blog & Resources</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
						<span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
							Stories & Insights
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
						Tips, inspiration, and stories about creating meaningful connections through appreciation.
					</p>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			{/* Categories Filter */}
			<section className="py-12 px-6 md:px-12 lg:px-24 bg-gray-50 border-b border-gray-100">
				<div className="container-default">
					<div className="flex flex-wrap gap-3 justify-center items-center">
						{categories.map((category) => (
							<Button
								key={category.name}
								variant="outline"
								className={`${category.color} border-0 font-bold rounded-full px-6 py-2 h-auto transition-all hover:scale-105 shadow-sm hover:shadow-md`}
							>
								{category.name}
								<Badge
									variant="secondary"
									className="ml-2 bg-white/50 text-gray-900 font-bold"
								>
									{category.count}
								</Badge>
							</Button>
						))}
					</div>
				</div>
			</section>

			{/* Featured Post */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default max-w-6xl mx-auto">
					<div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-12">
						<Star className="w-4 h-4 text-purple-600" />
						<span className="text-purple-600">Featured Post</span>
					</div>

					<Card className="bg-purple-50 border-2 border-purple-100 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl overflow-hidden group cursor-pointer">
						<CardHeader className="p-8 md:p-12">
							<div className="flex flex-col md:flex-row gap-8 items-start">
								<div className="w-full md:w-48 h-48 bg-purple-100 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform text-7xl">
									{featuredPost.image}
								</div>
								<div className="flex-1">
									<div className="flex flex-wrap items-center gap-3 mb-4">
										<Badge className="bg-purple-600 text-white font-bold px-4 py-1.5 rounded-full">
											{featuredPost.category}
										</Badge>
										<div className="flex items-center gap-4 text-sm text-gray-600">
											<div className="flex items-center gap-1.5">
												<Calendar className="w-4 h-4" />
												<span className="font-medium">{featuredPost.date}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<Clock className="w-4 h-4" />
												<span className="font-medium">{featuredPost.readTime}</span>
											</div>
										</div>
									</div>
									<CardTitle className="text-3xl md:text-4xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
										{featuredPost.title}
									</CardTitle>
									<CardDescription className="text-lg text-gray-700 leading-relaxed mb-6">
										{featuredPost.excerpt}
									</CardDescription>
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-gray-600">By {featuredPost.author}</span>
										<Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full px-6 group-hover:scale-105 transition-transform">
											Read Article
											<ArrowRight className="w-4 h-4 ml-2" />
										</Button>
									</div>
								</div>
							</div>
						</CardHeader>
					</Card>
				</div>
			</section>

			{/* Latest Posts Grid */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
							<TrendingUp className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">Latest Articles</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Recent Posts</h2>
						<p className="text-gray-600 text-lg max-w-2xl mx-auto">
							Explore our latest tips, stories, and insights on creating meaningful appreciation moments
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{blogPosts.map((post, index) => {
							// Category color mapping
							const getCategoryColor = (category: string) => {
								const colors: Record<string, string> = {
									"Tips & Tricks": "bg-purple-100 text-purple-700 border-purple-200",
									"Use Cases": "bg-pink-100 text-pink-700 border-pink-200",
									"How-To": "bg-cyan-100 text-cyan-700 border-cyan-200",
									Resources: "bg-blue-100 text-blue-700 border-blue-200",
									Stories: "bg-green-100 text-green-700 border-green-200",
									Templates: "bg-yellow-100 text-yellow-700 border-yellow-200",
									Insights: "bg-orange-100 text-orange-700 border-orange-200",
									"Product Updates": "bg-indigo-100 text-indigo-700 border-indigo-200",
								};
								return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
							};

							return (
								<Card
									key={index}
									className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden group cursor-pointer"
								>
									<CardHeader className="p-8">
										<div className="w-full h-32 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform text-6xl">
											{post.image}
										</div>

										<div className="flex flex-wrap items-center gap-2 mb-4">
											<Badge className={`font-bold border-2 rounded-full px-3 py-1 ${getCategoryColor(post.category)}`}>
												{post.category}
											</Badge>
										</div>

									<CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
										{post.title}
									</CardTitle>

									<CardDescription className="text-base text-gray-600 leading-relaxed mb-6 line-clamp-3">
										{post.excerpt}
									</CardDescription>

									<div className="flex items-center justify-between pt-4 border-t border-gray-100">
										<div className="flex flex-col gap-1">
											<span className="text-xs font-medium text-gray-500">{post.author}</span>
											<div className="flex items-center gap-3 text-xs text-gray-500">
												<div className="flex items-center gap-1">
													<Calendar className="w-3 h-3" />
													<span>{post.date}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="w-3 h-3" />
													<span>{post.readTime}</span>
												</div>
											</div>
										</div>
										<ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
									</div>
								</CardHeader>
							</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Popular Topics */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
							<Zap className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">Popular Topics</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Explore by Topic</h2>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						{[
							{
								icon: Heart,
								title: "Appreciation Ideas",
								description: "Creative ways to show gratitude",
								color: "bg-red-500",
								bgColor: "bg-red-50",
								borderColor: "border-red-200",
							},
							{
								icon: Users,
								title: "Team Culture",
								description: "Building strong communities",
								color: "bg-blue-500",
								bgColor: "bg-blue-50",
								borderColor: "border-blue-200",
							},
							{
								icon: Lightbulb,
								title: "Best Practices",
								description: "Tips from the experts",
								color: "bg-yellow-500",
								bgColor: "bg-yellow-50",
								borderColor: "border-yellow-200",
							},
							{
								icon: Sparkles,
								title: "Success Stories",
								description: "Real celebration examples",
								color: "bg-purple-500",
								bgColor: "bg-purple-50",
								borderColor: "border-purple-200",
							},
						].map((topic, index) => {
							const Icon = topic.icon;
							return (
								<Card
									key={index}
									className={`${topic.bgColor} border-2 ${topic.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden group cursor-pointer`}
								>
									<CardHeader className="p-8 text-center">
										<div className={`w-16 h-16 ${topic.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
											<Icon className="w-8 h-8 text-white" />
										</div>
										<CardTitle className="text-lg font-bold text-gray-900 mb-2">{topic.title}</CardTitle>
										<CardDescription className="text-sm text-gray-600">{topic.description}</CardDescription>
									</CardHeader>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default max-w-5xl mx-auto">
					<div className="bg-white border-4 border-pink-200 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
						{/* Decorative Corner Elements */}
						<div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
						<div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

						<div className="relative z-10">
							<div className="text-center mb-8">
								<div className="inline-flex items-center gap-2 bg-pink-100 border-2 border-pink-300 px-6 py-3 rounded-full text-sm font-bold mb-6">
									<MessageSquare className="w-4 h-4 text-pink-600" />
									<span className="text-pink-600">Stay Updated</span>
								</div>

								<h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
									Get Appreciation Tips in Your Inbox
								</h2>
								<p className="text-lg mb-8 text-gray-600 leading-relaxed max-w-2xl mx-auto">
									Subscribe to our newsletter for the latest articles, tips, and inspiration delivered monthly.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto mb-6">
								<input
									type="email"
									placeholder="Enter your email"
									className="flex-1 h-14 px-6 rounded-full border-2 border-pink-200 bg-pink-50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 w-full sm:w-auto"
								/>
								<Button
									size="lg"
									className="bg-pink-600 text-white hover:bg-pink-700 font-bold h-14 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full sm:w-auto"
								>
									Subscribe
									<ArrowRight className="w-5 h-5 ml-2" />
								</Button>
							</div>

							<div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
								<div className="flex items-center gap-2">
									<CheckCircle className="w-5 h-5 text-green-500" />
									<span className="font-medium">No spam</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="w-5 h-5 text-green-500" />
									<span className="font-medium">Unsubscribe anytime</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="w-5 h-5 text-green-500" />
									<span className="font-medium">Monthly insights</span>
								</div>
							</div>
						</div>
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
							<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-sm font-medium mb-8">
								<Sparkles className="w-4 h-4 text-white" />
								<span className="text-white font-bold">Ready to Start?</span>
							</div>

							<h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
								Create Your First Board Today
							</h2>
							<p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
								Put what you've learned into practice. Start creating meaningful appreciation moments now.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/create-board">
									<Button
										size="lg"
										className="bg-white text-purple-600 hover:bg-gray-100 font-bold h-16 px-8 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
									>
										Create Board
									</Button>
								</Link>
								<Link href="/guides">
									<Button
										size="lg"
										variant="outline"
										className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold h-16 px-8 text-lg"
									>
										View Guides
									</Button>
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
