import { Github, Heart, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import logo from "public/danke.png";

export function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-background/80 backdrop-blur-sm rounded-t-lg md:rounded-lg">
			<div className="container mx-auto px-4 py-12">
				<div className="flex flex-col md:flex-row gap-8 md:justify-between">
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Image
								src={logo}
								alt="Danke.png"
								height={24}
								width={24}
							/>
							<span className="text-xl font-bold text-danke-gold">Danke</span>
						</div>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Create beautiful appreciation boards to celebrate moments, share gratitude, and build stronger connections
							with your community.
						</p>
						<div className="flex items-center gap-4">
							<Link
								href="https://github.com"
								className="text-muted-foreground hover:text-foreground transition-colors"
								aria-label="GitHub"
							>
								<Github className="w-5 h-5" />
							</Link>
							<Link
								href="https://twitter.com"
								className="text-muted-foreground hover:text-foreground transition-colors"
								aria-label="Twitter"
							>
								<Twitter className="w-5 h-5" />
							</Link>
							<Link
								href="mailto:hello@danke.app"
								className="text-muted-foreground hover:text-foreground transition-colors"
								aria-label="Email"
							>
								<Mail className="w-5 h-5" />
							</Link>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-12 md:justify-between">
						<div className="space-y-4 md:text-end">
							<h3 className="font-semibold text-foreground">Company</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="/about"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Contact
									</Link>
								</li>
								<li>
									<Link
										href="/privacy"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>

						<div className="space-y-4 md:text-end">
							<h3 className="font-semibold text-foreground">Resources</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="/help"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Help Center
									</Link>
								</li>
								<li>
									<Link
										href="/guides"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Guides
									</Link>
								</li>
								<li>
									<Link
										href="/blog"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										href="/status"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Status
									</Link>
								</li>
							</ul>
						</div>

						<div className="space-y-4 md:text-end">
							<h3 className="font-semibold text-foreground">Product</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="/create-board"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Create Board
									</Link>
								</li>
								<li>
									<Link
										href="/dashboard"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										href="/features"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Features
									</Link>
								</li>
								<li>
									<Link
										href="/templates"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Templates
									</Link>
								</li>
								<li>
									<Link
										href="/pricing"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Pricing
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="border-t border-border mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="text-sm text-muted-foreground">© {year} Danke. All rights reserved.</div>
						<div className="flex items-center gap-6 text-sm">
							<Link
								href="/privacy"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Privacy
							</Link>
							<Link
								href="/terms"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Terms
							</Link>
							<Link
								href="/cookies"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Cookies
							</Link>
							<div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
								<span>Made with</span>
								<Heart className="w-3 h-3 text-red-500" />
								<span>for communities</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
