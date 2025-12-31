import { Cookie } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
	title: "Cookie Policy - Danke",
	description: "Learn about how Danke uses cookies and similar technologies to enhance your experience.",
};

export default function CookiesPage() {
	return (
		<div className="relative min-h-screen bg-gray-50 flex flex-col overflow-hidden">
			{/* Hero Section */}
			<section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-purple-900">
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
				</div>

				<div className="container-default section-padding relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<div className="animate-in mb-8">
							<div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
								<Cookie className="w-4 h-4 text-pink-300" />
								<span className="text-white font-semibold">Cookie Policy</span>
							</div>
						</div>

						<h1 className="animate-in-delay-1 mb-8 text-white">
							<span className="block text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
								Cookie Policy
							</span>
							<span className="block text-2xl md:text-3xl text-white/90 font-light">How we use cookies</span>
						</h1>
					</div>
				</div>

				{/* Floating Decorative Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
			</section>

			<div className="max-w-5xl mx-auto px-6 py-20">
				<div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 lg:p-16">
					<p className="mb-12 text-gray-500 text-center text-sm">Last updated: January 1, 2025</p>

					<div className="space-y-12">
						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">What Are Cookies?</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								Cookies are small text files that are stored on your device when you visit a website. They help websites
								remember information about your visit, such as your preferred language and other settings. This can make
								your next visit easier and the site more useful to you.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">How We Use Cookies</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								Danke uses cookies and similar technologies to enhance your experience on our platform. We use cookies for
								the following purposes:
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Essential functionality:</strong> To enable core features like user authentication and session management</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Performance and analytics:</strong> To understand how you use our service and improve its performance</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Personalization:</strong> To remember your preferences and customize your experience</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Security:</strong> To protect against fraud and enhance the security of our service</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-6 text-gray-900">Types of Cookies</h2>

							<div className="space-y-8">
								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Essential Cookies</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										These cookies are necessary for the website to function properly. They enable basic functions like page
										navigation, access to secure areas, and user authentication. The website cannot function properly without
										these cookies.
									</p>
									<div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
										<p className="text-gray-700">
											<strong className="text-gray-900">Examples:</strong> Session cookies, authentication tokens, security cookies
										</p>
									</div>
								</div>

								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Performance Cookies</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										These cookies collect information about how visitors use our website, such as which pages are visited most
										often and if users get error messages. This information helps us improve how our website works.
									</p>
									<div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
										<p className="text-gray-700">
											<strong className="text-gray-900">Examples:</strong> Google Analytics, page load times, error tracking
										</p>
									</div>
								</div>

								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Functional Cookies</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										These cookies allow the website to remember choices you make and provide enhanced, more personal features.
										They may be set by us or by third-party providers whose services we have added to our pages.
									</p>
									<div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
										<p className="text-gray-700">
											<strong className="text-gray-900">Examples:</strong> Language preferences, theme settings, board layout preferences
										</p>
									</div>
								</div>

								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Targeting Cookies</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										These cookies are used to deliver content more relevant to you and your interests. They may be used to
										deliver targeted advertising or to limit the number of times you see an advertisement.
									</p>
									<div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
										<p className="text-gray-700">
											<strong className="text-gray-900">Note:</strong> We currently do not use targeting cookies for advertising purposes.
										</p>
									</div>
								</div>
							</div>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Third-Party Cookies</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								We may use third-party services that set their own cookies. These services help us provide better
								functionality and understand how our service is being used:
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Google Analytics:</strong> Helps us understand website traffic and user behavior</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Authentication providers:</strong> Enable secure login functionality</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Content delivery networks:</strong> Improve website performance and loading times</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-6 text-gray-900">Managing Your Cookie Preferences</h2>
							<p className="leading-relaxed mb-4 text-gray-700">You have several options for managing cookies:</p>

							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Browser Settings</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										Most web browsers allow you to control cookies through their settings. You can:
									</p>
									<ul className="space-y-2">
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Block all cookies</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Block third-party cookies only</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Delete cookies when you close your browser</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Set exceptions for specific websites</span>
										</li>
									</ul>
								</div>

								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Cookie Consent</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										When you first visit our website, you&apos;ll see a cookie consent banner that allows you to:
									</p>
									<ul className="space-y-2">
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Accept all cookies</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Reject non-essential cookies</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Customize your cookie preferences</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Learn more about each type of cookie we use</span>
										</li>
									</ul>
								</div>
							</div>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Impact of Disabling Cookies</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								While you can disable cookies, doing so may affect your experience on our website:
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Essential cookies:</strong> Disabling these will prevent you from logging in and using core features</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Performance cookies:</strong> We won&apos;t be able to improve the website based on usage data</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Functional cookies:</strong> Your preferences won&apos;t be remembered between visits</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Cookie Retention Periods</h2>
							<p className="leading-relaxed mb-4 text-gray-700">Different cookies have different retention periods:</p>
							<ul className="space-y-2">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Session cookies:</strong> Deleted when you close your browser</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Persistent cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Authentication cookies:</strong> Usually expire after 30 days of inactivity</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Preference cookies:</strong> May persist for up to 1 year</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Updates to This Policy</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								We may update this Cookie Policy from time to time to reflect changes in our practices or for other
								operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
								updated policy on our website and updating the &quot;Last updated&quot; date.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Related Policies</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								For more information about how we handle your data, please review our related policies:
							</p>
							<ul className="space-y-2">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>
										<Link
											href="/privacy"
											className="text-purple-600 font-bold hover:underline"
										>
											Privacy Policy
										</Link>{" "}
										- Learn about our data collection and usage practices
									</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>
										<Link
											href="/terms"
											className="text-purple-600 font-bold hover:underline"
										>
											Terms of Service
										</Link>{" "}
										- Understand the terms governing your use of our service
									</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h2>
							<p className="leading-relaxed text-gray-700 mb-6">
								If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
							</p>
							<div className="p-8 bg-purple-50 rounded-2xl border-2 border-purple-200">
								<div className="text-gray-900 space-y-2">
									<div className="flex items-center gap-2">
										<span className="font-bold text-gray-900">Email:</span>
										<a
											href="mailto:privacy@danke.app"
											className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
										>
											privacy@danke.app
										</a>
									</div>
									<div className="flex items-center gap-2">
										<span className="font-bold text-gray-900">Subject:</span>
										<span className="font-semibold text-purple-700">Cookie Policy Inquiry</span>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
				<Footer />
			</div>
		</div>
	);
}
