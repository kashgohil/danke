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

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Guides - Danke",
	description: "Learn how to create beautiful appreciation boards with our comprehensive guides and tutorials.",
};

export default function GuidesPage() {
	return (
		<div className="space-y-16 mt-8 mx-auto">
			<section className="text-center">
				<h1 className="text-4xl md:text-6xl mt-12 font-bold mb-6 text-danke-900">
					Learn to Create
					<br />
					<span className="text-danke-gold">Amazing Boards</span>
				</h1>
				<p className="text-xl max-w-3xl mx-auto leading-relaxed text-danke-900">
					Master the art of appreciation with our step-by-step guides, best practices, and expert tips for creating
					meaningful boards that bring communities together.
				</p>
			</section>

			<section className="py-16 -mx-4 px-4">
				<div className="mx-auto">
					<div className="flex flex-col md:flex-row items-center gap-12">
						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
							<CardHeader className="text-center">
								<div className="w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-danke-900">1</span>
								</div>
								<CardTitle>Create Your Board</CardTitle>
								<CardDescription>
									Choose a template, add a title and description, then customize your board&apos;s appearance to match
									the occasion.
								</CardDescription>
							</CardHeader>
						</Card>
						<MoveRight
							size={84}
							className="hidden md:block text-danke-900"
						/>
						<MoveDown
							size={48}
							className="md:hidden text-danke-900"
						/>
						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
							<CardHeader className="text-center">
								<div className="w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-danke-900">2</span>
								</div>
								<CardTitle>Share the Link</CardTitle>
								<CardDescription>
									Copy your unique board link and share it with friends, colleagues, or community members via email or
									social media.
								</CardDescription>
							</CardHeader>
						</Card>
						<MoveRight
							size={84}
							className="hidden md:block text-danke-900"
						/>
						<MoveDown
							size={48}
							className="md:hidden text-danke-900"
						/>
						<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
							<CardHeader className="text-center">
								<div className="w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-danke-900">3</span>
								</div>
								<CardTitle>Watch It Grow</CardTitle>
								<CardDescription>
									Contributors add messages, photos, and memories in real-time. No account required for them to
									participate!
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-900">Detailed Guides</h2>
				<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<BookOpen className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Board Creation Basics</CardTitle>
							<CardDescription className="space-y-3">
								<p>Learn the fundamentals of creating your first board:</p>
								<ul className="space-y-2 text-sm">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Choosing the right template for your occasion
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Writing compelling titles and descriptions
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Setting up basic privacy and moderation
									</li>
								</ul>
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Palette className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Customization & Themes</CardTitle>
							<CardDescription className="space-y-3">
								<p>Make your board uniquely yours:</p>
								<ul className="space-y-2 text-sm">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Selecting colors that match your brand or event
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Adding custom backgrounds and logos
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Choosing layout styles for different content types
									</li>
								</ul>
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Share2 className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Sharing Strategies</CardTitle>
							<CardDescription className="space-y-3">
								<p>Get maximum participation with effective sharing:</p>
								<ul className="space-y-2 text-sm">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Crafting invitation messages that inspire action
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Using multiple channels for broader reach
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Timing your invitations for maximum impact
									</li>
								</ul>
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Settings className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Advanced Features</CardTitle>
							<CardDescription className="space-y-3">
								<p>Unlock the full potential of your boards:</p>
								<ul className="space-y-2 text-sm">
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Setting up moderation and content filtering
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Managing team permissions and collaboration
									</li>
									<li className="flex items-center gap-2">
										<CheckCircle className="w-4 h-4 text-danke-gold" />
										Exporting and archiving your boards
									</li>
								</ul>
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			<section className="py-16 -mx-4 px-4 bg-background/50 backdrop-blur-lg md:rounded-lg">
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">Guides by Occasion</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Heart className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Farewell Boards</CardTitle>
							<CardDescription>
								Create meaningful goodbye experiences with tips for collecting heartfelt messages, organizing team
								contributions, and presenting the final board.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Sparkles className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Birthday Celebrations</CardTitle>
							<CardDescription>
								Make birthdays special with photo collections, surprise coordination, and creative message prompts that
								capture cherished memories.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Users className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Team Recognition</CardTitle>
							<CardDescription>
								Celebrate achievements and milestones with structured feedback, peer recognition, and professional
								presentation formats.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<Zap className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Event Memories</CardTitle>
							<CardDescription>
								Capture special moments from weddings, graduations, and community events with multimedia collections and
								guest contributions.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<MessageSquare className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Customer Testimonials</CardTitle>
							<CardDescription>
								Collect authentic feedback and testimonials with professional formatting, easy sharing, and integration
								with marketing materials.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-danke-gold rounded-lg flex items-center justify-center mb-4">
								<BookOpen className="w-6 h-6 text-danke-900" />
							</div>
							<CardTitle>Memorial Tributes</CardTitle>
							<CardDescription>
								Create lasting tributes with sensitive moderation, family collaboration, and meaningful ways to preserve
								and share memories.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			<section>
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-900">Best Practices & Tips</h2>
				<div className="max-w-4xl mx-auto space-y-8 text-danke-900">
					<div className="grid md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<h3 className="text-xl font-semibold">Encouraging Participation</h3>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Send personal invitations with context about why their contribution matters</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Provide example messages or prompts to help people get started</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Set a deadline to create urgency and ensure timely participation</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Follow up with gentle reminders for important contributors</span>
								</li>
							</ul>
						</div>

						<div className="space-y-6">
							<h3 className="text-xl font-semibold">Creating Impact</h3>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Choose meaningful timing that aligns with the occasion or milestone</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Curate and organize messages before the big reveal for maximum impact</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Present the board in person when possible for an emotional moment</span>
								</li>
								<li className="flex items-start gap-3">
									<div className="p-1.5 bg-background rounded-full">
										<ArrowRight className="w-5 h-5 text-danke-gold mt-0.5 flex-shrink-0" />
									</div>
									<span>Create a lasting keepsake by exporting or printing the final board</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 -mx-4 px-4 bg-background/50 backdrop-blur-lg md:rounded-lg">
				<h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">Frequently Asked Questions</h2>
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-danke-900">How many people can contribute to a board?</h3>
						<p className="text-muted-foreground">
							There&apos;s no limit to the number of contributors! Our boards are designed to handle everything from
							intimate gatherings to company-wide celebrations with hundreds of participants.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-danke-900">Can I moderate messages before they appear?</h3>
						<p className="text-muted-foreground">
							Yes! You can enable moderation to review all messages before they go live on your board. This ensures
							quality control and appropriateness for your specific occasion.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-danke-900">What file types can contributors upload?</h3>
						<p className="text-muted-foreground">
							Contributors can upload images (JPG, PNG, GIF), videos (MP4, MOV), and audio files (MP3, WAV). We
							automatically optimize media for fast loading while maintaining quality.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-danke-900">How long do boards stay active?</h3>
						<p className="text-muted-foreground">
							Boards remain active indefinitely on our free plan. You can archive or delete them at any time, and
							premium plans offer additional storage and backup options.
						</p>
					</div>

					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-danke-900">Can I export my board for offline use?</h3>
						<p className="text-muted-foreground">
							Absolutely! You can export your board as a PDF, create a digital archive, or even order a printed version.
							This makes it perfect for creating lasting keepsakes.
						</p>
					</div>
				</div>
			</section>

			<section className="text-center py-16 -mx-4 px-4 bg-gradient-to-r rounded-lg text-danke-900">
				<h2 className="text-3xl font-bold mb-6">Ready to Create Your Board?</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
					Put these guides into practice and start building meaningful connections with your first appreciation board.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/create-board">
						<Button
							size="lg"
							className="font-semibold"
						>
							Create Your First Board
						</Button>
					</Link>
					<Link href="/contact">
						<Button
							size="lg"
							variant="outline"
							className="text-white font-semibold"
						>
							Need More Help?
						</Button>
					</Link>
				</div>
			</section>

			<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-12 md:p-12">
				<Footer />
			</div>
		</div>
	);
}
