import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
	Heart,
	Shield,
	Users,
	Zap,
	Target,
	Sparkles,
	Globe,
	TrendingUp,
	Clock,
	MessageCircle,
	Award,
	Smile,
	CheckCircle,
	Rocket,
	Lightbulb,
	Code,
	Coffee,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "About Us - Danke",
	description:
		"Learn about Danke's mission to help communities celebrate moments and share gratitude through beautiful appreciation boards.",
};

export default function AboutPage() {
	return (
		<div className="relative min-h-screen bg-white flex flex-col overflow-hidden">
			{/* Hero Section */}
			<section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-purple-900">
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
				</div>

				<div className="container-default section-padding relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<div className="animate-in mb-8">
							<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
								<Heart className="w-4 h-4 text-pink-300" />
								<span className="text-white font-semibold">About Danke</span>
							</div>
						</div>

						<h1 className="animate-in-delay-1 mb-8 text-white">
							<span className="block text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
								Helping People
							</span>
							<span className="block text-3xl md:text-5xl text-white/90 font-light">Celebrate Each Other</span>
						</h1>

						<p className="animate-in-delay-2 text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
							Danke makes it easy to collect appreciation and share it in a way that brings joy.
						</p>
					</div>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			{/* Stats Section */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-100 mt-16">
				<div className="container-default">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
						{[
							{ number: "10K+", label: "Boards Created", icon: Sparkles, color: "bg-purple-500" },
							{ number: "50K+", label: "Messages Shared", icon: MessageCircle, color: "bg-pink-500" },
							{ number: "75+", label: "Countries Reached", icon: Globe, color: "bg-cyan-500" },
							{ number: "100%", label: "Free Forever", icon: Heart, color: "bg-orange-500" },
						].map((stat, idx) => {
							const Icon = stat.icon;
							return (
								<div
									key={stat.label}
									className="text-center group"
									style={{
										animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
										opacity: 0,
									}}
								>
									<div className={`w-12 h-12 mx-auto mb-4 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
										<Icon className="w-6 h-6 text-white" />
									</div>
									<div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{stat.number}</div>
									<div className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-purple-50 mt-16">
				<div className="container-default">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
								<Target className="w-4 h-4 text-purple-600" />
								<span className="text-purple-600">
									The Story Behind Danke
								</span>
							</div>
							<h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-black">
								How It Started
							</h2>
						</div>

						<div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100">
							<div className="prose prose-lg max-w-none text-gray-600 space-y-6">
								<p className="text-xl leading-relaxed">
									Danke started when someone needed to collect thank-you messages for a colleague who was leaving.
									The usual methods—emails, cards, group chats—made it hard to gather everything in one place
									and present it beautifully.
								</p>
								<p className="text-lg leading-relaxed">
									So we built Danke: a place where people can easily contribute messages, photos, and videos,
									then see it all come together as a beautiful slideshow. The reaction from that first board
									showed us how meaningful it is when appreciation is shared thoughtfully.
								</p>
								<p className="text-lg leading-relaxed">
									Since then, people have used Danke for birthdays, farewells, graduations, weddings, and countless
									celebrations. Each board becomes a collection of kind words and memories that people can
									revisit and treasure.
								</p>
								<div className="mt-8 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
									<div className="flex items-center gap-3 mb-3">
										<Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
										<p className="text-lg font-bold text-purple-900 m-0">Always Free</p>
									</div>
									<p className="text-gray-700 m-0">
										Danke is free to use, with no plans to change that. We believe everyone should be able
										to celebrate the people they care about, without barriers.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Journey Timeline */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden mt-16">
				<div className="container-default relative z-10">
					<div className="text-center mb-20">
						<div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
							<Rocket className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">
								How It's Going
							</span>
						</div>
						<h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-black">
							Helping More People Celebrate
						</h2>
					</div>

					<div className="max-w-4xl mx-auto">
						<div className="space-y-8">
							{[
								{
									phase: "The Beginning",
									period: "Early 2024",
									icon: Lightbulb,
									description:
										"Created the first version to help collect meaningful messages for a departing colleague. The joy it brought to everyone involved showed us the value of thoughtful appreciation.",
									color: "bg-yellow-500",
									bgColor: "bg-yellow-50",
								},
								{
									phase: "First Celebrations",
									period: "March 2024",
									icon: Rocket,
									description:
										"Friends started using it for birthdays and farewells. Each board became a treasured collection of kind words and memories.",
									color: "bg-blue-500",
									bgColor: "bg-blue-50",
								},
								{
									phase: "Growing Together",
									period: "Mid 2024",
									icon: Users,
									description:
										"Word spread as people discovered how Danke helps celebrate meaningful moments. Added 14 board types and slideshow mode to help more celebrations shine.",
									color: "bg-purple-500",
									bgColor: "bg-purple-50",
								},
								{
									phase: "Spreading Joy",
									period: "Late 2024",
									icon: Globe,
									description:
										"People around the world started using Danke for celebrations. Over 10,000 boards created, each one filled with appreciation and happy memories.",
									color: "bg-green-500",
									bgColor: "bg-green-50",
								},
								{
									phase: "Looking Ahead",
									period: "2025 & Beyond",
									icon: Sparkles,
									description:
										"Continuing to help people celebrate each other. Adding features that make appreciation easier to share and more meaningful to receive.",
									color: "bg-pink-500",
									bgColor: "bg-pink-50",
								},
							].map((milestone, idx) => {
								const Icon = milestone.icon;
								return (
									<div
										key={milestone.phase}
										className="flex gap-6 items-start group"
										style={{
											animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
											opacity: 0,
										}}
									>
										<div className="flex-shrink-0">
											<div
												className={`w-16 h-16 ${milestone.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
											>
												<Icon className="w-8 h-8 text-white" />
											</div>
										</div>
										<div className="flex-1 pt-2">
											<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
												<h3 className="text-2xl font-bold text-gray-900">{milestone.phase}</h3>
												<span className={`${milestone.bgColor} px-4 py-1 rounded-full text-sm font-bold text-gray-700 w-fit`}>
													{milestone.period}
												</span>
											</div>
											<p className="text-gray-600 leading-relaxed text-lg">{milestone.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-slate-900 text-white relative overflow-hidden mt-16">
				{/* Decorative Grid */}
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

				<div className="container-default relative z-10">
					<div className="text-center mb-20">
						<div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-bold mb-6">
							<Award className="w-4 h-4 text-cyan-300" />
							<span className="text-white">What We Care About</span>
						</div>
						<h2 className="mb-6 text-white text-4xl md:text-5xl font-black">
							What Guides Us
						</h2>
						<p className="text-xl text-white/80 max-w-3xl mx-auto">
							What matters to us as we build Danke
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{[
							{
								icon: Heart,
								title: "Make It Effortless",
								description: "Celebrating someone should be easy and joyful, not complicated. We remove friction wherever we can.",
								color: "bg-pink-500",
							},
							{
								icon: Users,
								title: "Listen and Learn",
								description: "The best features come from people who use Danke. We pay attention to what helps celebrations shine.",
								color: "bg-blue-500",
							},
							{
								icon: Shield,
								title: "Respect Privacy",
								description: "Your celebrations and memories are precious. We protect your data and never sell it or show ads.",
								color: "bg-green-500",
							},
							{
								icon: Globe,
								title: "Free for Everyone",
								description: "Everyone deserves to celebrate the people they care about. No paywalls, no premium tiers—ever.",
								color: "bg-orange-500",
							},
							{
								icon: Smile,
								title: "Delight in Details",
								description: "Smooth animations, beautiful layouts, thoughtful interactions—small touches that make celebrations special.",
								color: "bg-purple-500",
							},
							{
								icon: CheckCircle,
								title: "Keep Improving",
								description: "When something breaks, we fix it. When something could bring more joy, we enhance it.",
								color: "bg-rose-500",
							},
						].map((value, idx) => {
							const Icon = value.icon;
							return (
								<div
									key={value.title}
									className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
									style={{
										animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
										opacity: 0,
									}}
								>
									<div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
										<Icon className="w-7 h-7 text-white" />
									</div>
									<h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
									<p className="text-white/70 leading-relaxed">{value.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Behind the Scenes */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
								<Code className="w-4 h-4 text-purple-600" />
								<span className="text-purple-600">
									Behind the Scenes
								</span>
							</div>
							<h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-black">
								How We Work
							</h2>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							{[
								{
									icon: Coffee,
									title: "Small, Dedicated Team",
									description:
										"A small group of people who care about helping you celebrate. We respond quickly and genuinely care about your experience.",
								},
								{
									icon: Users,
									title: "Built on Real Needs",
									description:
										"Features exist because they help real celebrations. We listen to how people use Danke and build what brings the most joy.",
								},
								{
									icon: Sparkles,
									title: "Thoughtful Craft",
									description:
										"Every animation, layout, and interaction is designed to make your celebration feel special and memorable.",
								},
								{
									icon: Heart,
									title: "Purpose-Driven",
									description:
										"We built Danke to help spread positivity and appreciation. Every feature serves that purpose.",
								},
							].map((item, idx) => {
								const Icon = item.icon;
								return (
									<div
										key={item.title}
										className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-10 hover:shadow-xl hover:border-purple-200 transition-all duration-300 group"
										style={{
											animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
											opacity: 0,
										}}
									>
										<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
											<Icon className="w-8 h-8 text-purple-600" />
										</div>
										<h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
										<p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-purple-600 relative overflow-hidden mt-16">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

				<div className="container-narrow relative z-10">
					<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 md:p-20 text-center shadow-2xl">
						<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-sm font-medium mb-8">
							<MessageCircle className="w-4 h-4 text-white" />
							<span className="text-white font-bold">Let's Connect</span>
						</div>

						<h2 className="mb-6 text-white text-4xl md:text-6xl font-black">
							Questions or Suggestions?
							<br />
							<span className="text-white/90 text-3xl md:text-5xl mt-2 block">We'd like to hear from you</span>
						</h2>

						<p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
							If you have ideas, found a bug, or just want to say hi, feel free to reach out.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Link href="/contact">
								<Button
									size="lg"
									className="bg-white hover:bg-gray-100 text-purple-700 border-0 min-w-[220px] h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
								>
									<MessageCircle className="w-5 h-5 mr-2" />
									Contact Us
								</Button>
							</Link>
							<Link href="/features">
								<Button
									variant="outline"
									size="lg"
									className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/20 min-w-[220px] h-16 text-lg font-semibold"
								>
									Explore Features
								</Button>
							</Link>
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
