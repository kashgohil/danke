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
		<div className="relative min-h-screen bg-white flex flex-col">
			{/* Hero Section */}
			<section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-orange-50">
				<div className="container-default section-padding relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<div className="animate-in mb-8">
							<div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-purple-200 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
								<Heart className="w-4 h-4 text-purple-600" />
								<span className="text-gray-900">About Danke</span>
							</div>
						</div>

						<h1 className="animate-in-delay-1 mb-8 text-gray-900">
							<span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
								Helping People
							</span>
							<span className="block text-gray-700">Celebrate Each Other</span>
						</h1>

						<p className="animate-in-delay-2 text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
							Danke makes it easy to collect appreciation and share it in a way that brings joy.
						</p>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white border-b border-gray-200">
				<div className="container-default">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
						{[
							{ number: "10K+", label: "Boards Created", icon: Sparkles, color: "text-purple-600" },
							{ number: "50K+", label: "Messages Shared", icon: MessageCircle, color: "text-blue-600" },
							{ number: "75+", label: "Countries Reached", icon: Globe, color: "text-green-600" },
							{ number: "100%", label: "Free Forever", icon: Heart, color: "text-orange-600" },
						].map((stat, idx) => {
							const Icon = stat.icon;
							return (
								<div
									key={stat.label}
									className="text-center"
									style={{
										animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
										opacity: 0,
									}}
								>
									<Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
									<div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
									<div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-blue-50 to-purple-50">
				<div className="container-default">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<div className="inline-flex items-center gap-2 bg-white border border-blue-200 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
								<Target className="w-4 h-4 text-blue-600" />
								<span className="text-gray-900">How It Started</span>
							</div>
							<h2 className="mb-6 text-gray-900">
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									The Story Behind Danke
								</span>
							</h2>
						</div>

						<div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
							<div className="prose prose-lg max-w-none text-gray-700 space-y-6">
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
								<div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-100">
									<p className="text-lg font-semibold text-purple-900 mb-2">Always Free</p>
									<p className="text-gray-700">
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
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
				<div className="container-default">
					<div className="text-center mb-20">
						<div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-6 py-3 rounded-full text-sm font-medium mb-6">
							<Rocket className="w-4 h-4 text-purple-600" />
							<span className="text-gray-900">How It's Going</span>
						</div>
						<h2 className="mb-6 text-gray-900">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Helping More People Celebrate
							</span>
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
									color: "from-yellow-500 to-orange-500",
									bgColor: "bg-yellow-50",
								},
								{
									phase: "First Celebrations",
									period: "March 2024",
									icon: Rocket,
									description:
										"Friends started using it for birthdays and farewells. Each board became a treasured collection of kind words and memories.",
									color: "from-blue-500 to-cyan-500",
									bgColor: "bg-blue-50",
								},
								{
									phase: "Growing Together",
									period: "Mid 2024",
									icon: Users,
									description:
										"Word spread as people discovered how Danke helps celebrate meaningful moments. Added 14 board types and slideshow mode to help more celebrations shine.",
									color: "from-purple-500 to-pink-500",
									bgColor: "bg-purple-50",
								},
								{
									phase: "Spreading Joy",
									period: "Late 2024",
									icon: Globe,
									description:
										"People around the world started using Danke for celebrations. Over 10,000 boards created, each one filled with appreciation and happy memories.",
									color: "from-green-500 to-emerald-500",
									bgColor: "bg-green-50",
								},
								{
									phase: "Looking Ahead",
									period: "2025 & Beyond",
									icon: Sparkles,
									description:
										"Continuing to help people celebrate each other. Adding features that make appreciation easier to share and more meaningful to receive.",
									color: "from-pink-500 to-rose-500",
									bgColor: "bg-pink-50",
								},
							].map((milestone, idx) => {
								const Icon = milestone.icon;
								return (
									<div
										key={milestone.phase}
										className="flex gap-6 items-start"
										style={{
											animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
											opacity: 0,
										}}
									>
										<div className="flex-shrink-0">
											<div
												className={`w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-xl flex items-center justify-center shadow-lg`}
											>
												<Icon className="w-8 h-8 text-white" />
											</div>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<h3 className="text-2xl font-bold text-gray-900">{milestone.phase}</h3>
												<span className={`${milestone.bgColor} px-3 py-1 rounded-full text-sm font-semibold text-gray-700`}>
													{milestone.period}
												</span>
											</div>
											<p className="text-gray-600 leading-relaxed">{milestone.description}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-50 to-purple-50">
				<div className="container-default">
					<div className="text-center mb-20">
						<div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
							<Award className="w-4 h-4 text-purple-600" />
							<span className="text-gray-900">What We Care About</span>
						</div>
						<h2 className="mb-6 text-gray-900">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								What Guides Us
							</span>
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							What matters to us as we build Danke
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						{[
							{
								icon: Heart,
								title: "Make It Effortless",
								description: "Celebrating someone should be easy and joyful, not complicated. We remove friction wherever we can.",
								color: "bg-rose-100 text-rose-600",
								borderColor: "border-rose-200",
							},
							{
								icon: Users,
								title: "Listen and Learn",
								description: "The best features come from people who use Danke. We pay attention to what helps celebrations shine.",
								color: "bg-blue-100 text-blue-600",
								borderColor: "border-blue-200",
							},
							{
								icon: Shield,
								title: "Respect Privacy",
								description: "Your celebrations and memories are precious. We protect your data and never sell it or show ads.",
								color: "bg-green-100 text-green-600",
								borderColor: "border-green-200",
							},
							{
								icon: Globe,
								title: "Free for Everyone",
								description: "Everyone deserves to celebrate the people they care about. No paywalls, no premium tiers—ever.",
								color: "bg-orange-100 text-orange-600",
								borderColor: "border-orange-200",
							},
							{
								icon: Smile,
								title: "Delight in Details",
								description: "Smooth animations, beautiful layouts, thoughtful interactions—small touches that make celebrations special.",
								color: "bg-purple-100 text-purple-600",
								borderColor: "border-purple-200",
							},
							{
								icon: CheckCircle,
								title: "Keep Improving",
								description: "When something breaks, we fix it. When something could bring more joy, we enhance it.",
								color: "bg-pink-100 text-pink-600",
								borderColor: "border-pink-200",
							},
						].map((value, idx) => {
							const Icon = value.icon;
							return (
								<div
									key={value.title}
									className={`bg-white border-2 ${value.borderColor} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
									style={{
										animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
										opacity: 0,
									}}
								>
									<div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-4`}>
										<Icon className="w-7 h-7" />
									</div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
									<p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Behind the Scenes */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
				<div className="container-default">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-12">
							<div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-6 py-3 rounded-full text-sm font-medium mb-6">
								<Code className="w-4 h-4 text-purple-600" />
								<span className="text-gray-900">Behind the Scenes</span>
							</div>
							<h2 className="mb-6 text-gray-900">
								<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
									How We Work
								</span>
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
										className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8 hover:shadow-md transition-all duration-300"
										style={{
											animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
											opacity: 0,
										}}
									>
										<Icon className="w-10 h-10 text-purple-600 mb-4" />
										<h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
										<p className="text-gray-600 leading-relaxed">{item.description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-purple-600 to-purple-800 relative overflow-hidden">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

				<div className="container-narrow relative z-10">
					<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 md:p-20 text-center shadow-2xl">
						<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-sm font-medium mb-8">
							<MessageCircle className="w-4 h-4 text-white" />
							<span className="text-white">Let's Connect</span>
						</div>

						<h2 className="mb-6 text-white">
							Questions or Suggestions?
							<br />
							<span className="text-white/90">We'd like to hear from you</span>
						</h2>

						<p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
							If you have ideas, found a bug, or just want to say hi, feel free to reach out.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Link href="/contact">
								<Button
									size="lg"
									className="bg-white hover:bg-gray-100 text-purple-700 border-0 min-w-[220px] h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
								>
									<MessageCircle className="w-5 h-5 mr-2" />
									Contact Us
								</Button>
							</Link>
							<Link href="/features">
								<Button
									variant="outline"
									size="lg"
									className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-w-[220px] h-14 text-base font-semibold"
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
