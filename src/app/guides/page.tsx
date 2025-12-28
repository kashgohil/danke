import {
	ArrowRight,
	BookOpen,
	CheckCircle,
	Heart,
	MessageSquare,
	MoveDown,
	MoveRight,
	Palette,
	Settings,
	Share2,
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
	title: "Guides - Danke",
	description: "Learn how to create beautiful appreciation boards with our comprehensive guides and tutorials.",
};

export default function GuidesPage() {
	const guidesFAQs: Array<{ question: string; answer: string }> = [
		{
			question: "How many people can contribute to a board?",
			answer:
				"There's no limit to the number of contributors! Our boards are designed to handle everything from intimate gatherings to company-wide celebrations with hundreds of participants.",
		},
		{
			question: "Can I moderate messages before they appear?",
			answer:
				"Yes! You can enable moderation to review all messages before they go live on your board. This ensures quality control and appropriateness for your specific occasion.",
		},
		{
			question: "What file types can contributors upload?",
			answer:
				"Contributors can upload images (JPG, PNG, GIF), videos (MP4, MOV), and audio files (MP3, WAV). We automatically optimize media for fast loading while maintaining quality.",
		},
		{
			question: "How long do boards stay active?",
			answer:
				"Boards remain active indefinitely on our free plan. You can archive or delete them at any time, and premium plans offer additional storage and backup options.",
		},
		{
			question: "Can I export my board for offline use?",
			answer:
				"Absolutely! You can export your board as a PDF, create a digital archive, or even order a printed version. This makes it perfect for creating lasting keepsakes.",
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
						<BookOpen className="w-4 h-4 text-pink-300" />
						<span className="text-white font-semibold">Guides & Tutorials</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
						<span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
							Learn to Create
						</span>
						<br />
						<span className="text-white/90 text-3xl md:text-5xl">Amazing Boards</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
						Master the art of appreciation with our step-by-step guides, best practices, and expert tips for creating
						meaningful boards that bring communities together.
					</p>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			{/* Getting Started Steps */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
							<Sparkles className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">Quick Start</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Getting Started in 3 Steps</h2>
					</div>
					<div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 rounded-3xl overflow-hidden group flex-1">
							<CardHeader className="text-center p-8">
								<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
									<span className="text-3xl font-black text-purple-600">1</span>
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Create Your Board</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Choose a template, add a title and description, then customize your board&apos;s appearance to match
									the occasion.
								</CardDescription>
							</CardHeader>
						</Card>
						<MoveRight
							size={48}
							className="hidden md:block text-purple-300 flex-shrink-0"
						/>
						<MoveDown
							size={48}
							className="md:hidden text-purple-300 flex-shrink-0"
						/>
						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-pink-200 transition-all duration-300 rounded-3xl overflow-hidden group flex-1">
							<CardHeader className="text-center p-8">
								<div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
									<span className="text-3xl font-black text-pink-600">2</span>
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Share the Link</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Copy your unique board link and share it with friends, colleagues, or community members via email or
									social media.
								</CardDescription>
							</CardHeader>
						</Card>
						<MoveRight
							size={48}
							className="hidden md:block text-purple-300 flex-shrink-0"
						/>
						<MoveDown
							size={48}
							className="md:hidden text-purple-300 flex-shrink-0"
						/>
						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-cyan-200 transition-all duration-300 rounded-3xl overflow-hidden group flex-1">
							<CardHeader className="text-center p-8">
								<div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
									<span className="text-3xl font-black text-cyan-600">3</span>
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Watch It Grow</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Contributors add messages, photos, and memories in real-time. No account required for them to
									participate!
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Detailed Guides */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
							<BookOpen className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">In-Depth Guides</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Detailed Guides</h2>
					</div>
					<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
									<BookOpen className="w-7 h-7 text-purple-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Board Creation Basics</CardTitle>
								<CardDescription className="space-y-4 text-gray-600">
									<p className="text-base">Learn the fundamentals of creating your first board:</p>
									<ul className="space-y-3">
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Choosing the right template for your occasion</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Writing compelling titles and descriptions</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Setting up basic privacy and moderation</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-pink-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
									<Palette className="w-7 h-7 text-pink-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Customization & Themes</CardTitle>
								<CardDescription className="space-y-4 text-gray-600">
									<p className="text-base">Make your board uniquely yours:</p>
									<ul className="space-y-3">
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Selecting colors that match your brand or event</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Adding custom backgrounds and logos</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Choosing layout styles for different content types</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-cyan-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
									<Share2 className="w-7 h-7 text-cyan-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Sharing Strategies</CardTitle>
								<CardDescription className="space-y-4 text-gray-600">
									<p className="text-base">Get maximum participation with effective sharing:</p>
									<ul className="space-y-3">
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Crafting invitation messages that inspire action</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Using multiple channels for broader reach</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Timing your invitations for maximum impact</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
									<Settings className="w-7 h-7 text-orange-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Advanced Features</CardTitle>
								<CardDescription className="space-y-4 text-gray-600">
									<p className="text-base">Unlock the full potential of your boards:</p>
									<ul className="space-y-3">
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Setting up moderation and content filtering</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Managing team permissions and collaboration</span>
										</li>
										<li className="flex items-center gap-3">
											<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
											<span className="text-sm">Exporting and archiving your boards</span>
										</li>
									</ul>
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Guides by Occasion */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
							<Heart className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">Occasion Specific</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Guides by Occasion</h2>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-red-200 transition-all duration-300 rounded-3xl overflow-hidden group">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Heart className="w-7 h-7 text-red-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Farewell Boards</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Create meaningful goodbye experiences with tips for collecting heartfelt messages, organizing team
									contributions, and presenting the final board.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-pink-200 transition-all duration-300 rounded-3xl overflow-hidden group">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Sparkles className="w-7 h-7 text-pink-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Birthday Celebrations</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Make birthdays special with photo collections, surprise coordination, and creative message prompts that
									capture cherished memories.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-purple-200 transition-all duration-300 rounded-3xl overflow-hidden group">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Users className="w-7 h-7 text-purple-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Team Recognition</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Celebrate achievements and milestones with structured feedback, peer recognition, and professional
									presentation formats.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-cyan-200 transition-all duration-300 rounded-3xl overflow-hidden group">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<Zap className="w-7 h-7 text-cyan-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Event Memories</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Capture special moments from weddings, graduations, and community events with multimedia collections and
									guest contributions.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-orange-200 transition-all duration-300 rounded-3xl overflow-hidden group">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<MessageSquare className="w-7 h-7 text-orange-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Customer Testimonials</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Collect authentic feedback and testimonials with professional formatting, easy sharing, and integration
									with marketing materials.
								</CardDescription>
							</CardHeader>
						</Card>

						<Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-300 rounded-3xl overflow-hidden group">
							<CardHeader className="p-8">
								<div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<BookOpen className="w-7 h-7 text-blue-600" />
								</div>
								<CardTitle className="text-xl font-bold text-gray-900 mb-3">Memorial Tributes</CardTitle>
								<CardDescription className="text-base text-gray-600 leading-relaxed">
									Create lasting tributes with sensitive moderation, family collaboration, and meaningful ways to preserve
									and share memories.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* Best Practices & Tips */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
							<Zap className="w-4 h-4 text-purple-600" />
							<span className="text-purple-600">Pro Tips</span>
						</div>
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Best Practices & Tips</h2>
					</div>
					<div className="max-w-6xl mx-auto">
						<div className="grid md:grid-cols-2 gap-12">
							<div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
										<Users className="w-6 h-6 text-purple-600" />
									</div>
									<h3 className="text-2xl font-black text-gray-900">Encouraging Participation</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="p-1 bg-purple-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Send personal invitations with context about why their contribution matters</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="p-1 bg-purple-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Provide example messages or prompts to help people get started</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="p-1 bg-purple-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Set a deadline to create urgency and ensure timely participation</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="p-1 bg-purple-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Follow up with gentle reminders for important contributors</span>
									</li>
								</ul>
							</div>

							<div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
										<Sparkles className="w-6 h-6 text-pink-600" />
									</div>
									<h3 className="text-2xl font-black text-gray-900">Creating Impact</h3>
								</div>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<div className="p-1 bg-pink-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-pink-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Choose meaningful timing that aligns with the occasion or milestone</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="p-1 bg-pink-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-pink-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Curate and organize messages before the big reveal for maximum impact</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="p-1 bg-pink-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-pink-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Present the board in person when possible for an emotional moment</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="p-1 bg-pink-100 rounded-full mt-1">
											<ArrowRight className="w-5 h-5 text-pink-600 flex-shrink-0" />
										</div>
										<span className="text-gray-700 leading-relaxed">Create a lasting keepsake by exporting or printing the final board</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
						<p className="text-gray-600 text-lg">Common questions about creating boards</p>
					</div>

					<Accordion
						type="single"
						collapsible
						className="space-y-4"
					>
						{guidesFAQs.map((item, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
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
								Ready to Create Your Board?
							</h2>
							<p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
								Put these guides into practice and start building meaningful connections with your first appreciation board.
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
								<Link href="/contact">
									<Button
										size="lg"
										variant="outline"
										className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold h-16 px-8 text-lg"
									>
										Need More Help?
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
