import {
	AlertCircle,
	BookOpen,
	CheckCircle,
	HelpCircle,
	Lightbulb,
	Mail,
	MessageSquare,
	Play,
	Search,
	Settings,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import { Metadata } from "next";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Help Center - Danke",
	description:
		"Get help with Danke. Find answers to common questions, troubleshooting guides, and learn how to make the most of your appreciation boards.",
};

export default function HelpPage() {
	const generalFAQs: Array<{ question: string; answer: string }> = [
		{
			question: "How do I create my first board?",
			answer:
				'Click "Create Board" from your dashboard, select a board type that matches your occasion, fill in the basic details (title, description), customize the appearance if desired, and click create. You\'ll immediately get a shareable link!',
		},
		{
			question: "Do contributors need to create an account?",
			answer:
				"No! One of Danke's best features is that contributors don't need to sign up or log in. They can simply click your shared link and start adding their messages, photos, or videos right away.",
		},
		{
			question: "Can I edit a board after creating it?",
			answer:
				"Yes! As the board creator, you can edit the title, description, settings, and appearance at any time from the board management page. Just click the settings icon on your board.",
		},
		{
			question: "How do I share my board with others?",
			answer:
				"Each board has a unique shareable link. Copy this link from your board's page and share it via email, messaging apps, social media, or any other method. Anyone with the link can contribute (unless you've enabled moderation).",
		},
		{
			question: "Is there a limit to how many messages I can collect?",
			answer:
				"The free plan supports generous limits for most use cases. If you're planning a very large celebration, check out our pricing page for premium options with unlimited messages and additional features.",
		},
		{
			question: "Can I download or export my board?",
			answer:
				"Yes! You can export your board as a PDF, download all media files in a zip archive, or create a shareable digital version. This is perfect for creating lasting keepsakes or printed memories.",
		},
	];

	const troubleshootingFAQs: Array<{ question: string; answer: string }> = [
		{
			question: "I can't see messages that were submitted",
			answer:
				"If you've enabled moderation, messages need to be approved before they appear. Check your board settings and moderation queue. Also ensure you're viewing the latest version by refreshing the page.",
		},
		{
			question: "The shareable link isn't working",
			answer:
				"Make sure you've copied the complete link including the https:// prefix. Check that your board is set to 'Active' status and not archived. If problems persist, try generating a new link from your board settings.",
		},
		{
			question: "Images or videos aren't uploading",
			answer:
				"Check that your files are in supported formats (JPG, PNG, GIF for images; MP4, MOV for videos). Ensure files aren't too large (max 10MB per file). Try using a different browser if the issue continues.",
		},
		{
			question: "I forgot my password",
			answer:
				"Click the 'Forgot Password' link on the sign-in page. Enter your email address and we'll send you instructions to reset your password. Check your spam folder if you don't see the email within a few minutes.",
		},
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
						<HelpCircle className="w-4 h-4 text-pink-300" />
						<span className="text-white font-semibold">Help Center</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
						<span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
							How Can We Help?
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
						Find answers to common questions, learn how to use Danke effectively, and get support when you need
						it.
					</p>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			{/* Quick Help Cards */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
							<Zap className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">Quick Help</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Popular Topics</h2>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						<Link href="/guides">
							<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden group cursor-pointer h-full">
								<CardHeader className="p-8">
									<div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
										<BookOpen className="w-7 h-7 text-purple-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900 mb-3">Getting Started</CardTitle>
									<CardDescription className="text-base text-gray-600 leading-relaxed">
										Learn the basics of creating and managing your first appreciation board.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>

						<Link href="#faqs">
							<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-pink-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden group cursor-pointer h-full">
								<CardHeader className="p-8">
									<div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
										<MessageSquare className="w-7 h-7 text-pink-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900 mb-3">FAQs</CardTitle>
									<CardDescription className="text-base text-gray-600 leading-relaxed">
										Find quick answers to the most frequently asked questions.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>

						<Link href="#troubleshooting">
							<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-cyan-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden group cursor-pointer h-full">
								<CardHeader className="p-8">
									<div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
										<Settings className="w-7 h-7 text-cyan-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900 mb-3">Troubleshooting</CardTitle>
									<CardDescription className="text-base text-gray-600 leading-relaxed">
										Resolve common issues and get technical help.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>

						<Link href="/contact">
							<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden group cursor-pointer h-full">
								<CardHeader className="p-8">
									<div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
										<Mail className="w-7 h-7 text-orange-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900 mb-3">Contact Support</CardTitle>
									<CardDescription className="text-base text-gray-600 leading-relaxed">
										Can't find what you need? Get in touch with our support team.
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					</div>
				</div>
			</section>

			{/* How-To Guides */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
							<Lightbulb className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">Step-by-Step</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How-To Guides</h2>
						<p className="text-gray-600 text-lg max-w-2xl mx-auto">
							Learn how to make the most of Danke with these detailed guides
						</p>
					</div>
					<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
										<Play className="w-6 h-6 text-purple-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900">Creating Your First Board</CardTitle>
								</div>
								<CardDescription className="space-y-4 text-gray-600">
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Sign in to your Danke account or create one</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Click "Create Board" and choose your occasion type</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Add a compelling title and description</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Customize colors, layout, and privacy settings</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Share the link and start collecting messages!</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-pink-200 transition-all duration-300 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
										<Users className="w-6 h-6 text-pink-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900">Inviting Contributors</CardTitle>
								</div>
								<CardDescription className="space-y-4 text-gray-600">
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Copy your board's unique shareable link</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Share via email, messaging apps, or social media</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Include context about who the board is for</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Set a deadline to encourage timely participation</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Send gentle reminders as the deadline approaches</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-cyan-200 transition-all duration-300 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center">
										<Settings className="w-6 h-6 text-cyan-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900">Managing Board Settings</CardTitle>
								</div>
								<CardDescription className="space-y-4 text-gray-600">
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Access settings from the board management page</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Enable/disable moderation for content approval</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Control privacy settings and link sharing</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Customize appearance and layout options</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Archive or delete boards when no longer needed</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-orange-200 transition-all duration-300 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
										<Sparkles className="w-6 h-6 text-orange-600" />
									</div>
									<CardTitle className="text-xl font-bold text-gray-900">Presenting Your Board</CardTitle>
								</div>
								<CardDescription className="space-y-4 text-gray-600">
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Use slideshow mode for beautiful presentations</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Review and moderate messages before the reveal</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Share screen for group viewing during celebrations</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Export as PDF for printing or digital sharing</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm">Keep the board active for ongoing access</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* General FAQs */}
			<section
				id="faqs"
				className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16"
			>
				<div className="container-default max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
							<MessageSquare className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">General Questions</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
						<p className="text-gray-600 text-lg">Common questions about using Danke</p>
					</div>

					<Accordion
						type="single"
						collapsible
						className="space-y-4"
					>
						{generalFAQs.map((item, index) => (
							<AccordionItem
								key={index}
								value={`general-${index}`}
								className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
							>
								<AccordionTrigger className="px-6 py-4 text-left cursor-pointer hover:no-underline hover:bg-gray-50/50 [&[data-state=open]>svg]:rotate-180">
									<h3 className="text-lg font-bold text-gray-900 pr-4">{item.question}</h3>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6 pt-2">
									<p className="text-gray-600 leading-relaxed text-base">{item.answer}</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			{/* Troubleshooting Section */}
			<section
				id="troubleshooting"
				className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16"
			>
				<div className="container-default max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-2 bg-white border border-orange-200 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
							<AlertCircle className="w-4 h-4 text-orange-600" />
							<span className="text-orange-600">Troubleshooting</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Common Issues & Solutions</h2>
						<p className="text-gray-600 text-lg">Quick fixes for common problems</p>
					</div>

					<Accordion
						type="single"
						collapsible
						className="space-y-4"
					>
						{troubleshootingFAQs.map((item, index) => (
							<AccordionItem
								key={index}
								value={`troubleshooting-${index}`}
								className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
							>
								<AccordionTrigger className="px-6 py-4 text-left cursor-pointer hover:no-underline hover:bg-gray-50/50 [&[data-state=open]>svg]:rotate-180">
									<h3 className="text-lg font-bold text-gray-900 pr-4">{item.question}</h3>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6 pt-2">
									<p className="text-gray-600 leading-relaxed text-base">{item.answer}</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			{/* Still Need Help Section */}
			<section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden mt-16">
				<div className="container-narrow relative z-10">
					<div className="bg-purple-600 rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
						{/* Decorative Background */}
						<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

						<div className="relative z-10">
							<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-sm font-medium mb-8">
								<Mail className="w-4 h-4 text-white" />
								<span className="text-white font-bold">Still Need Help?</span>
							</div>

							<h2 className="text-3xl md:text-5xl font-black mb-6 text-white">Can't Find What You're Looking For?</h2>
							<p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
								Our support team is here to help. Get in touch and we'll respond within 24 hours.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/contact">
									<Button
										size="lg"
										className="bg-white text-purple-600 hover:bg-gray-100 font-bold h-16 px-8 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
									>
										<Mail className="w-5 h-5 mr-2" />
										Contact Support
									</Button>
								</Link>
								<Link href="/guides">
									<Button
										size="lg"
										variant="outline"
										className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold h-16 px-8 text-lg"
									>
										<BookOpen className="w-5 h-5 mr-2" />
										View All Guides
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
