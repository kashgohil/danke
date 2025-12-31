import {
  Check,
  Globe,
  Heart,
  ImageIcon,
  MessageCircle,
  Palette,
  Share2,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features - Danke",
  description:
    "Discover all the powerful features that make Danke the perfect platform for creating beautiful appreciation boards and celebrating your community.",
};

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: MessageCircle,
      title: "Rich text messages",
      description:
        "Create beautiful messages with full text formatting, colors, and styling options. Express appreciation with bold text, italics, lists, and more.",
    },
    {
      icon: ImageIcon,
      title: "Media uploads",
      description:
        "Add photos, videos, and audio files to make your messages more personal and memorable. Support for all common media formats.",
    },
    {
      icon: Sparkles,
      title: "Beautiful layouts",
      description:
        "Automatic masonry layouts adapt to your content and look stunning on any device, from mobile phones to large displays.",
    },
    {
      icon: Share2,
      title: "Easy sharing",
      description:
        "Share your boards with unique, secure links. No account required for contributors - they can add messages instantly.",
    },
    {
      icon: Heart,
      title: "Real-time updates",
      description:
        "Watch your board come alive as new messages appear instantly. See contributions from your community in real-time.",
    },
    {
      icon: Palette,
      title: "Custom themes",
      description:
        "Personalize your boards with custom colors, themes, and branding to match your community's style and personality.",
    },
  ];

  const reasons = [
    {
      icon: Zap,
      title: "Built for scale",
      description:
        "Whether it's 10 messages or 10,000, Danke handles it all with ease. Our platform is optimized for performance.",
      points: [
        "Handle thousands of messages",
        "99.9% uptime guarantee",
        "Global CDN for fast loading",
      ],
    },
    {
      icon: Shield,
      title: "Secure and private",
      description:
        "Your data is safe with us. We use enterprise-grade encryption and security practices to protect your boards.",
      points: [
        "Advanced moderation tools",
        "Password protection options",
        "GDPR compliant",
      ],
    },
    {
      icon: Globe,
      title: "Universal access",
      description:
        "Designed to work perfectly on any device, anywhere in the world. No barriers to participation.",
      points: [
        "No account required for contributors",
        "Mobile-first design",
        "Works on all modern browsers",
      ],
    },
    {
      icon: Heart,
      title: "Community focused",
      description:
        "We build features based on what communities need to connect and celebrate better.",
      points: [
        "Real-time collaboration",
        "Unlimited media storage",
        "24/7 customer support",
      ],
    },
  ];

  const occasions = [
    {
      title: "Farewell celebrations",
      description:
        "Collect heartfelt goodbye messages for departing colleagues or friends.",
    },
    {
      title: "Birthday wishes",
      description:
        "Create memorable birthday boards filled with photos and messages.",
    },
    {
      title: "Team recognition",
      description:
        "Celebrate project completions and acknowledge outstanding work.",
    },
    {
      title: "Wedding memories",
      description: "Gather well-wishes and memories from wedding guests.",
    },
    {
      title: "Graduation tributes",
      description: "Honor achievements with messages from family and friends.",
    },
    {
      title: "Customer feedback",
      description:
        "Collect testimonials and appreciation from satisfied customers.",
    },
    {
      title: "Community events",
      description:
        "Document special moments and gather feedback from participants.",
    },
    {
      title: "Memorial boards",
      description: "Create lasting tributes with shared memories and stories.",
    },
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
                Features
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                Powerful features for heartfelt boards.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Everything you need to create stunning appreciation boards that
                bring your community together.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                <Sparkles className="w-4 h-4 text-gray-700" />
                <span>Thoughtful features with a warm, human feel.</span>
              </div>
            </div>

            <PolaroidCard
              size="large"
              className="w-full max-w-lg mx-auto p-8 md:p-10"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Highlights
                </p>
                <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                  Everything you need to celebrate.
                </h2>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Media-rich messages with real-time updates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Easy sharing and privacy controls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Beautiful layouts on any screen.</span>
                  </li>
                </ul>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Core capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Built to make appreciation effortless
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <PolaroidCard
                  key={feature.title}
                  size="medium"
                  className="w-full max-w-none p-6"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-fuzzy-bubbles font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-center mb-16 text-gray-900">
            Why choose Danke?
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <PolaroidCard
                    key={reason.title}
                    size="large"
                    className="w-full max-w-none p-8"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-fuzzy-bubbles font-bold text-gray-900 mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {reason.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2 text-base text-gray-700 font-medium"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </PolaroidCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-center mb-12 text-gray-900">
            Perfect for every occasion
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {occasions.map((item) => (
              <PolaroidCard
                key={item.title}
                size="medium"
                className="w-full max-w-none p-6 text-center"
              >
                <h3 className="text-lg font-fuzzy-bubbles font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600">{item.description}</p>
              </PolaroidCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl md:text-5xl font-fuzzy-bubbles mb-6 text-gray-900">
              Experience these features today
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Start creating beautiful appreciation boards today and see why
              thousands of communities choose Danke.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create-board">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Create Your First Board
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold h-14 px-8 text-base"
                >
                  View Dashboard
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
