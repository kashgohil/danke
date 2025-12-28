import { Clock, Mail, MessageCircle, Pin, Send, Twitter } from "lucide-react";
import { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PolaroidCard } from "@/components/ui/polaroid-card";

export const metadata: Metadata = {
  title: "Contact Us - Danke",
  description:
    "Get in touch with the Danke team. We're here to help with questions, feedback, or support.",
};

export default function ContactPage() {
  const faqItems = [
    {
      question: "Is Danke really free?",
      answer:
        "Yes! Danke is completely free to use. Create unlimited boards, invite unlimited contributors, and keep your boards forever. We believe appreciation shouldn't have a price tag.",
      emoji: "\u{1F4B0}",
    },
    {
      question: "Do contributors need to create an account?",
      answer:
        "No! Anyone with the link can contribute messages, photos, and videos without signing up. Only board creators need an account to manage their boards.",
      emoji: "\u{1F465}",
    },
    {
      question: "How long do boards stay available?",
      answer:
        "Forever! Your boards never expire. They're always accessible via their unique link, so recipients can revisit their memories anytime.",
      emoji: "\u{267E}\u{FE0F}",
    },
    {
      question: "Can I moderate or remove posts?",
      answer:
        "Absolutely. As the board creator, you have full control. You can review posts before they appear (moderation mode), edit, or remove any content.",
      emoji: "\u{1F6E1}\u{FE0F}",
    },
    {
      question: "What file types can I upload?",
      answer:
        "We support images (JPG, PNG, GIF, WebP), videos (MP4, WebM), and audio files. Each post can include multiple media files.",
      emoji: "\u{1F4C1}",
    },
    {
      question: "Can I make my board private?",
      answer:
        "Yes! You can restrict who can view your board, require approval for posts, or even limit contributors to specific email domains (great for workplace boards).",
      emoji: "\u{1F512}",
    },
    {
      question: "How does the slideshow mode work?",
      answer:
        "Click the slideshow button on any board to launch a full-screen presentation. Posts auto-advance, long messages auto-scroll, and transitions are smooth. Perfect for parties and events!",
      emoji: "\u{1F3AC}",
    },
    {
      question: "Can I download or export my board?",
      answer:
        "Yes! You can share your board via link, and all the content is preserved permanently. We're also working on PDF and video export features.",
      emoji: "\u{1F4E5}",
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Contact
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                Let's keep the gratitude going.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                We'd love to hear from you. Share feedback, ask a question, or
                tell us about the celebration you're planning.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                <MessageCircle className="w-4 h-4 text-gray-700" />
                <span>We read every message and respond with care.</span>
              </div>
            </div>

            <PolaroidCard
              size="large"
              className="w-full max-w-lg mx-auto p-8 md:p-10"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  A quick note
                </p>
                <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                  We reply within 24 hours.
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Whether it's a question or a bug report, we want you to feel
                  heard.
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-700" />
                  <span>Support hours: Monday to Friday</span>
                </div>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start">
            {/* Contact Form */}
            <PolaroidCard className="w-full max-w-none p-8 md:p-12">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                  Send a message
                </p>
                <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                  We're happy to help.
                </h2>
                <p className="text-gray-600 text-lg mt-3">
                  Fill out the form and we'll get back to you soon.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-gray-700 font-semibold"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="h-12 bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-gray-700 font-semibold"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="h-12 bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 font-semibold"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-gray-700 font-semibold"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    className="h-12 bg-white border-gray-300 focus:border-gray-900 focus:ring-gray-900/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-gray-700 font-semibold"
                  >
                    Message
                  </Label>
                  <textarea
                    id="message"
                    className="min-h-[150px] w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 focus-visible:border-gray-900 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    placeholder="Tell us more about your question or feedback..."
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold h-14 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </PolaroidCard>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Other ways to connect
              </p>

              <PolaroidCard size="medium" className="w-full max-w-none p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FDF6E3] rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">Email</p>
                    <a
                      href="mailto:hello@trydanke.link"
                      className="text-gray-700 hover:text-gray-900 font-medium"
                    >
                      hello@trydanke.link
                    </a>
                  </div>
                </div>
              </PolaroidCard>

              <PolaroidCard size="medium" className="w-full max-w-none p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FDF6E3] rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">Support</p>
                    <a
                      href="mailto:support@trydanke.link"
                      className="text-gray-700 hover:text-gray-900 font-medium"
                    >
                      support@trydanke.link
                    </a>
                  </div>
                </div>
              </PolaroidCard>

              <PolaroidCard size="medium" className="w-full max-w-none p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FDF6E3] rounded-xl flex items-center justify-center">
                    <Twitter className="w-6 h-6 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      Twitter / X
                    </p>
                    <a
                      href="https://x.com/trydanke"
                      className="text-gray-700 hover:text-gray-900 font-medium"
                    >
                      @trydanke
                    </a>
                  </div>
                </div>
              </PolaroidCard>

              <PolaroidCard size="medium" className="w-full max-w-none p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FDF6E3] rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      Response Time
                    </p>
                    <p className="text-gray-700 font-medium">Within 24 hours</p>
                  </div>
                </div>
              </PolaroidCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 text-lg">
              Common questions about getting in touch
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="relative border-4 border-gray-900 rounded-sm bg-white shadow-2xl"
              >
                <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
                  <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
                </div>
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-lg font-bold text-gray-900 font-fuzzy-bubbles">
                      {item.question}
                    </span>
                  </div>
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
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl md:text-5xl font-fuzzy-bubbles mb-6 text-gray-900">
              Create your first appreciation board today
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Start building stronger connections in your community. It's free
              and takes less than a minute.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all"
              >
                Create Your First Board
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold h-14 px-8 text-base"
              >
                View Examples
              </Button>
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
