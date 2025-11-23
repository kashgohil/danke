import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import {
	Cake,
	Gift,
	GraduationCap,
	Heart,
	Home,
	ImageIcon,
	Lock,
	MessageCircle,
	PartyPopper,
	Sparkles,
	Star,
	Users,
	Wand2,
	Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="relative min-h-screen bg-white flex flex-col">
			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-orange-50 flex-shrink-0">
				<div className="container-default section-padding relative z-10">
					<div className="text-center max-w-5xl mx-auto">
						{/* Badge */}
						<div className="animate-in mb-12">
							<div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-purple-200 px-6 py-3 rounded-full text-sm font-medium shadow-sm">
								<Sparkles className="w-4 h-4 text-purple-600" />
								<span className="text-gray-900">Celebrate moments that matter</span>
							</div>
						</div>

						{/* Main Heading */}
						<h1 className="animate-in-delay-1 mb-8 text-gray-900">
							<span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
								Appreciation Boards
							</span>
							<span className="block text-gray-700">Made Beautiful</span>
						</h1>

						{/* Subheading */}
						<p className="animate-in-delay-2 text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
							Collect heartfelt messages, stunning memories, and joyful celebrations. Share love
							with people who matter most.
						</p>

						{/* CTA Buttons */}
						<div className="animate-in-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
							<SignedIn>
								<Link href="/create-board">
									<Button
										size="lg"
										className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 min-w-[200px] h-14 text-base shadow-lg hover:shadow-xl transition-all"
									>
										<Sparkles className="w-5 h-5 mr-2" />
										Create Board
									</Button>
								</Link>
								<Link href="/dashboard">
									<Button
										variant="outline"
										size="lg"
										className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 min-w-[200px] h-14 text-base"
									>
										My Dashboard
									</Button>
								</Link>
							</SignedIn>
							<SignedOut>
								<SignUpButton>
									<Button
										size="lg"
										className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 min-w-[200px] h-14 text-base shadow-lg hover:shadow-xl transition-all"
									>
										<Sparkles className="w-5 h-5 mr-2" />
										Get Started Free
									</Button>
								</SignUpButton>
								<Button
									variant="outline"
									size="lg"
									className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 min-w-[200px] h-14 text-base"
								>
									Explore Features
								</Button>
							</SignedOut>
						</div>

						{/* Social Proof */}
						<div className="animate-in-delay-4 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
							<div className="flex items-center gap-2">
								<Users className="w-4 h-4 text-purple-600" />
								<span>Loved by thousands</span>
							</div>
							<div className="flex items-center gap-2">
								<Heart className="w-4 h-4 text-orange-500" />
								<span>100% Free forever</span>
							</div>
							<div className="flex items-center gap-2">
								<Lock className="w-4 h-4 text-green-600" />
								<span>Privacy focused</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Board Types Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
				<div className="container-default">
					<div className="text-center mb-20">
						<div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-6 py-3 rounded-full text-sm font-medium mb-6">
							<Star className="w-4 h-4 text-orange-500" />
							<span className="text-gray-900">14 Beautiful Board Types</span>
						</div>
						<h2 className="mb-6 text-gray-900">
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Every Occasion Covered
							</span>
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							From birthdays to farewells, create the perfect board for any celebration
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ name: "Birthday", icon: Cake, color: "from-pink-500 to-rose-500" },
							{ name: "Appreciation", icon: Heart, color: "from-purple-500 to-purple-600" },
							{ name: "Farewell", icon: PartyPopper, color: "from-blue-500 to-cyan-500" },
							{ name: "Congratulations", icon: Star, color: "from-orange-500 to-amber-500" },
							{ name: "Graduation", icon: GraduationCap, color: "from-green-500 to-emerald-500" },
							{ name: "Welcome", icon: Home, color: "from-pink-500 to-orange-500" },
							{ name: "Anniversary", icon: Gift, color: "from-purple-500 to-pink-500" },
							{ name: "And 7 more...", icon: Sparkles, color: "from-blue-500 to-purple-500" },
						].map((type, idx) => {
							const Icon = type.icon;
							return (
								<div
									key={type.name}
									className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
									style={{
										animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
										opacity: 0,
									}}
								>
									<div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
										<Icon className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-gray-900">{type.name}</h3>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gray-50">
				<div className="container-default">
					<div className="text-center mb-20">
						<div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
							<Wand2 className="w-4 h-4 text-purple-600" />
							<span className="text-gray-900">Powerful & Intuitive</span>
						</div>
						<h2 className="mb-6 text-gray-900">
							<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Built for Beautiful Moments
							</span>
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Everything you need to create stunning appreciation boards that bring joy
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: MessageCircle,
								title: "Rich Text Editor",
								description: "Express yourself with beautiful formatting, colors, emojis, and styling options",
								color: "bg-purple-100 text-purple-600",
							},
							{
								icon: ImageIcon,
								title: "Media Uploads",
								description: "Share photos, videos, and audio files to make memories come alive",
								color: "bg-orange-100 text-orange-600",
							},
							{
								icon: Users,
								title: "Easy Sharing",
								description: "Send unique links to view or contribute. Full control over permissions",
								color: "bg-blue-100 text-blue-600",
							},
							{
								icon: Sparkles,
								title: "Beautiful Layouts",
								description: "Automatic masonry layouts that look stunning on every device",
								color: "bg-amber-100 text-amber-600",
							},
							{
								icon: Zap,
								title: "Real-time Updates",
								description: "Watch new messages appear instantly as your community shares love",
								color: "bg-green-100 text-green-600",
							},
							{
								icon: Lock,
								title: "Privacy & Moderation",
								description: "Complete control with moderation tools and advanced privacy settings",
								color: "bg-red-100 text-red-600",
							},
						].map((feature, idx) => {
							const Icon = feature.icon;
							return (
								<div
									key={feature.title}
									className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
									style={{
										animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
										opacity: 0,
									}}
								>
									<div className="mb-6">
										<div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center`}>
											<Icon className="w-7 h-7" />
										</div>
									</div>
									<h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
									<p className="text-gray-600 leading-relaxed">{feature.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-purple-600 to-purple-800 relative overflow-hidden">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

				<div className="container-narrow relative z-10">
					<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 md:p-20 text-center shadow-2xl">
						<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-sm font-medium mb-8">
							<Heart className="w-4 h-4 text-white" />
							<span className="text-white">Start spreading love today</span>
						</div>

						<h2 className="mb-6 text-white">
							Ready to Create
							<br />
							<span className="text-white/90">Your First Board?</span>
						</h2>

						<p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
							Join thousands of people creating beautiful appreciation boards. It&apos;s free, easy,
							and takes less than a minute.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<SignedIn>
								<Link href="/create-board">
									<Button
										size="lg"
										className="bg-white hover:bg-gray-100 text-purple-700 border-0 min-w-[220px] h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
									>
										<Sparkles className="w-5 h-5 mr-2" />
										Create Your Board
									</Button>
								</Link>
							</SignedIn>
							<SignedOut>
								<SignUpButton>
									<Button
										size="lg"
										className="bg-white hover:bg-gray-100 text-purple-700 border-0 min-w-[220px] h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
									>
										<Sparkles className="w-5 h-5 mr-2" />
										Get Started Free
									</Button>
								</SignUpButton>
								<Link href="/features">
									<Button
										variant="outline"
										size="lg"
										className="bg-transparent border-2 border-white text-white hover:bg-white/10 min-w-[220px] h-14 text-base font-semibold"
									>
										Explore All Features
									</Button>
								</Link>
							</SignedOut>
						</div>
					</div>
				</div>
			</section>

			{/* Footer - Full Width */}
			<div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
				<Footer />
			</div>
		</div>
	);
}
