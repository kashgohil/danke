import { Clock, Mail, MessageCircle, Send, Twitter } from "lucide-react";
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
		<div className="space-y-16 mt-8 mx-auto">
			<section className="text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-6 text-danke-900">Contact Us</h1>
				<p className="text-xl max-w-3xl mx-auto leading-relaxed text-danke-900">
					We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
				</p>
			</section>

			<section className="flex gap-12 max-w-6xl mx-auto">
				<div className="space-y-6 max-w-3xl mx-auto bg-background/80 backdrop-blur-2xl rounded-lg p-12">
					<div>
						<h2 className="text-2xl font-bold mb-2 text-teal">Send us a message</h2>
						<p className="text-muted-foreground mb-6">
							Fill out the form below and we&apos;ll get back to you within 24 hours.
						</p>
					</div>

					<form className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									placeholder="John"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									placeholder="Doe"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="john@example.com"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="subject">Subject</Label>
							<Input
								id="subject"
								placeholder="How can we help you?"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="message">Message</Label>
							<textarea
								id="message"
								className="min-h-[120px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Tell us more about your question or feedback..."
							/>
						</div>

						<Button className="w-full bg-teal hover:bg-teal/90 text-background">
							<Send className="w-4 h-4 mr-2" />
							Send Message
						</Button>
					</form>
				</div>

				<div className="space-y-6 max-w-3xl mx-auto bg-background/80 backdrop-blur-2xl rounded-lg p-12">
					<div>
						<h2 className="text-2xl font-bold mb-2 text-teal">Get in touch</h2>
						<p className="text-muted-foreground mb-6">
							Prefer to reach out directly? Here are all the ways you can contact us.
						</p>
					</div>

					<div className="space-y-6">
						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
							<CardHeader className="flex flex-row items-center gap-4">
								<div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center">
									<Mail className="w-6 h-6 text-danke-900" />
								</div>
								<div>
									<CardTitle className="text-lg">Email</CardTitle>
									<CardDescription>
										<a
											href="mailto:hello@trydanke.link"
											className="text-danke-600 hover:text-danke-700"
										>
											hello@trydanke.link
										</a>
									</CardDescription>
								</div>
							</CardHeader>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
							<CardHeader className="flex flex-row items-center gap-4">
								<div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center">
									<MessageCircle className="w-6 h-6 text-danke-900" />
								</div>
								<div>
									<CardTitle className="text-lg">Support</CardTitle>
									<CardDescription>
										<a
											href="mailto:support@trydanke.link"
											className="text-danke-600 hover:text-danke-700"
										>
											support@trydanke.link
										</a>
									</CardDescription>
								</div>
							</CardHeader>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
							<CardHeader className="flex flex-row items-center gap-4">
								<div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center">
									<Twitter className="w-6 h-6 text-danke-900" />
								</div>
								<div>
									<CardTitle className="text-lg">Twitter / X</CardTitle>
									<CardDescription>
										<a
											href="https://x.com/trydanke"
											className="text-danke-600 hover:text-danke-700"
										>
											@trydanke
										</a>
									</CardDescription>
								</div>
							</CardHeader>
						</Card>
						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
							<CardHeader className="flex flex-row items-center gap-4">
								<div className="w-12 h-12 bg-teal rounded-full flex items-center justify-center">
									<Clock className="w-6 h-6 text-danke-900" />
								</div>
								<div>
									<CardTitle className="text-lg">Response Time</CardTitle>
									<CardDescription>We typically respond within 24 hours</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			<section className="py-16 -mx-4 px-4 bg-background/80 backdrop-blur-lg rounded-lg">
				<h2 className="text-3xl font-bold text-center mb-12 text-teal">Frequently Asked Questions</h2>
				<div className="max-w-4xl mx-auto">
					<Accordion
						type="single"
						collapsible
						className="space-y-4"
					>
						{contactFAQs.map((item, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="border border-border/40 rounded-lg bg-background/60 overflow-hidden"
							>
								<AccordionTrigger className="px-6 py-4 text-left cursor-pointer transition-colors [&[data-state=open]>svg]:rotate-180">
									<h3 className="text-base text-muted-foreground pr-4">{item.question}</h3>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-4">
									<p className="text-foreground leading-relaxed">{item.answer}</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			{/* Call to Action */}
			<section className="text-center py-20 -mx-4 px-8 bg-coral rounded-3xl text-white shadow-2xl border-4 border-coral/70">
				<h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
					Create your first appreciation board today and start building stronger connections in your community.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						size="lg"
						className="inline-flex items-center justify-center px-6 py-3 bg-teal text-background font-medium rounded-lg hover:bg-teal/90 transition-colors"
					>
						Create Your First Board
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
					>
						View Examples
					</Button>
				</div>
			</section>

			<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-12 md:p-12">
				<Footer />
			</div>
		</div>
	);
}
