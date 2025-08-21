import { Metadata } from "next";

import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
	title: "Privacy Policy - Danke",
	description: "Learn how Danke collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
	return (
		<div className="space-y-16 text-danke-900 mt-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
				<p className="mb-8">Last updated: January 1, 2025</p>

				<div className="prose prose-lg max-w-none">
					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Introduction</h2>
						<p className="leading-relaxed">
							At Danke, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
							safeguard your information when you use our service. Please read this privacy policy carefully. If you do
							not agree with the terms of this privacy policy, please do not access the application.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

						<h3 className="text-xl font-medium mb-3">Personal Information</h3>
						<p className="leading-relaxed mb-4">
							We may collect personal information that you voluntarily provide to us when you:
						</p>
						<ul className="list-disc pl-6 space-y-2 mb-6">
							<li>Register for an account</li>
							<li>Create or participate in appreciation boards</li>
							<li>Upload content or media</li>
							<li>Contact us for support</li>
							<li>Subscribe to our newsletter</li>
						</ul>

						<h3 className="text-xl font-medium mb-3">Automatically Collected Information</h3>
						<p className="leading-relaxed mb-4">
							We may automatically collect certain information about your device and usage patterns, including:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>IP address and location data</li>
							<li>Browser type and version</li>
							<li>Device information</li>
							<li>Usage statistics and analytics</li>
							<li>Cookies and similar tracking technologies</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
						<p className="leading-relaxed mb-4">We use the information we collect for various purposes, including:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>Providing and maintaining our service</li>
							<li>Processing your requests and transactions</li>
							<li>Sending you technical notices and support messages</li>
							<li>Communicating with you about products, services, and events</li>
							<li>Improving our service and developing new features</li>
							<li>Monitoring usage and analyzing trends</li>
							<li>Detecting and preventing fraud and abuse</li>
							<li>Complying with legal obligations</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
						<p className="leading-relaxed mb-4">
							We do not sell, trade, or otherwise transfer your personal information to third parties except in the
							following circumstances:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>With your consent:</strong> When you explicitly agree to share information
							</li>
							<li>
								<strong>Service providers:</strong> With trusted third-party service providers who assist us in
								operating our service
							</li>
							<li>
								<strong>Legal requirements:</strong> When required by law or to protect our rights and safety
							</li>
							<li>
								<strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets
							</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Data Security</h2>
						<p className="leading-relaxed">
							We implement appropriate technical and organizational security measures to protect your personal
							information against unauthorized access, alteration, disclosure, or destruction. However, please note that
							no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee
							absolute security.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
						<p className="leading-relaxed">
							We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
							privacy policy, unless a longer retention period is required or permitted by law. When we no longer need
							your personal information, we will securely delete or anonymize it.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
						<p className="leading-relaxed mb-4">
							Depending on your location, you may have certain rights regarding your personal information:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								<strong>Access:</strong> Request access to your personal information
							</li>
							<li>
								<strong>Correction:</strong> Request correction of inaccurate information
							</li>
							<li>
								<strong>Deletion:</strong> Request deletion of your personal information
							</li>
							<li>
								<strong>Portability:</strong> Request a copy of your data in a portable format
							</li>
							<li>
								<strong>Objection:</strong> Object to certain processing of your information
							</li>
							<li>
								<strong>Restriction:</strong> Request restriction of processing
							</li>
						</ul>
						<p className="leading-relaxed mt-4">
							To exercise these rights, please contact us at{" "}
							<a
								href="mailto:privacy@danke.app"
								className="text-danke-gold hover:underline"
							>
								privacy@danke.app
							</a>
							.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
						<p className="leading-relaxed">
							We use cookies and similar tracking technologies to enhance your experience on our service. You can
							control cookie settings through your browser preferences. However, disabling certain cookies may limit
							your ability to use some features of our service.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
						<p className="leading-relaxed">
							Our service is not intended for children under the age of 13. We do not knowingly collect personal
							information from children under 13. If you are a parent or guardian and believe your child has provided us
							with personal information, please contact us immediately.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
						<p className="leading-relaxed">
							Your information may be transferred to and processed in countries other than your own. We ensure that such
							transfers comply with applicable data protection laws and implement appropriate safeguards to protect your
							information.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
						<p className="leading-relaxed">
							We may update this privacy policy from time to time. We will notify you of any changes by posting the new
							privacy policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review
							this privacy policy periodically for any changes.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
						<p className="leading-relaxed">
							If you have any questions about this privacy policy or our privacy practices, please contact us at:
						</p>
						<div className="mt-4 p-4 bg-background/80 backdrop-blur-2xl rounded-lg">
							<p className="text-foreground">
								Email:{" "}
								<a
									href="mailto:privacy@trydanke.link"
									className="text-danke-gold hover:underline"
								>
									privacy@trydanke.link
								</a>
								<br />
								Subject: <span className="text-danke-gold">Privacy Policy Inquiry</span>
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
