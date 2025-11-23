import { Shield } from "lucide-react";
import { Metadata } from "next";

import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
	title: "Privacy Policy - Danke",
	description: "Learn how Danke collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
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
								<Shield className="w-4 h-4 text-pink-300" />
								<span className="text-white font-semibold">Privacy Policy</span>
							</div>
						</div>

						<h1 className="animate-in-delay-1 mb-8 text-white">
							<span className="block text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
								Your Privacy Matters
							</span>
							<span className="block text-2xl md:text-3xl text-white/90 font-light">How we protect your data</span>
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
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Introduction</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								At Danke, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
								safeguard your information when you use our service. Please read this privacy policy carefully. If you do
								not agree with the terms of this privacy policy, please do not access the application.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-6 text-gray-900">Information We Collect</h2>

							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Personal Information</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										We may collect personal information that you voluntarily provide to us when you:
									</p>
									<ul className="space-y-2 mb-6">
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Register for an account</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Create or participate in appreciation boards</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Upload content or media</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Contact us for support</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Subscribe to our newsletter</span>
										</li>
									</ul>
								</div>

								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Automatically Collected Information</h3>
									<p className="leading-relaxed mb-4 text-gray-700">
										We may automatically collect certain information about your device and usage patterns, including:
									</p>
									<ul className="space-y-2">
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>IP address and location data</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Browser type and version</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Device information</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Usage statistics and analytics</span>
										</li>
										<li className="flex items-start gap-3 text-gray-700">
											<span className="text-purple-600 mt-1 font-bold">•</span>
											<span>Cookies and similar tracking technologies</span>
										</li>
									</ul>
								</div>
							</div>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">How We Use Your Information</h2>
							<p className="leading-relaxed mb-4 text-gray-700">We use the information we collect for various purposes, including:</p>
							<ul className="space-y-2">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Providing and maintaining our service</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Processing your requests and transactions</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Sending you technical notices and support messages</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Communicating with you about products, services, and events</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Improving our service and developing new features</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Monitoring usage and analyzing trends</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Detecting and preventing fraud and abuse</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Complying with legal obligations</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Information Sharing and Disclosure</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								We do not sell, trade, or otherwise transfer your personal information to third parties except in the
								following circumstances:
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">With your consent:</strong> When you explicitly agree to share information</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Service providers:</strong> With trusted third-party service providers who assist us in operating our service</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Legal requirements:</strong> When required by law or to protect our rights and safety</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Data Security</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								We implement appropriate technical and organizational security measures to protect your personal
								information against unauthorized access, alteration, disclosure, or destruction. However, please note that
								no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee
								absolute security.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Data Retention</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
								privacy policy, unless a longer retention period is required or permitted by law. When we no longer need
								your personal information, we will securely delete or anonymize it.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Your Rights and Choices</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								Depending on your location, you may have certain rights regarding your personal information:
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Access:</strong> Request access to your personal information</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Correction:</strong> Request correction of inaccurate information</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Deletion:</strong> Request deletion of your personal information</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Portability:</strong> Request a copy of your data in a portable format</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Objection:</strong> Object to certain processing of your information</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span><strong className="text-gray-900">Restriction:</strong> Request restriction of processing</span>
								</li>
							</ul>
							<p className="leading-relaxed mt-4 text-gray-700">
								To exercise these rights, please contact us at{" "}
								<a
									href="mailto:privacy@danke.app"
									className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
								>
									privacy@danke.app
								</a>
								.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Cookies and Tracking Technologies</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								We use cookies and similar tracking technologies to enhance your experience on our service. You can
								control cookie settings through your browser preferences. However, disabling certain cookies may limit
								your ability to use some features of our service.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Children&apos;s Privacy</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								Our service is not intended for children under the age of 13. We do not knowingly collect personal
								information from children under 13. If you are a parent or guardian and believe your child has provided us
								with personal information, please contact us immediately.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">International Data Transfers</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								Your information may be transferred to and processed in countries other than your own. We ensure that such
								transfers comply with applicable data protection laws and implement appropriate safeguards to protect your
								information.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Changes to This Privacy Policy</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								We may update this privacy policy from time to time. We will notify you of any changes by posting the new
								privacy policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review
								this privacy policy periodically for any changes.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h2>
							<p className="leading-relaxed text-gray-700 mb-6">
								If you have any questions about this privacy policy or our privacy practices, please contact us at:
							</p>
							<div className="p-8 bg-purple-50 rounded-2xl border-2 border-purple-200">
								<div className="text-gray-900 space-y-2">
									<div className="flex items-center gap-2">
										<span className="font-bold text-gray-900">Email:</span>
										<a
											href="mailto:privacy@trydanke.link"
											className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
										>
											privacy@trydanke.link
										</a>
									</div>
									<div className="flex items-center gap-2">
										<span className="font-bold text-gray-900">Subject:</span>
										<span className="font-semibold text-purple-700">Privacy Policy Inquiry</span>
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
