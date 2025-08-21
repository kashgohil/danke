import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
	title: "Cookie Policy - Danke",
	description: "Learn about how Danke uses cookies and similar technologies to enhance your experience.",
};

export default function CookiesPage() {
	return (
		<div className="space-y-16 mt-8 text-danke-900">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
				<p className="mb-8">Last updated: January 1, 2025</p>

				<div className="prose prose-lg max-w-none">
					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
						<p className="leading-relaxed">
							Cookies are small text files that are stored on your device when you visit a website. They help websites
							remember information about your visit, such as your preferred language and other settings. This can make
							your next visit easier and the site more useful to you.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
						<p className="leading-relaxed mb-4">
							Danke uses cookies and similar technologies to enhance your experience on our platform. We use cookies for
							the following purposes:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Essential functionality:</strong> To enable core features like user authentication and session
								management
							</li>
							<li>
								<strong>Performance and analytics:</strong> To understand how you use our service and improve its
								performance
							</li>
							<li>
								<strong>Personalization:</strong> To remember your preferences and customize your experience
							</li>
							<li>
								<strong>Security:</strong> To protect against fraud and enhance the security of our service
							</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Types of Cookies</h2>

						<h3 className="text-xl font-medium mb-3">Essential Cookies</h3>
						<p className="leading-relaxed mb-4">
							These cookies are necessary for the website to function properly. They enable basic functions like page
							navigation, access to secure areas, and user authentication. The website cannot function properly without
							these cookies.
						</p>
						<div className="bg-background/50 backdrop-blur-2xl rounded-lg p-4 mb-6">
							<p className="text-sm text-muted-foreground">
								<strong>Examples:</strong> Session cookies, authentication tokens, security cookies
							</p>
						</div>

						<h3 className="text-xl font-medium mb-3">Performance Cookies</h3>
						<p className="leading-relaxed mb-4">
							These cookies collect information about how visitors use our website, such as which pages are visited most
							often and if users get error messages. This information helps us improve how our website works.
						</p>
						<div className="bg-background/50 backdrop-blur-2xl rounded-lg p-4 mb-6">
							<p className="text-sm text-muted-foreground">
								<strong>Examples:</strong> Google Analytics, page load times, error tracking
							</p>
						</div>

						<h3 className="text-xl font-medium mb-3">Functional Cookies</h3>
						<p className="leading-relaxed mb-4">
							These cookies allow the website to remember choices you make and provide enhanced, more personal features.
							They may be set by us or by third-party providers whose services we have added to our pages.
						</p>
						<div className="bg-background/50 backdrop-blur-2xl rounded-lg p-4 mb-6">
							<p className="text-sm text-muted-foreground">
								<strong>Examples:</strong> Language preferences, theme settings, board layout preferences
							</p>
						</div>

						<h3 className="text-xl font-medium mb-3">Targeting Cookies</h3>
						<p className="leading-relaxed mb-4">
							These cookies are used to deliver content more relevant to you and your interests. They may be used to
							deliver targeted advertising or to limit the number of times you see an advertisement.
						</p>
						<div className="bg-background/50 backdrop-blur-2xl rounded-lg p-4">
							<p className="text-sm text-muted-foreground">
								<strong>Note:</strong> We currently do not use targeting cookies for advertising purposes.
							</p>
						</div>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
						<p className="leading-relaxed mb-4">
							We may use third-party services that set their own cookies. These services help us provide better
							functionality and understand how our service is being used:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Google Analytics:</strong> Helps us understand website traffic and user behavior
							</li>
							<li>
								<strong>Authentication providers:</strong> Enable secure login functionality
							</li>
							<li>
								<strong>Content delivery networks:</strong> Improve website performance and loading times
							</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
						<p className="leading-relaxed mb-4">You have several options for managing cookies:</p>

						<h3 className="text-xl font-medium mb-3">Browser Settings</h3>
						<p className="leading-relaxed mb-4">
							Most web browsers allow you to control cookies through their settings. You can:
						</p>
						<ul className="list-disc pl-6 space-y-2 mb-6">
							<li>Block all cookies</li>
							<li>Block third-party cookies only</li>
							<li>Delete cookies when you close your browser</li>
							<li>Set exceptions for specific websites</li>
						</ul>

						<h3 className="text-xl font-medium mb-3">Cookie Consent</h3>
						<p className="leading-relaxed mb-4">
							When you first visit our website, you&apos;ll see a cookie consent banner that allows you to:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Accept all cookies</li>
							<li>Reject non-essential cookies</li>
							<li>Customize your cookie preferences</li>
							<li>Learn more about each type of cookie we use</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Impact of Disabling Cookies</h2>
						<p className="leading-relaxed mb-4">
							While you can disable cookies, doing so may affect your experience on our website:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Essential cookies:</strong> Disabling these will prevent you from logging in and using core
								features
							</li>
							<li>
								<strong>Performance cookies:</strong> We won&apos;t be able to improve the website based on usage data
							</li>
							<li>
								<strong>Functional cookies:</strong> Your preferences won&apos;t be remembered between visits
							</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Cookie Retention Periods</h2>
						<p className="leading-relaxed mb-4">Different cookies have different retention periods:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Session cookies:</strong> Deleted when you close your browser
							</li>
							<li>
								<strong>Persistent cookies:</strong> Remain on your device for a set period (typically 30 days to 2
								years)
							</li>
							<li>
								<strong>Authentication cookies:</strong> Usually expire after 30 days of inactivity
							</li>
							<li>
								<strong>Preference cookies:</strong> May persist for up to 1 year
							</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
						<p className="leading-relaxed">
							We may update this Cookie Policy from time to time to reflect changes in our practices or for other
							operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
							updated policy on our website and updating the &quot;Last updated&quot; date.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Related Policies</h2>
						<p className="leading-relaxed mb-4">
							For more information about how we handle your data, please review our related policies:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<Link
									href="/privacy"
									className="text-danke-900 font-bold hover:underline"
								>
									Privacy Policy
								</Link>{" "}
								- Learn about our data collection and usage practices
							</li>
							<li>
								<Link
									href="/terms"
									className="text-danke-900 font-bold hover:underline"
								>
									Terms of Service
								</Link>{" "}
								- Understand the terms governing your use of our service
							</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
						<p className="leading-relaxed">
							If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
						</p>
						<div className="mt-4 p-4 bg-background/50 backdrop-blur-2xl rounded-lg">
							<p className="text-danke-900">
								Email:{" "}
								<a
									href="mailto:privacy@danke.app"
									className="text-muted-foreground hover:underline"
								>
									privacy@danke.app
								</a>
								<br />
								Subject: <span className="text-muted-foreground">Cookie Policy Inquiry</span>
							</p>
						</div>
					</section>
				</div>
			</div>

			<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-12 md:p-12">
				<Footer />
			</div>
		</div>
	);
}
