import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
	title: "Terms of Service - Danke",
	description: "Read the terms and conditions for using Danke's appreciation board platform.",
};

export default function TermsPage() {
	return (
		<div className="space-y-16 mt-8 text-danke-900">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
				<p className=" mb-8">Last updated: January 1, 2025</p>

				<div className="prose prose-lg max-w-none">
					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
						<p className=" leading-relaxed">
							By accessing and using Danke (&quot;the Service&quot;), you accept and agree to be bound by the terms and
							provision of this agreement. If you do not agree to abide by the above, please do not use this service.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
						<p className=" leading-relaxed">
							Danke is a web-based platform that allows users to create and share appreciation boards for celebrating
							moments, sharing gratitude, and building community connections. The Service includes features for creating
							boards, posting content, managing permissions, and collaborating with others.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
						<p className=" leading-relaxed mb-4">
							To access certain features of the Service, you must create an account. When creating an account, you agree
							to:
						</p>
						<ul className="list-disc pl-6  space-y-2">
							<li>Provide accurate, current, and complete information</li>
							<li>Maintain and update your account information</li>
							<li>Keep your login credentials secure and confidential</li>
							<li>Accept responsibility for all activities under your account</li>
							<li>Notify us immediately of any unauthorized use</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
						<p className=" leading-relaxed mb-4">
							You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not
							to:
						</p>
						<ul className="list-disc pl-6  space-y-2">
							<li>
								Upload, post, or transmit any content that is illegal, harmful, threatening, abusive, harassing,
								defamatory, vulgar, obscene, or otherwise objectionable
							</li>
							<li>Impersonate any person or entity or misrepresent your affiliation</li>
							<li>Upload content that infringes on intellectual property rights</li>
							<li>Attempt to gain unauthorized access to the Service or other users&apos; accounts</li>
							<li>Use the Service to spam, phish, or engage in other malicious activities</li>
							<li>Interfere with or disrupt the Service or servers</li>
							<li>Use automated tools to access the Service without permission</li>
							<li>Violate any applicable laws or regulations</li>
						</ul>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Content and Intellectual Property</h2>

						<h3 className="text-xl font-medium mb-3">Your Content</h3>
						<p className=" leading-relaxed mb-4">
							You retain ownership of any content you submit, post, or display on the Service (&quot;Your
							Content&quot;). By submitting Your Content, you grant us a worldwide, non-exclusive, royalty-free license
							to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute Your Content
							in connection with the Service.
						</p>

						<h3 className="text-xl font-medium mb-3">Our Content</h3>
						<p className=" leading-relaxed">
							The Service and its original content, features, and functionality are owned by Danke and are protected by
							international copyright, trademark, patent, trade secret, and other intellectual property laws.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Privacy</h2>
						<p className=" leading-relaxed">
							Your privacy is important to us. Please review our{" "}
							<Link
								href="/privacy"
								className="text-danke-gold hover:underline"
							>
								Privacy Policy
							</Link>
							, which also governs your use of the Service, to understand our practices.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Termination</h2>
						<p className=" leading-relaxed mb-4">
							We may terminate or suspend your account and bar access to the Service immediately, without prior notice
							or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach
							of the Terms.
						</p>
						<p className=" leading-relaxed">
							You may terminate your account at any time by contacting us. Upon termination, your right to use the
							Service will cease immediately.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Disclaimers</h2>
						<p className=" leading-relaxed mb-4">
							The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no
							representations or warranties of any kind, express or implied, as to the operation of the Service or the
							information, content, materials, or products included on the Service.
						</p>
						<p className=" leading-relaxed">
							We do not warrant that the Service will be uninterrupted or error-free, and we will not be liable for any
							interruptions or errors.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
						<p className=" leading-relaxed">
							In no event shall Danke, its directors, employees, partners, agents, suppliers, or affiliates be liable
							for any indirect, incidental, punitive, consequential, or special damages arising out of or related to
							your use of the Service, even if we have been advised of the possibility of such damages.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
						<p className=" leading-relaxed">
							You agree to defend, indemnify, and hold harmless Danke and its licensee and licensors, and their
							employees, contractors, agents, officers and directors, from and against any and all claims, damages,
							obligations, losses, liabilities, costs or debt, and expenses (including but not limited to
							attorney&apos;s fees).
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
						<p className=" leading-relaxed">
							These Terms shall be interpreted and governed by the laws of the jurisdiction in which Danke operates,
							without regard to its conflict of law provisions. Any disputes arising from these Terms will be resolved
							in the courts of that jurisdiction.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
						<p className=" leading-relaxed">
							We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
							provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change
							will be determined at our sole discretion.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Severability</h2>
						<p className=" leading-relaxed">
							If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and
							interpreted to accomplish the objectives of such provision to the greatest extent possible under
							applicable law and the remaining provisions will continue in full force and effect.
						</p>
					</section>

					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
						<p className=" leading-relaxed">
							If you have any questions about these Terms of Service, please contact us at:
						</p>
						<div className="mt-4 p-4 bg-background/50 backdrop-blur-2xl rounded-lg">
							<p className="text-danke-900">
								Email:{" "}
								<a
									href="mailto:legal@danke.app"
									className="text-muted-foreground hover:underline"
								>
									legal@danke.app
								</a>
								<br />
								Subject: <span className="text-muted-foreground">Terms of Service Inquiry</span>
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
