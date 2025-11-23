import { Check, Crown, Heart, Sparkles, Star, Zap } from "lucide-react";
import { Metadata } from "next";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Pricing - Danke",
	description: "Choose the perfect plan for your appreciation boards. Start free and upgrade as your community grows.",
};

export default function PricingPage() {
	const pricingFAQs: Array<{ question: string; answer: string }> = [
		{
			question: "Can I upgrade or downgrade my plan anytime?",
			answer:
				"Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
		},
		{
			question: "What happens to my boards if I downgrade?",
			answer:
				"Your existing boards and messages remain safe. If you exceed the limits of your new plan, you'll have read-only access to the excess content until you upgrade again or remove some boards.",
		},
		{
			question: "Is there a free trial for Pro plans?",
			answer: "Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start your trial.",
		},
		{
			question: "Do you offer discounts for nonprofits or educational institutions?",
			answer:
				"Yes! We offer special pricing for qualified nonprofits and educational institutions. Contact our sales team for more information.",
		},
		{
			question: "What payment methods do you accept?",
			answer:
				"We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice.",
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
						<Star className="w-4 h-4 text-pink-300" />
						<span className="text-white font-semibold">Pricing</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
						<span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
							Simple, Transparent Pricing
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
						Start free and scale as your community grows. No hidden fees, no surprises.
					</p>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 mt-16 relative z-20">
				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{/* Free Plan */}
					<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 relative rounded-3xl overflow-hidden group">
						<CardHeader className="text-center p-8 bg-gray-50/50">
							<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
								<Heart className="w-8 h-8 text-purple-600" />
							</div>
							<CardTitle className="text-2xl mb-2 font-bold text-gray-900">Free</CardTitle>
							<div className="text-5xl font-black text-purple-600 mb-2">
								$0
								<span className="text-lg font-normal text-gray-500 ml-1">/mo</span>
							</div>
							<CardDescription className="text-base text-gray-600">
								Perfect for getting started with small appreciation boards
							</CardDescription>
						</CardHeader>
						<div className="p-8">
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
									<span>Up to 3 boards</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
									<span>50 messages per board</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
									<span>Basic customization</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
									<span>Media uploads (100MB total)</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
									<span>Email support</span>
								</li>
							</ul>
							<Link
								href="/create-board"
								className="block"
							>
								<Button
									className="w-full h-12 text-lg font-semibold bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
									variant="outline"
								>
									Get Started Free
								</Button>
							</Link>
						</div>
					</Card>

					{/* Pro Plan */}
					<Card className="bg-white border-2 border-purple-500 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 relative rounded-3xl overflow-hidden scale-105 z-10 group">
						<div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
							Most Popular
						</div>
						<CardHeader className="text-center p-8 pt-12 bg-purple-50/30">
							<div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
								<Star className="w-8 h-8 text-white" />
							</div>
							<CardTitle className="text-2xl mb-2 font-bold text-gray-900">Pro</CardTitle>
							<div className="text-5xl font-black text-purple-600 mb-2">
								$9
								<span className="text-lg font-normal text-gray-500 ml-1">/mo</span>
							</div>
							<CardDescription className="text-base text-gray-600">Ideal for teams and growing communities</CardDescription>
						</CardHeader>
						<div className="p-8">
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3 text-gray-700 font-medium">
									<Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
									<span>Unlimited boards</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700 font-medium">
									<Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
									<span>Unlimited messages</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700 font-medium">
									<Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
									<span>Advanced customization</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700 font-medium">
									<Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
									<span>Unlimited media uploads (10GB)</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700 font-medium">
									<Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
									<span>Custom branding</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700 font-medium">
									<Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
									<span>Export to PDF</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700 font-medium">
									<Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
									<span>Priority support</span>
								</li>
							</ul>
							<Link
								href="/create-board"
								className="block"
							>
								<Button className="w-full h-14 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25">
									Start Pro Trial
								</Button>
							</Link>
						</div>
					</Card>

					{/* Enterprise Plan */}
					<Card className="bg-white border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:border-purple-200 transition-all duration-300 relative rounded-3xl overflow-hidden group">
						<CardHeader className="text-center p-8 bg-gray-50/50">
							<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
								<Crown className="w-8 h-8 text-blue-600" />
							</div>
							<CardTitle className="text-2xl mb-2 font-bold text-gray-900">Enterprise</CardTitle>
							<div className="text-5xl font-black text-blue-600 mb-2">Custom</div>
							<CardDescription className="text-base text-gray-600">For large organizations with specific needs</CardDescription>
						</CardHeader>
						<div className="p-8">
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<span>Everything in Pro</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<span>Unlimited storage</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<span>Advanced analytics</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<span>SSO integration</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<span>API access</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<span>Dedicated support</span>
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
									<span>Custom integrations</span>
								</li>
							</ul>
							<Link
								href="/contact"
								className="block"
							>
								<Button
									className="w-full h-12 text-lg font-semibold bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
									variant="outline"
								>
									Contact Sales
								</Button>
							</Link>
						</div>
					</Card>
				</div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Compare Plans</h2>
						<p className="text-gray-600 text-lg">Detailed feature breakdown</p>
					</div>
					
					<div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="bg-gray-50/50 border-b border-gray-100">
										<th className="text-left py-6 px-8 font-bold text-gray-900 text-lg">Features</th>
										<th className="text-center py-6 px-8 font-bold text-gray-900 text-lg">Free</th>
										<th className="text-center py-6 px-8 font-bold text-purple-600 text-lg">Pro</th>
										<th className="text-center py-6 px-8 font-bold text-blue-600 text-lg">Enterprise</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									<tr className="hover:bg-gray-50/50 transition-colors">
										<td className="py-5 px-8 text-gray-700 font-medium">Number of boards</td>
										<td className="text-center py-5 px-8 text-gray-600">3</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Unlimited</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Unlimited</td>
									</tr>
									<tr className="hover:bg-gray-50/50 transition-colors">
										<td className="py-5 px-8 text-gray-700 font-medium">Messages per board</td>
										<td className="text-center py-5 px-8 text-gray-600">50</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Unlimited</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Unlimited</td>
									</tr>
									<tr className="hover:bg-gray-50/50 transition-colors">
										<td className="py-5 px-8 text-gray-700 font-medium">Storage</td>
										<td className="text-center py-5 px-8 text-gray-600">100MB</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">10GB</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Unlimited</td>
									</tr>
									<tr className="hover:bg-gray-50/50 transition-colors">
										<td className="py-5 px-8 text-gray-700 font-medium">Custom branding</td>
										<td className="text-center py-5 px-8 text-gray-400">-</td>
										<td className="text-center py-5 px-8">
											<Check className="w-6 h-6 text-purple-600 mx-auto" />
										</td>
										<td className="text-center py-5 px-8">
											<Check className="w-6 h-6 text-blue-600 mx-auto" />
										</td>
									</tr>
									<tr className="hover:bg-gray-50/50 transition-colors">
										<td className="py-5 px-8 text-gray-700 font-medium">Export to PDF</td>
										<td className="text-center py-5 px-8 text-gray-400">-</td>
										<td className="text-center py-5 px-8">
											<Check className="w-6 h-6 text-purple-600 mx-auto" />
										</td>
										<td className="text-center py-5 px-8">
											<Check className="w-6 h-6 text-blue-600 mx-auto" />
										</td>
									</tr>
									<tr className="hover:bg-gray-50/50 transition-colors">
										<td className="py-5 px-8 text-gray-700 font-medium">Analytics</td>
										<td className="text-center py-5 px-8 text-gray-600">Basic</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Advanced</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Enterprise</td>
									</tr>
									<tr className="hover:bg-gray-50/50 transition-colors">
										<td className="py-5 px-8 text-gray-700 font-medium">Support</td>
										<td className="text-center py-5 px-8 text-gray-600">Email</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Priority</td>
										<td className="text-center py-5 px-8 text-gray-900 font-bold">Dedicated</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 px-6 md:px-12 lg:px-24 bg-white mt-16">
				<div className="container-default max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
						<p className="text-gray-600 text-lg">Common questions about our plans</p>
					</div>
					
					<Accordion
						type="single"
						collapsible
						className="space-y-4"
					>
						{pricingFAQs.map((item, index) => (
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

			<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50 mt-16">
				<div className="container-default">
					<h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900">Trusted by Communities Worldwide</h2>
					<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<Card className="border-0 shadow-lg text-center bg-white rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300">
							<CardHeader>
								<div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<Zap className="w-7 h-7 text-purple-600" />
								</div>
								<CardTitle className="text-3xl font-black text-gray-900 mb-1">10,000+</CardTitle>
								<CardDescription className="text-gray-600 font-medium">Boards created</CardDescription>
							</CardHeader>
						</Card>

						<Card className="border-0 shadow-lg text-center bg-white rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300">
							<CardHeader>
								<div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<Heart className="w-7 h-7 text-pink-600" />
								</div>
								<CardTitle className="text-3xl font-black text-gray-900 mb-1">500,000+</CardTitle>
								<CardDescription className="text-gray-600 font-medium">Messages shared</CardDescription>
							</CardHeader>
						</Card>

						<Card className="border-0 shadow-lg text-center bg-white rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300">
							<CardHeader>
								<div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<Star className="w-7 h-7 text-cyan-600" />
								</div>
								<CardTitle className="text-3xl font-black text-gray-900 mb-1">99.9%</CardTitle>
								<CardDescription className="text-gray-600 font-medium">Uptime guarantee</CardDescription>
							</CardHeader>
						</Card>
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
								Start building appreciation today
							</h2>
							<p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
								Join thousands of communities already using Danke to celebrate and connect. Start your free board today.
							</p>
							
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link href="/create-board">
									<Button
										size="lg"
										className="bg-white text-purple-600 hover:bg-gray-100 font-bold h-16 px-8 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
									>
										Start Free Today
									</Button>
								</Link>
								<Link href="/contact">
									<Button
										size="lg"
										variant="outline"
										className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold h-16 px-8 text-lg"
									>
										Contact Sales
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
