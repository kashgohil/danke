import { Check, Crown, Heart, Pin, Sparkles, Star, Zap } from "lucide-react";
import { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing - Danke",
  description:
    "Choose the perfect plan for your appreciation boards. Start free and upgrade as your community grows.",
};

export default function PricingPage() {
  const pricingFAQs: Array<{ question: string; answer: string }> = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
      question: "What happens to my boards if I downgrade?",
      answer:
        "Your existing boards and messages remain safe. If you exceed the limits of your new plan, you'll have read-only access to the excess content until you upgrade again or remove some boards.",
    },
    {
      question: "Is there a free trial for Pro plans?",
      answer:
        "Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start your trial.",
    },
    {
      question:
        "Do you offer discounts for nonprofits or educational institutions?",
      answer:
        "Yes! We offer special pricing for qualified nonprofits and educational institutions. Contact our sales team for more information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      description:
        "Perfect for getting started with small appreciation boards.",
      icon: Heart,
      cta: {
        label: "Get Started Free",
        href: "/create-board",
        variant: "outline" as const,
      },
      features: [
        "Up to 3 boards",
        "50 messages per board",
        "Basic customization",
        "Media uploads (100MB total)",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$9",
      period: "/mo",
      description: "Ideal for teams and growing communities.",
      icon: Star,
      highlight: "Most Popular",
      cta: {
        label: "Start Pro Trial",
        href: "/create-board",
        variant: "default" as const,
      },
      features: [
        "Unlimited boards",
        "Unlimited messages",
        "Advanced customization",
        "Unlimited media uploads (10GB)",
        "Custom branding",
        "Export to PDF",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with specific needs.",
      icon: Crown,
      cta: {
        label: "Contact Sales",
        href: "/contact",
        variant: "outline" as const,
      },
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Advanced analytics",
        "SSO integration",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
    },
  ];

  const comparisons = [
    {
      label: "Number of boards",
      free: "3",
      pro: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      label: "Messages per board",
      free: "50",
      pro: "Unlimited",
      enterprise: "Unlimited",
    },
    { label: "Storage", free: "100MB", pro: "1GB", enterprise: "Unlimited" },
    { label: "Custom branding", free: false, pro: true, enterprise: true },
    { label: "Export to PDF", free: false, pro: true, enterprise: true },
    {
      label: "Analytics",
      free: "Basic",
      pro: "Advanced",
      enterprise: "Enterprise",
    },
    {
      label: "Support",
      free: "Email",
      pro: "Priority",
      enterprise: "Dedicated",
    },
  ];

  const stats = [
    { icon: Zap, value: "10,000+", label: "Boards created" },
    { icon: Heart, value: "500,000+", label: "Messages shared" },
    { icon: Star, value: "99.9%", label: "Uptime guarantee" },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#FDF6E3",
        backgroundImage: `
					radial-gradient(circle, #E8DCC4 1px, transparent 1px),
					radial-gradient(circle, #F0E6D2 1px, transparent 1px)
				`,
        backgroundSize: "24px 24px, 48px 48px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    >
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-50 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Pricing
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                Simple, transparent pricing.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Start free and scale as your community grows. No hidden fees, no
                surprises.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-gray-700" />
                <span>Upgrade when you need more room to celebrate.</span>
              </div>
            </div>

            <PolaroidCard
              size="large"
              className="w-full max-w-lg mx-auto p-8 md:p-10"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Plan note
                </p>
                <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                  Free forever for personal boards.
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Use Danke for birthdays, farewells, and personal celebrations
                  at no cost.
                </p>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <PolaroidCard
                key={plan.name}
                size="large"
                className="w-full max-w-none p-8 relative"
              >
                {plan.highlight ? (
                  <div className="absolute -top-4 left-6 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.highlight}
                  </div>
                ) : null}
                <div className="flex flex-col h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FDF6E3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-gray-800" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {plan.price}
                      {plan.period ? (
                        <span className="text-base font-normal text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 my-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.cta.href} className="mt-auto block">
                    <Button
                      variant={plan.cta.variant}
                      className={
                        plan.cta.variant === "default"
                          ? "w-full h-12 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white"
                          : "w-full h-12 text-base font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
                      }
                    >
                      {plan.cta.label}
                    </Button>
                  </Link>
                </div>
              </PolaroidCard>
            );
          })}
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Compare plans
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Detailed feature breakdown
            </h2>
          </div>

          <PolaroidCard className="w-full max-w-none p-6 md:p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">
                      Features
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">
                      Free
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">
                      Pro
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisons.map((row) => (
                    <tr
                      key={row.label}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-700 font-medium">
                        {row.label}
                      </td>
                      <td className="text-center py-4 px-4 text-gray-600">
                        {typeof row.free === "boolean" ? (
                          row.free ? (
                            <Check className="w-5 h-5 text-gray-900 mx-auto" />
                          ) : (
                            "-"
                          )
                        ) : (
                          row.free
                        )}
                      </td>
                      <td className="text-center py-4 px-4 text-gray-900 font-semibold">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <Check className="w-5 h-5 text-gray-900 mx-auto" />
                          ) : (
                            "-"
                          )
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td className="text-center py-4 px-4 text-gray-900 font-semibold">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-gray-900 mx-auto" />
                          ) : (
                            "-"
                          )
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PolaroidCard>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 text-lg">
              Common questions about our plans
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            {pricingFAQs.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="relative border-4 border-gray-900 rounded-sm bg-white shadow-2xl"
              >
                <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
                  <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
                </div>
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline">
                  <span className="text-lg font-bold text-gray-900 font-fuzzy-bubbles">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-gray-600 leading-relaxed text-base">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-center mb-12 text-gray-900">
            Trusted by communities worldwide
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <PolaroidCard
                  key={stat.label}
                  size="medium"
                  className="w-full max-w-none p-6 text-center"
                >
                  <div className="w-14 h-14 bg-[#FDF6E3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-gray-800" />
                  </div>
                  <p className="text-3xl font-black text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl md:text-5xl font-fuzzy-bubbles mb-6 text-gray-900">
              Start building appreciation today
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Join thousands of communities already using Danke to celebrate and
              connect. Start your free board today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create-board">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Start Free Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold h-14 px-8 text-base"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </PolaroidCard>
        </div>
      </section>

      <div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Footer />
      </div>
    </div>
  );
}
