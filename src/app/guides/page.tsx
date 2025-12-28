import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Heart,
  MessageSquare,
  MoveDown,
  MoveRight,
  Palette,
  Pin,
  Settings,
  Share2,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
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
  title: "Guides - Danke",
  description:
    "Learn how to create beautiful appreciation boards with our comprehensive guides and tutorials.",
};

export default function GuidesPage() {
  const guidesFAQs: Array<{ question: string; answer: string }> = [
    {
      question: "How many people can contribute to a board?",
      answer:
        "There's no limit to the number of contributors! Our boards are designed to handle everything from intimate gatherings to company-wide celebrations with hundreds of participants.",
    },
    {
      question: "Can I moderate messages before they appear?",
      answer:
        "Yes! You can enable moderation to review all messages before they go live on your board. This ensures quality control and appropriateness for your specific occasion.",
    },
    {
      question: "What file types can contributors upload?",
      answer:
        "Contributors can upload images (JPG, PNG, GIF), videos (MP4, MOV), and audio files (MP3, WAV). We automatically optimize media for fast loading while maintaining quality.",
    },
    {
      question: "How long do boards stay active?",
      answer:
        "Boards remain active indefinitely on our free plan. You can archive or delete them at any time, and premium plans offer additional storage and backup options.",
    },
    {
      question: "Can I export my board for offline use?",
      answer:
        "Absolutely! You can export your board as a PDF, create a digital archive, or even order a printed version. This makes it perfect for creating lasting keepsakes.",
    },
  ];

  const detailedGuides = [
    {
      icon: BookOpen,
      title: "Board Creation Basics",
      description: "Learn the fundamentals of creating your first board:",
      items: [
        "Choosing the right template for your occasion",
        "Writing compelling titles and descriptions",
        "Setting up basic privacy and moderation",
      ],
    },
    {
      icon: Palette,
      title: "Customization and Themes",
      description: "Make your board uniquely yours:",
      items: [
        "Selecting colors that match your brand or event",
        "Adding custom backgrounds and logos",
        "Choosing layout styles for different content types",
      ],
    },
    {
      icon: Share2,
      title: "Sharing Strategies",
      description: "Get maximum participation with effective sharing:",
      items: [
        "Crafting invitation messages that inspire action",
        "Using multiple channels for broader reach",
        "Timing your invitations for maximum impact",
      ],
    },
    {
      icon: Settings,
      title: "Advanced Features",
      description: "Unlock the full potential of your boards:",
      items: [
        "Setting up moderation and content filtering",
        "Managing team permissions and collaboration",
        "Exporting and archiving your boards",
      ],
    },
  ];

  const occasionGuides = [
    {
      icon: Heart,
      title: "Farewell Boards",
      description:
        "Create meaningful goodbye experiences with tips for collecting heartfelt messages, organizing team contributions, and presenting the final board.",
    },
    {
      icon: Sparkles,
      title: "Birthday Celebrations",
      description:
        "Make birthdays special with photo collections, surprise coordination, and creative message prompts that capture cherished memories.",
    },
    {
      icon: Users,
      title: "Team Recognition",
      description:
        "Celebrate achievements and milestones with structured feedback, peer recognition, and professional presentation formats.",
    },
    {
      icon: Zap,
      title: "Event Memories",
      description:
        "Capture special moments from weddings, graduations, and community events with multimedia collections and guest contributions.",
    },
    {
      icon: MessageSquare,
      title: "Customer Testimonials",
      description:
        "Collect authentic feedback and testimonials with professional formatting, easy sharing, and integration with marketing materials.",
    },
    {
      icon: BookOpen,
      title: "Memorial Tributes",
      description:
        "Create lasting tributes with sensitive moderation, family collaboration, and meaningful ways to preserve and share memories.",
    },
  ];

  const bestPractices = [
    {
      icon: Users,
      title: "Encouraging Participation",
      items: [
        "Send personal invitations with context about why their contribution matters",
        "Provide example messages or prompts to help people get started",
        "Set a deadline to create urgency and ensure timely participation",
        "Follow up with gentle reminders for important contributors",
      ],
    },
    {
      icon: Sparkles,
      title: "Creating Impact",
      items: [
        "Choose meaningful timing that aligns with the occasion or milestone",
        "Curate and organize messages before the big reveal for maximum impact",
        "Present the board in person when possible for an emotional moment",
        "Create a lasting keepsake by exporting or printing the final board",
      ],
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
                Guides
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                Learn to create amazing boards.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Master the art of appreciation with step-by-step guides, best
                practices, and expert tips for creating meaningful boards that
                bring communities together.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                <BookOpen className="w-4 h-4 text-gray-700" />
                <span>Everything you need to go from idea to celebration.</span>
              </div>
            </div>

            <PolaroidCard
              size="large"
              className="w-full max-w-lg mx-auto p-8 md:p-10"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  What you will learn
                </p>
                <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                  Your board, step by step.
                </h2>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Set up a board that fits your occasion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Invite contributors and collect messages fast.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Present a heartfelt, polished reveal.</span>
                  </li>
                </ul>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Quick start
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Getting started in three steps
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
            <PolaroidCard
              size="medium"
              className="w-full max-w-none p-8 text-center flex-1"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#FDF6E3] rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl font-black text-gray-900">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Create your board
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Choose a template, add a title and description, then customize
                  your board's appearance to match the occasion.
                </p>
              </div>
            </PolaroidCard>
            <MoveRight
              size={48}
              className="hidden md:block text-gray-400 flex-shrink-0"
            />
            <MoveDown
              size={48}
              className="md:hidden text-gray-400 flex-shrink-0"
            />
            <PolaroidCard
              size="medium"
              className="w-full max-w-none p-8 text-center flex-1"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#FDF6E3] rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl font-black text-gray-900">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Share the link
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Copy your unique board link and share it with friends,
                  colleagues, or community members via email or social media.
                </p>
              </div>
            </PolaroidCard>
            <MoveRight
              size={48}
              className="hidden md:block text-gray-400 flex-shrink-0"
            />
            <MoveDown
              size={48}
              className="md:hidden text-gray-400 flex-shrink-0"
            />
            <PolaroidCard
              size="medium"
              className="w-full max-w-none p-8 text-center flex-1"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#FDF6E3] rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl font-black text-gray-900">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Watch it grow
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Contributors add messages, photos, and memories in real-time.
                  No account required for them to participate.
                </p>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Detailed Guides */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              In-depth guides
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Detailed guides
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {detailedGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <PolaroidCard
                  key={guide.title}
                  size="large"
                  className="w-full max-w-none p-8"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-[#FDF6E3] rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-base text-gray-600 mb-4">
                        {guide.description}
                      </p>
                      <ul className="space-y-3">
                        {guide.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides by Occasion */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Occasion specific
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Guides by occasion
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {occasionGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <PolaroidCard
                  key={guide.title}
                  size="medium"
                  className="w-full max-w-none p-6"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-[#FDF6E3] rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Practices & Tips */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Pro tips
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Best practices and tips
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {bestPractices.map((tip) => {
                const Icon = tip.icon;
                return (
                  <PolaroidCard
                    key={tip.title}
                    size="large"
                    className="w-full max-w-none p-8 md:p-10"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#FDF6E3] rounded-2xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-800" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {tip.title}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {tip.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="p-1 bg-[#FDF6E3] rounded-full mt-1">
                            <ArrowRight className="w-5 h-5 text-gray-800 flex-shrink-0" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </PolaroidCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Common questions about creating boards
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            {guidesFAQs.map((item, index) => (
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

      {/* Call to Action */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl md:text-5xl font-fuzzy-bubbles mb-6 text-gray-900">
              Ready to create your board?
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Put these guides into practice and start building meaningful
              connections with your first appreciation board.
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
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold h-14 px-8 text-base"
                >
                  Need More Help?
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
