import { FileText } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
	title: "Terms of Service - Danke",
	description: "Read the terms and conditions for using Danke's appreciation board platform.",
};

export default function TermsPage() {
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
								<FileText className="w-4 h-4 text-pink-300" />
								<span className="text-white font-semibold">Terms of Service</span>
							</div>
						</div>

						<h1 className="animate-in-delay-1 mb-8 text-white">
							<span className="block text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
								Terms of Service
							</span>
							<span className="block text-2xl md:text-3xl text-white/90 font-light">Rules for using Danke</span>
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
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Agreement to Terms</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								By accessing and using Danke (&quot;the Service&quot;), you accept and agree to be bound by the terms and
								provision of this agreement. If you do not agree to abide by the above, please do not use this service.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Description of Service</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								Danke is a web-based platform that allows users to create and share appreciation boards for celebrating
								moments, sharing gratitude, and building community connections. The Service includes features for creating
								boards, posting content, managing permissions, and collaborating with others.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">User Accounts</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								To access certain features of the Service, you must create an account. When creating an account, you agree
								to:
							</p>
							<ul className="space-y-2">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Provide accurate, current, and complete information</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Maintain and update your account information</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Keep your login credentials secure and confidential</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Accept responsibility for all activities under your account</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Notify us immediately of any unauthorized use</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Acceptable Use</h2>
							<p className="leading-relaxed mb-4 text-gray-700">
								You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not
								to:
							</p>
							<ul className="space-y-2">
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>
										Upload, post, or transmit any content that is illegal, harmful, threatening, abusive, harassing,
										defamatory, vulgar, obscene, or otherwise objectionable
									</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Impersonate any person or entity or misrepresent your affiliation</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Upload content that infringes on intellectual property rights</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Attempt to gain unauthorized access to the Service or other users&apos; accounts</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Use the Service to spam, phish, or engage in other malicious activities</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Interfere with or disrupt the Service or servers</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Use automated tools to access the Service without permission</span>
								</li>
								<li className="flex items-start gap-3 text-gray-700">
									<span className="text-purple-600 mt-1 font-bold">•</span>
									<span>Violate any applicable laws or regulations</span>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-6 text-gray-900">Content and Intellectual Property</h2>

							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Your Content</h3>
									<p className="leading-relaxed text-gray-700">
										You retain ownership of any content you submit, post, or display on the Service (&quot;Your
										Content&quot;). By submitting Your Content, you grant us a worldwide, non-exclusive, royalty-free license
										to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute Your Content
										in connection with the Service.
									</p>
								</div>

								<div>
									<h3 className="text-xl font-bold mb-3 text-gray-900">Our Content</h3>
									<p className="leading-relaxed text-gray-700">
										The Service and its original content, features, and functionality are owned by Danke and are protected by
										international copyright, trademark, patent, trade secret, and other intellectual property laws.
									</p>
								</div>
							</div>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Privacy</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								Your privacy is important to us. Please review our{" "}
								<Link
									href="/privacy"
									className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
								>
									Privacy Policy
								</Link>
								, which also governs your use of the Service, to understand our practices.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Termination</h2>
							<p className="leading-relaxed mb-4 text-gray-700 text-lg">
								We may terminate or suspend your account and bar access to the Service immediately, without prior notice
								or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach
								of the Terms.
							</p>
							<p className="leading-relaxed text-gray-700 text-lg">
								You may terminate your account at any time by contacting us. Upon termination, your right to use the
								Service will cease immediately.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Disclaimers</h2>
							<p className="leading-relaxed mb-4 text-gray-700 text-lg">
								The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no
								representations or warranties of any kind, express or implied, as to the operation of the Service or the
								information, content, materials, or products included on the Service.
							</p>
							<p className="leading-relaxed text-gray-700 text-lg">
								We do not warrant that the Service will be uninterrupted or error-free, and we will not be liable for any
								interruptions or errors.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Limitation of Liability</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								In no event shall Danke, its directors, employees, partners, agents, suppliers, or affiliates be liable
								for any indirect, incidental, punitive, consequential, or special damages arising out of or related to
								your use of the Service, even if we have been advised of the possibility of such damages.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Indemnification</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								You agree to defend, indemnify, and hold harmless Danke and its licensee and licensors, and their
								employees, contractors, agents, officers and directors, from and against any and all claims, damages,
								obligations, losses, liabilities, costs or debt, and expenses (including but not limited to
								attorney&apos;s fees).
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Governing Law</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								These Terms shall be interpreted and governed by the laws of the jurisdiction in which Danke operates,
								without regard to its conflict of law provisions. Any disputes arising from these Terms will be resolved
								in the courts of that jurisdiction.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Changes to Terms</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
								provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change
								will be determined at our sole discretion.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Severability</h2>
							<p className="leading-relaxed text-gray-700 text-lg">
								If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and
								interpreted to accomplish the objectives of such provision to the greatest extent possible under
								applicable law and the remaining provisions will continue in full force and effect.
							</p>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-4 text-gray-900">Contact Information</h2>
							<p className="leading-relaxed text-gray-700 mb-6">
								If you have any questions about these Terms of Service, please contact us at:
							</p>
							<div className="p-8 bg-purple-50 rounded-2xl border-2 border-purple-200">
								<div className="text-gray-900 space-y-2">
									<div className="flex items-center gap-2">
										<span className="font-bold text-gray-900">Email:</span>
										<a
											href="mailto:legal@trydanke.link"
											className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
										>
											legal@trydanke.link
										</a>
									</div>
									<div className="flex items-center gap-2">
										<span className="font-bold text-gray-900">Subject:</span>
										<span className="font-semibold text-purple-700">Terms of Service Inquiry</span>
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
