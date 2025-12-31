import {
  BookOpen,
  CheckCircle,
  Lightbulb,
  Mail,
  MessageSquare,
  Pin,
  Play,
  Settings,
  Sparkles,
  Users,
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
  title: "Help Center - Danke",
  description:
    "Get help with Danke. Find answers to common questions, troubleshooting guides, and learn how to make the most of your appreciation boards.",
};

export default function HelpPage() {
  const generalFAQs: Array<{ question: string; answer: string }> = [
    {
      question: "How do I create my first board?",
      answer:
        'Click "Create Board" from your dashboard, select a board type that matches your occasion, fill in the basic details (title, description), customize the appearance if desired, and click create. You\'ll immediately get a shareable link!',
    },
    {
      question: "Do contributors need to create an account?",
      answer:
        "No! One of Danke's best features is that contributors don't need to sign up or log in. They can simply click your shared link and start adding their messages, photos, or videos right away.",
    },
    {
      question: "Can I edit a board after creating it?",
      answer:
        "Yes! As the board creator, you can edit the title, description, settings, and appearance at any time from the board management page. Just click the settings icon on your board.",
    },
    {
      question: "How do I share my board with others?",
      answer:
        "Each board has a unique shareable link. Copy this link from your board's page and share it via email, messaging apps, social media, or any other method. Anyone with the link can contribute (unless you've enabled moderation).",
    },
    {
      question: "Is there a limit to how many messages I can collect?",
      answer:
        "The free plan supports generous limits for most use cases. If you're planning a very large celebration, check out our pricing page for premium options with unlimited messages and additional features.",
    },
    {
      question: "Can I download or export my board?",
      answer:
        "Yes! You can export your board as a PDF, download all media files in a zip archive, or create a shareable digital version. This is perfect for creating lasting keepsakes or printed memories.",
    },
  ];

  const troubleshootingFAQs: Array<{ question: string; answer: string }> = [
    {
      question: "I can't see messages that were submitted",
      answer:
        "If you've enabled moderation, messages need to be approved before they appear. Check your board settings and moderation queue. Also ensure you're viewing the latest version by refreshing the page.",
    },
    {
      question: "The shareable link isn't working",
      answer:
        'Make sure you\'ve copied the complete link including the https:// prefix. Check that your board is set to "Active" status and not archived. If problems persist, try generating a new link from your board settings.',
    },
    {
      question: "Images or videos aren't uploading",
      answer:
        "Check that your files are in supported formats (JPG, PNG, GIF for images; MP4, MOV for videos). Ensure files aren't too large (max 10MB per file). Try using a different browser if the issue continues.",
    },
    {
      question: "I forgot my password",
      answer:
        "Click the \"Forgot Password\" link on the sign-in page. Enter your email address and we'll send you instructions to reset your password. Check your spam folder if you don't see the email within a few minutes.",
    },
  ];

  const quickLinks = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description:
        "Learn the basics of creating and managing your first appreciation board.",
      href: "/guides",
    },
    {
      icon: MessageSquare,
      title: "FAQs",
      description: "Find quick answers to the most frequently asked questions.",
      href: "#faqs",
    },
    {
      icon: Settings,
      title: "Troubleshooting",
      description: "Resolve common issues and get technical help.",
      href: "#troubleshooting",
    },
    {
      icon: Mail,
      title: "Contact Support",
      description:
        "Cannot find what you need? Get in touch with our support team.",
      href: "/contact",
    },
  ];

  const guides = [
    {
      icon: Play,
      title: "Creating Your First Board",
      steps: [
        "Sign in to your Danke account or create one",
        'Click "Create Board" and choose your occasion type',
        "Add a compelling title and description",
        "Customize colors, layout, and privacy settings",
        "Share the link and start collecting messages",
      ],
    },
    {
      icon: Users,
      title: "Inviting Contributors",
      steps: [
        "Copy your board's unique shareable link",
        "Share via email, messaging apps, or social media",
        "Include context about who the board is for",
        "Set a deadline to encourage timely participation",
        "Send gentle reminders as the deadline approaches",
      ],
    },
    {
      icon: Settings,
      title: "Managing Board Settings",
      steps: [
        "Access settings from the board management page",
        "Enable or disable moderation for content approval",
        "Control privacy settings and link sharing",
        "Customize appearance and layout options",
        "Archive or delete boards when no longer needed",
      ],
    },
    {
      icon: Sparkles,
      title: "Presenting Your Board",
      steps: [
        "Use slideshow mode for beautiful presentations",
        "Review and moderate messages before the reveal",
        "Share screen for group viewing during celebrations",
        "Export as PDF for printing or digital sharing",
        "Keep the board active for ongoing access",
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
                Help Center
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                How can we help?
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Find answers to common questions, learn how to use Danke
                effectively, and get support when you need it.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4 text-gray-700" />
                <span>Tips, guides, and quick fixes in one place.</span>
              </div>
            </div>

            <PolaroidCard
              size="large"
              className="w-full max-w-lg mx-auto p-8 md:p-10"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Quick start
                </p>
                <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                  Get unstuck fast.
                </h2>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Start a board in minutes with our guides.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Browse FAQs for the fastest answers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Contact support and hear back within 24 hours.</span>
                  </li>
                </ul>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Quick Help
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Popular topics
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Start here for the most requested help.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="h-full">
                  <PolaroidCard
                    size="medium"
                    className="w-full max-w-none p-6 h-full"
                  >
                    <div className="flex flex-col gap-4 h-full">
                      <div className="w-12 h-12 bg-[#FDF6E3] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </PolaroidCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How-To Guides */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Step-by-step
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              How-to guides
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn how to make the most of Danke with these detailed guides.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <PolaroidCard
                  key={guide.title}
                  size="large"
                  className="w-full max-w-none p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#FDF6E3] rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-800" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {guide.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {guide.steps.map((step) => (
                      <li key={step} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section id="faqs" className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              General questions
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 text-lg">
              Common questions about using Danke
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            {generalFAQs.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`general-${index}`}
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

      {/* Troubleshooting Section */}
      <section id="troubleshooting" className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Troubleshooting
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Common issues and solutions
            </h2>
            <p className="text-gray-600 text-lg">
              Quick fixes for common problems
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            {troubleshootingFAQs.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`troubleshooting-${index}`}
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

      {/* Still Need Help Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Still need help?
            </p>
            <h2 className="text-3xl md:text-5xl font-fuzzy-bubbles mb-6 text-gray-900">
              Cannot find what you are looking for?
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Our support team is here to help. Get in touch and we will respond
              within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Link href="/guides">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold h-14 px-8 text-base"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View All Guides
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
