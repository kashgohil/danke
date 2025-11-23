import { Clock, Mail, MessageCircle, Send, Sparkles, Twitter } from "lucide-react";
import { Metadata } from "next";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
	title: "Contact Us - Danke",
	description: "Get in touch with the Danke team. We're here to help with questions, feedback, or support.",
};

export default function ContactPage() {
	const contactFAQs: Array<{ question: string; answer: string }> = [
		{
			question: "How do I create my first board?",
			answer:
				'Creating a board is simple! Just click "Create Board" from your dashboard, choose your board type, add some basic information, and you\'re ready to start collecting messages.',
		},
		{
			question: "Can I customize the appearance of my board?",
			answer:
				"Yes! You can customize colors, layouts, and add your own branding to make each board unique and match your community's style.",
		},
		{
			question: "Is there a limit to how many messages I can collect?",
			answer:
				"Our free plan allows up to 50 messages per board. For larger communities, check out our premium plans for unlimited messages and additional features.",
		},
		{
			question: "How do I share my board with others?",
			answer:
				"Each board gets a unique shareable link that you can send via email, social media, or any other communication method. Contributors don't need to create an account to leave messages.",
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
						<MessageCircle className="w-4 h-4 text-pink-300" />
						<span className="text-white font-semibold">Contact Us</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
						<span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
							Get in Touch
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
						We'd love to hear from you. Send us a message and we'll respond as soon as possible.
					</p>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 mt-16 relative z-20">
				<div className="container-default">
					<div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
						{/* Contact Form */}
						<div className="flex-1 bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
							<div className="mb-8">
								<h2 className="text-3xl font-black mb-2 text-gray-900">Send us a message</h2>
								<p className="text-gray-600 text-lg">
									Fill out the form below and we'll get back to you within 24 hours.
								</p>
							</div>

							<form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="firstName" className="text-gray-700 font-semibold">First Name</Label>
										<Input
											id="firstName"
											placeholder="John"
											className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name</Label>
										<Input
											id="lastName"
											placeholder="Doe"
											className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="john@example.com"
										className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="subject" className="text-gray-700 font-semibold">Subject</Label>
									<Input
										id="subject"
										placeholder="How can we help you?"
										className="h-12 bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message" className="text-gray-700 font-semibold">Message</Label>
									<textarea
										id="message"
										className="min-h-[150px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20 focus-visible:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
										placeholder="Tell us more about your question or feedback..."
									/>
								</div>

								<Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-14 text-lg shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.02]">
									<Send className="w-5 h-5 mr-2" />
									Send Message
								</Button>
							</form>
						</div>

						{/* Contact Info Cards */}
						<div className="lg:w-1/3 space-y-6">
							<div className="bg-purple-50 rounded-3xl p-8 border border-purple-100">
								<h3 className="text-xl font-black text-purple-900 mb-6">Other ways to connect</h3>
								<div className="space-y-4">
									<Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group cursor-pointer">
										<CardHeader className="flex flex-row items-center gap-4 p-6">
											<div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
												<Mail className="w-6 h-6 text-purple-600" />
											</div>
											<div>
												<CardTitle className="text-base font-bold text-gray-900">Email</CardTitle>
												<CardDescription>
													<a
														href="mailto:hello@trydanke.link"
														className="text-purple-600 hover:text-purple-700 font-medium"
													>
														hello@trydanke.link
													</a>
												</CardDescription>
											</div>
										</CardHeader>
									</Card>

									<Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group cursor-pointer">
										<CardHeader className="flex flex-row items-center gap-4 p-6">
											<div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
												<MessageCircle className="w-6 h-6 text-pink-600" />
											</div>
											<div>
												<CardTitle className="text-base font-bold text-gray-900">Support</CardTitle>
												<CardDescription>
													<a
														href="mailto:support@trydanke.link"
														className="text-purple-600 hover:text-purple-700 font-medium"
													>
														support@trydanke.link
													</a>
												</CardDescription>
											</div>
										</CardHeader>
									</Card>

									<Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group cursor-pointer">
										<CardHeader className="flex flex-row items-center gap-4 p-6">
											<div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
												<Twitter className="w-6 h-6 text-cyan-600" />
											</div>
											<div>
												<CardTitle className="text-base font-bold text-gray-900">Twitter / X</CardTitle>
												<CardDescription>
													<a
														href="https://x.com/trydanke"
														className="text-purple-600 hover:text-purple-700 font-medium"
													>
														@trydanke
													</a>
												</CardDescription>
											</div>
										</CardHeader>
									</Card>

									<Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group">
										<CardHeader className="flex flex-row items-center gap-4 p-6">
											<div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
												<Clock className="w-6 h-6 text-orange-600" />
											</div>
											<div>
												<CardTitle className="text-base font-bold text-gray-900">Response Time</CardTitle>
												<CardDescription className="font-medium text-gray-600">Within 24 hours</CardDescription>
											</div>
										</CardHeader>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
						<p className="text-gray-600 text-lg">Common questions about getting in touch</p>
					</div>
					
					<Accordion
						type="single"
						collapsible
						className="space-y-4"
					>
						{contactFAQs.map((item, index) => (
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
								Create your first appreciation board today
							</h2>
							<p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
								Start building stronger connections in your community. It's free and takes less than a minute.
							</p>
							
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									size="lg"
									className="bg-white text-purple-600 hover:bg-gray-100 font-bold h-16 px-8 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
								>
									Create Your First Board
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold h-16 px-8 text-lg"
								>
									View Examples
								</Button>
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
