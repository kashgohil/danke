import { Heart, Shield, Users, Zap } from "lucide-react";
import { Metadata } from "next";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
	title: "About Us - Danke",
	description:
		"Learn about Danke's mission to help communities celebrate moments and share gratitude through beautiful appreciation boards.",
};

export default function AboutPage() {
	return (
		<div className="space-y-16 mt-8 mx-auto">
			<section className="text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-6 text-danke-900">
					About <span className="text-danke-gold">Danke</span>
				</h1>
				<p className="text-xl max-w-3xl mx-auto leading-relaxed text-danke-900">
					We believe in the power of gratitude to strengthen communities and celebrate the moments that matter most.
				</p>
			</section>

			<section className="py-16 -mx-4 px-4 text-center bg-background/80 backdrop-blur-lg rounded-lg">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-danke-gold mb-12">Our Mission</h2>
					<div className="prose prose-lg mx-auto text-foreground">
						<p>
							Danke was born from a simple observation: in our fast-paced digital world, we often forget to pause and
							appreciate the people and moments that make our lives meaningful. We created Danke to bridge that gap,
							providing a beautiful, intuitive platform where communities can come together to celebrate achievements,
							share gratitude, and strengthen their bonds.
						</p>
						<p>
							Whether it&apos;s recognizing a colleague&apos;s hard work, celebrating a friend&apos;s milestone, or
							simply sharing appreciation for everyday kindness, Danke makes it easy to create lasting memories that
							bring people closer together.
						</p>
					</div>
				</div>
			</section>

			<section>
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12 text-danke-900">Our Story</h2>
					<div className="prose prose-lg mx-auto text-danke-800 text-center">
						<p>
							Danke started as a weekend project when our founder noticed how difficult it was to coordinate
							appreciation messages for a departing colleague. What began as a simple solution for collecting thank-you
							notes evolved into something much bigger: a platform that could help any community celebrate their special
							moments.
						</p>
						<p>
							Today, Danke serves thousands of users across the globe, from small teams celebrating project completions
							to large organizations recognizing employee achievements. Every board created on our platform represents a
							moment of human connection, and that&apos;s what drives us forward every day.
						</p>
						<p>
							We&apos;re just getting started. Our vision is to become the go-to platform for community appreciation,
							helping people around the world build stronger, more grateful communities one board at a time.
						</p>
					</div>
				</div>
			</section>

			<section className="py-16 -mx-4 px-4 bg-background/80 backdrop-blur-lg rounded-lg">
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">Our Values</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
						<CardHeader className="flex flex-col gap-2">
							<div className="w-12 h-12 bg-danke-gold rounded-full flex items-center justify-center mb-4 mx-auto">
								<Heart className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Gratitude First</CardTitle>
							<CardDescription>
								We believe gratitude is the foundation of strong relationships and thriving communities.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
						<CardHeader className="flex flex-col gap-2">
							<div className="w-12 h-12 bg-danke-gold rounded-full flex items-center justify-center mb-4 mx-auto">
								<Users className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Community Focused</CardTitle>
							<CardDescription>
								Every feature we build is designed to bring people together and strengthen connections.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
						<CardHeader className="flex flex-col gap-2">
							<div className="w-12 h-12 bg-danke-gold rounded-full flex items-center justify-center mb-4 mx-auto">
								<Zap className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Simple & Powerful</CardTitle>
							<CardDescription>
								We make complex interactions simple, so you can focus on what matters most.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
						<CardHeader className="flex flex-col gap-2">
							<div className="w-12 h-12 bg-danke-gold rounded-full flex items-center justify-center mb-4 mx-auto">
								<Shield className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Privacy & Trust</CardTitle>
							<CardDescription>
								Your data and privacy are sacred to us. We build with security and transparency in mind.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			<section className="py-16 -mx-4 px-4 text-center">
				<h2 className="text-3xl font-bold mb-6 text-danke-900">Get in Touch</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto text-danke-800">
					Have questions, feedback, or just want to say hello? We&apos;d love to hear from you.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="mailto:hello@danke.app"
						className="inline-flex items-center justify-center px-6 py-3 bg-danke-gold text-background font-medium rounded-lg hover:bg-danke-gold/90 transition-colors"
					>
						Contact Us
					</a>
					<a
						href="/help"
						className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
					>
						Help Center
					</a>
				</div>
			</section>

			<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-12 md:p-12">
				<Footer />
			</div>
		</div>
	);
}
