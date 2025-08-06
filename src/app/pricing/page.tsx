import { Check, Crown, Heart, Star, Zap } from 'lucide-react';
import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - Danke',
  description:
    'Choose the perfect plan for your appreciation boards. Start free and upgrade as your community grows.',
};

export default function PricingPage() {
  return (
    <div className="space-y-16 mt-8 mx-auto">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl mt-12 font-bold mb-6 text-danke-900">
          Simple, Transparent
          <br />
          <span className="text-danke-gold">Pricing</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-danke-900">
          Start free and scale as your community grows. No hidden fees, no
          surprises. Just beautiful appreciation boards for everyone.
        </p>
      </section>

      <section className="py-16 -mx-4 px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 relative">
            <CardHeader className="text-center p-8">
              <div className="w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-danke-900" />
              </div>
              <CardTitle className="text-2xl mb-2">Free</CardTitle>
              <div className="text-4xl font-bold text-danke-gold mb-2">
                $0
                <span className="text-lg font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <CardDescription className="text-base">
                Perfect for getting started with small appreciation boards
              </CardDescription>
            </CardHeader>
            <div className="px-8 pb-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Up to 3 boards</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>50 messages per board</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Basic customization</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Media uploads (100MB total)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
              <Link href="/create-board" className="block">
                <Button className="w-full" variant="outline">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border-2 border-danke-gold shadow-xl hover:shadow-2xl transition-all duration-300 relative scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-danke-gold text-danke-900 px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center p-8">
              <div className="w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-danke-900" />
              </div>
              <CardTitle className="text-2xl mb-2">Pro</CardTitle>
              <div className="text-4xl font-bold text-danke-gold mb-2">
                $9
                <span className="text-lg font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <CardDescription className="text-base">
                Ideal for teams and growing communities
              </CardDescription>
            </CardHeader>
            <div className="px-8 pb-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Unlimited boards</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Unlimited messages</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Advanced customization</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Unlimited media uploads (10GB)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Export to PDF</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/create-board" className="block">
                <Button className="w-full bg-danke-gold hover:bg-danke-gold/90 text-danke-900">
                  Start Pro Trial
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 relative">
            <CardHeader className="text-center p-8">
              <div className="w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-danke-900" />
              </div>
              <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
              <div className="text-4xl font-bold text-danke-gold mb-2">
                Custom
              </div>
              <CardDescription className="text-base">
                For large organizations with specific needs
              </CardDescription>
            </CardHeader>
            <div className="px-8 pb-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Unlimited storage</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>SSO integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-danke-gold flex-shrink-0" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Link href="/contact" className="block">
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 -mx-4 px-4 bg-background/50 backdrop-blur-lg md:rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">
          Compare Plans
        </h2>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-semibold text-danke-900">
                  Features
                </th>
                <th className="text-center py-4 px-4 font-semibold text-danke-900">
                  Free
                </th>
                <th className="text-center py-4 px-4 font-semibold text-danke-900">
                  Pro
                </th>
                <th className="text-center py-4 px-4 font-semibold text-danke-900">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-4 px-4 text-danke-900">Number of boards</td>
                <td className="text-center py-4 px-4">3</td>
                <td className="text-center py-4 px-4">Unlimited</td>
                <td className="text-center py-4 px-4">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-danke-900">Messages per board</td>
                <td className="text-center py-4 px-4">50</td>
                <td className="text-center py-4 px-4">Unlimited</td>
                <td className="text-center py-4 px-4">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-danke-900">Storage</td>
                <td className="text-center py-4 px-4">100MB</td>
                <td className="text-center py-4 px-4">10GB</td>
                <td className="text-center py-4 px-4">Unlimited</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-danke-900">Custom branding</td>
                <td className="text-center py-4 px-4">-</td>
                <td className="text-center py-4 px-4">
                  <Check className="w-5 h-5 text-danke-gold mx-auto" />
                </td>
                <td className="text-center py-4 px-4">
                  <Check className="w-5 h-5 text-danke-gold mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-danke-900">Export to PDF</td>
                <td className="text-center py-4 px-4">-</td>
                <td className="text-center py-4 px-4">
                  <Check className="w-5 h-5 text-danke-gold mx-auto" />
                </td>
                <td className="text-center py-4 px-4">
                  <Check className="w-5 h-5 text-danke-gold mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-danke-900">Analytics</td>
                <td className="text-center py-4 px-4">Basic</td>
                <td className="text-center py-4 px-4">Advanced</td>
                <td className="text-center py-4 px-4">Enterprise</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-danke-900">API access</td>
                <td className="text-center py-4 px-4">-</td>
                <td className="text-center py-4 px-4">-</td>
                <td className="text-center py-4 px-4">
                  <Check className="w-5 h-5 text-danke-gold mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-danke-900">Support</td>
                <td className="text-center py-4 px-4">Email</td>
                <td className="text-center py-4 px-4">Priority</td>
                <td className="text-center py-4 px-4">Dedicated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-16 -mx-4 px-4 bg-background/50 backdrop-blur-lg md:rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-danke-gold">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-danke-900">
              Can I upgrade or downgrade my plan anytime?
            </h3>
            <p className="text-muted-foreground">
              Yes! You can upgrade or downgrade your plan at any time. Changes
              take effect immediately, and we'll prorate any billing
              adjustments.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-danke-900">
              What happens to my boards if I downgrade?
            </h3>
            <p className="text-muted-foreground">
              Your existing boards and messages remain safe. If you exceed the
              limits of your new plan, you'll have read-only access to the
              excess content until you upgrade again or remove some boards.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-danke-900">
              Is there a free trial for Pro plans?
            </h3>
            <p className="text-muted-foreground">
              Yes! We offer a 14-day free trial for the Pro plan. No credit card
              required to start your trial.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-danke-900">
              Do you offer discounts for nonprofits or educational institutions?
            </h3>
            <p className="text-muted-foreground">
              Yes! We offer special pricing for qualified nonprofits and
              educational institutions. Contact our sales team for more
              information.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-danke-900">
              What payment methods do you accept?
            </h3>
            <p className="text-muted-foreground">
              We accept all major credit cards (Visa, MasterCard, American
              Express) and PayPal. Enterprise customers can also pay by invoice.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-danke-900">
          Trusted by Communities Worldwide
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-danke-900" />
              </div>
              <CardTitle className="text-2xl text-danke-gold">
                10,000+
              </CardTitle>
              <CardDescription>Boards created</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-danke-900" />
              </div>
              <CardTitle className="text-2xl text-danke-gold">
                500,000+
              </CardTitle>
              <CardDescription>Messages shared</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-danke-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-danke-900" />
              </div>
              <CardTitle className="text-2xl text-danke-gold">99.9%</CardTitle>
              <CardDescription>Uptime guarantee</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="text-center py-16 -mx-4 px-4 bg-gradient-to-r rounded-lg text-danke-900">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Building Appreciation?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of communities already using Danke to celebrate and
          connect. Start your free board today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/create-board">
            <Button size="lg" className="font-semibold">
              Start Free Today
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="text-white font-semibold"
            >
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>

      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-12">
        <Footer />
      </div>
    </div>
  );
}
