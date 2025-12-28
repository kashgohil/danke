import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import {
  CheckCircle,
  Coffee,
  Globe,
  Heart,
  Lightbulb,
  MessageCircle,
  Rocket,
  Shield,
  Smile,
  Sparkles,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Danke",
  description:
    "Learn about Danke and how we help people collect gratitude in scrapbook-style appreciation boards.",
};

export default function AboutPage() {
  const stats = [
    {
      number: "10K+",
      label: "Boards Created",
      icon: Sparkles,
      color: "bg-[#F2A65A]",
    },
    {
      number: "50K+",
      label: "Messages Shared",
      icon: MessageCircle,
      color: "bg-[#EE6C4D]",
    },
    {
      number: "75+",
      label: "Countries Reached",
      icon: Globe,
      color: "bg-[#5DA7A3]",
    },
    {
      number: "100%",
      label: "Free Forever",
      icon: Heart,
      color: "bg-[#E07A5F]",
    },
  ];

  const milestones = [
    {
      phase: "The Beginning",
      period: "Early 2024",
      icon: Lightbulb,
      description:
        "Created the first version to collect thank-you notes for a departing colleague. The joy it brought made the mission clear.",
      color: "bg-[#F2A65A]",
    },
    {
      phase: "First Celebrations",
      period: "March 2024",
      icon: Rocket,
      description:
        "Friends started using it for birthdays and farewells. Each board became a treasured collection of kind words.",
      color: "bg-[#5DA7A3]",
    },
    {
      phase: "Growing Together",
      period: "Mid 2024",
      icon: Users,
      description:
        "Word spread as people discovered how Danke helps celebrate meaningful moments. Added 14 board types and slideshows.",
      color: "bg-[#8CB369]",
    },
    {
      phase: "Spreading Joy",
      period: "Late 2024",
      icon: Globe,
      description:
        "People around the world started using Danke for celebrations. Over 10,000 boards created, each filled with gratitude.",
      color: "bg-[#E07A5F]",
    },
    {
      phase: "Looking Ahead",
      period: "2025 and Beyond",
      icon: Sparkles,
      description:
        "Continuing to help people celebrate each other with features that make appreciation easier to share and receive.",
      color: "bg-[#F2A65A]",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Make It Effortless",
      description:
        "Celebrating someone should be easy and joyful, not complicated. We remove friction wherever we can.",
      color: "bg-[#E07A5F]",
    },
    {
      icon: Users,
      title: "Listen and Learn",
      description:
        "The best features come from people who use Danke. We pay attention to what helps celebrations shine.",
      color: "bg-[#5DA7A3]",
    },
    {
      icon: Shield,
      title: "Respect Privacy",
      description:
        "Your celebrations and memories are precious. We protect your data and never sell it or show ads.",
      color: "bg-[#F2A65A]",
    },
    {
      icon: Globe,
      title: "Free for Everyone",
      description:
        "Everyone deserves to celebrate the people they care about. No paywalls, no premium tiers, ever.",
      color: "bg-[#8CB369]",
    },
    {
      icon: Smile,
      title: "Delight in Details",
      description:
        "Smooth animations, beautiful layouts, thoughtful interactions. Small touches that make moments special.",
      color: "bg-[#EE6C4D]",
    },
    {
      icon: CheckCircle,
      title: "Keep Improving",
      description:
        "When something breaks, we fix it. When something could bring more joy, we enhance it.",
      color: "bg-[#5DA7A3]",
    },
  ];

  const teamHighlights = [
    {
      icon: Coffee,
      title: "Small, Dedicated Team",
      description:
        "A small group of people who care about helping you celebrate. We respond quickly and genuinely care about your experience.",
    },
    {
      icon: Users,
      title: "Built on Real Needs",
      description:
        "Features exist because they help real celebrations. We listen to how people use Danke and build what brings the most joy.",
    },
    {
      icon: Sparkles,
      title: "Thoughtful Craft",
      description:
        "Every animation, layout, and interaction is designed to make your celebration feel special and memorable.",
    },
    {
      icon: Heart,
      title: "Purpose-Driven",
      description:
        "We built Danke to help spread positivity and appreciation. Every feature serves that purpose.",
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
      <section className="relative pt-40 pb-20 md:pt-44 md:pb-28 lg:pt-50 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="container-default relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                About Danke
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                A scrapbook for gratitude.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Danke makes it easy to collect appreciation and share it as a
                keepsake everyone can revisit. We help teams, families, and
                communities celebrate the people who matter most.
              </p>
            </div>

            <div className="relative">
              <PolaroidCard size="large" className="w-full max-w-lg mx-auto">
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    Our promise
                  </div>
                  <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                    Make appreciation effortless.
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Capture messages, photos, and videos in one place, then play
                    them back as a beautiful slideshow.
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span>Designed to feel warm, simple, and human.</span>
                  </div>
                </div>
              </PolaroidCard>
              <div className="absolute -bottom-6 -right-4 bg-white border-2 border-gray-900/10 rounded-2xl shadow-lg px-5 py-4 rotate-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Since
                </div>
                <div className="text-2xl font-fuzzy-bubbles text-gray-900">
                  2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  style={{
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
                    opacity: 0,
                  }}
                  className="w-full"
                >
                  <PolaroidCard
                    size="medium"
                    className="w-full max-w-none text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 mx-auto mb-4 rounded-2xl ${stat.color} flex items-center justify-center shadow-md`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 font-bold uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </PolaroidCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                The Story Behind Danke
              </p>
              <h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-fuzzy-bubbles">
                How it started
              </h2>
            </div>

            <PolaroidCard className="w-full max-w-none p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="text-xl leading-relaxed">
                  Danke started when someone needed to collect thank-you
                  messages for a colleague who was leaving. The usual methods
                  made it hard to gather everything in one place and present it
                  beautifully.
                </p>
                <p className="text-lg leading-relaxed">
                  So we built Danke: a place where people can easily contribute
                  messages, photos, and videos, then see it all come together as
                  a beautiful slideshow. The reaction from that first board
                  showed us how meaningful it is when appreciation is shared
                  thoughtfully.
                </p>
                <p className="text-lg leading-relaxed">
                  Since then, people have used Danke for birthdays, farewells,
                  graduations, weddings, and countless celebrations. Each board
                  becomes a collection of kind words and memories that people
                  can revisit and treasure.
                </p>
                <div className="border-4 border-black rounded-sm mt-8 w-full max-w-none p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    <p className="text-lg font-bold text-gray-900 m-0">
                      Always Free
                    </p>
                  </div>
                  <p className="text-gray-700 m-0">
                    Danke is free to use, with no plans to change that. We
                    believe everyone should be able to celebrate the people they
                    care about, without barriers.
                  </p>
                </div>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              How it's going
            </p>
            <h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-fuzzy-bubbles">
              Helping more people celebrate
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, idx) => {
                const Icon = milestone.icon;
                return (
                  <div
                    key={milestone.phase}
                    style={{
                      animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
                      opacity: 0,
                    }}
                    className="w-full"
                  >
                    <PolaroidCard className="w-full max-w-none p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-14 h-14 ${milestone.color} rounded-2xl flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                            <h3 className="text-2xl font-fuzzy-bubbles font-bold text-gray-900">
                              {milestone.phase}
                            </h3>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              {milestone.period}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </PolaroidCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              What We Care About
            </p>
            <h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-fuzzy-bubbles">
              What guides us
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These values show up in every decision we make and every board we
              help you create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  style={{
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
                    opacity: 0,
                  }}
                  className="w-full"
                >
                  <PolaroidCard size="medium" className="w-full max-w-none p-8">
                    <div
                      className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-fuzzy-bubbles font-bold mb-3 text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </PolaroidCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                Behind the Scenes
              </p>
              <h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-fuzzy-bubbles">
                How we work
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {teamHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    style={{
                      animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s forwards`,
                      opacity: 0,
                    }}
                    className="w-full"
                  >
                    <PolaroidCard
                      size="large"
                      className="w-full max-w-none p-10"
                    >
                      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-fuzzy-bubbles font-bold mb-3 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </PolaroidCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Let's Connect
            </p>

            <h2 className="mb-6 text-gray-900 text-4xl md:text-5xl font-fuzzy-bubbles">
              Questions or suggestions?
              <span className="block text-2xl md:text-3xl mt-3 text-gray-700">
                We would love to hear from you.
              </span>
            </h2>

            <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              If you have ideas, found a bug, or just want to say hi, reach out
              any time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white border-0 min-w-[220px] h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-white/80 min-w-[220px] h-14 text-base font-semibold"
                >
                  Explore Features
                </Button>
              </Link>
            </div>
          </PolaroidCard>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Footer />
      </div>
    </div>
  );
}
