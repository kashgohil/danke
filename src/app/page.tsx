import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import { ScrambledPictureLibrary } from "@/components/ui/scrambled-picture-library";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import {
  CheckCircle,
  ChevronDown,
  Download,
  Eye,
  Grid,
  Heart,
  ImageIcon,
  Lock,
  Mail,
  Monitor,
  Palette,
  Pin,
  Presentation,
  QrCode,
  Sparkles,
  Star,
  Type,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
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
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-20">
        <div className="flex-shrink-0 w-full px-4 sm:px-6 lg:px-0 lg:flex-grow lg:max-w-xl">
          <PolaroidCard
            size="large"
            className="w-full transition-transform duration-500"
          >
            <div className="text-center p-4 md:p-8">
              {/* Main Heading */}
              <h1 className="mb-6 text-gray-900">
                <span className="block text-6xl uppercase text-gray-800 font-fuzzy-bubbles">
                  Collect memories, together
                </span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-black leading-relaxed mb-8 max-w-lg mx-auto">
                Bring people together to celebrate what matters. Collect
                heartfelt messages and cherished photos in one beautiful place.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-sm mx-auto">
                <SignedIn>
                  <Link href="/create-board">
                    <Button
                      size="lg"
                      className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create a Board
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8"
                    >
                      My Dashboard
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignUpButton>
                    <Button
                      size="lg"
                      className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Try It Free
                    </Button>
                  </SignUpButton>
                  <Link href="#how-it-works">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8"
                    >
                      Learn More
                    </Button>
                  </Link>
                </SignedOut>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Quick setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-red-500" />
                  </div>
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-black" />
                  </div>
                  <span>No signup needed</span>
                </div>
              </div>
            </div>
          </PolaroidCard>
        </div>

        {/* Decorative polaroids - distributed across all edges like a photoboard */}
        {/* Top-left corner - visible on lg+ */}
        <div className="absolute hidden lg:block top-[calc(50%_-_24rem)] left-[calc(50%_-_33rem)] xl:left-[calc(50%_-_34rem)] -rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-90">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">🎂</div>
              <p className="text-base text-gray-800">Birthday wishes</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Top-right corner - visible on lg+ */}
        <div className="absolute hidden lg:block top-[calc(50%_-_24rem)] left-[calc(50%_+_24rem)] rotate-5 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-90">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">💍</div>
              <p className="text-base text-gray-800">Wedding memories</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Top-center - visible on 2xl+ only (needs wide screen to not overlap main) */}
        <div className="absolute hidden 2xl:block top-[calc(50%_-_28rem)] left-1/2 -translate-x-1/2 rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-75">
          <PolaroidCard size="small" className="w-36">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">🌅</div>
              <p className="text-base text-gray-800">Retirement</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Left side upper - visible on xl+ */}
        <div className="absolute hidden xl:block top-[calc(50%_-_8rem)] left-[calc(50%_-_33rem)] xl:left-[calc(50%_-_34rem)] -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-80">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">🎓</div>
              <p className="text-base text-gray-800">Graduation</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Left side lower - visible on xl+ */}
        <div className="absolute hidden xl:block top-[calc(50%_+_8rem)] left-[calc(50%_-_33rem)] xl:left-[calc(50%_-_34rem)] -rotate-4 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-80">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">👋</div>
              <p className="text-base text-gray-800">Farewell</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Right side upper - visible on xl+ */}
        <div className="absolute hidden xl:block top-[calc(50%_-_8rem)] left-[calc(50%_+_24rem)] rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-80">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">🎁</div>
              <p className="text-base text-gray-800">Anniversary</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Right side lower - visible on xl+ */}
        <div className="absolute hidden xl:block top-[calc(50%_+_8rem)] left-[calc(50%_+_24rem)] rotate-4 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-80">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">💕</div>
              <p className="text-base text-gray-800">Appreciation</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Bottom-left corner - visible on lg+ */}
        <div className="absolute hidden lg:block top-[calc(50%_+_24rem)] left-[calc(50%_-_33rem)] xl:left-[calc(50%_-_34rem)] -rotate-5 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-90">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">🙏</div>
              <p className="text-base text-gray-800">Thank you</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Bottom-right corner - visible on lg+ */}
        <div className="absolute hidden lg:block top-[calc(50%_+_24rem)] left-[calc(50%_+_24rem)] rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-90">
          <PolaroidCard size="small" className="w-36 xl:w-40">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">🎉</div>
              <p className="text-base text-gray-800">Celebrations</p>
            </div>
          </PolaroidCard>
        </div>

        {/* Bottom-center - visible on 2xl+ only (needs wide screen to not overlap main) */}
        <div className="absolute hidden 2xl:block top-[calc(50%_+_24rem)] left-1/2 -translate-x-1/2 -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer opacity-75">
          <PolaroidCard size="small" className="w-36">
            <div className="text-center p-2">
              <div className="text-4xl mb-1">👶</div>
              <p className="text-base text-gray-800">Baby shower</p>
            </div>
          </PolaroidCard>
        </div>
      </section>

      {/* What Makes Danke Different */}
      <section className="py-16 md:py-24 px-6">
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              A Better Way to Appreciate
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cards get lost. Emails get buried. Sticky notes fade.{" "}
              <span className="font-semibold text-black">
                Danke preserves appreciation beautifully, forever.
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Palette,
                title: "Rich Media Support",
                subtitle: "Beyond Just Text",
                description:
                  "Add photos, videos, audio clips, GIFs, and beautifully formatted text. Each post supports unlimited media files, creating a rich tapestry of memories.",
                features: [
                  "Upload multiple files per post",
                  "Drag & drop media",
                  "Auto-optimized for web",
                ],
              },
              {
                icon: Presentation,
                title: "Cinematic Slideshow",
                subtitle: "Theater Mode",
                description:
                  "Transform your board into a full-screen presentation. Auto-scrolling text, smooth transitions, and beautiful layouts make every memory shine.",
                features: [
                  "Full-screen immersive mode",
                  "Auto-advance slides",
                  "Custom backgrounds",
                ],
              },
              {
                icon: Users,
                title: "Collaborative Magic",
                subtitle: "Everyone Contributes",
                description:
                  "Share a unique link. Anyone can contribute without signing up. Watch messages appear in real-time as people share their appreciation.",
                features: [
                  "No account needed to contribute",
                  "Real-time updates",
                  "Anonymous posting option",
                ],
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <PolaroidCard
                  key={feature.title}
                  size="medium"
                  className="hover:rotate-0 transition-transform duration-300"
                >
                  <div className="text-center p-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-black uppercase tracking-wide mb-2">
                        {feature.subtitle}
                      </div>
                      <h3 className="text-xl font-fuzzy-bubbles font-bold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-5">
                      {feature.description}
                    </p>
                    <ul className="space-y-2 text-left bg-gray-50 rounded-lg p-4">
                      {feature.features.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-gray-600 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 px-6 bg-white/40">
        <div className="container-default">
          <div className="flex flex-col items-center mb-16">
            <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              Create & Celebrate in Minutes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              From creation to celebration in four simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  step: "01",
                  emoji: "🎨",
                  title: "Create Your Board",
                  description:
                    "Pick from 14 board types for any occasion, choose your colors, and set privacy controls. Takes about a minute.",
                },
                {
                  step: "02",
                  emoji: "🔗",
                  title: "Share the Link",
                  description:
                    "Copy your unique link and share it however you like—email, text, QR code. No signup required for contributors.",
                },
                {
                  step: "03",
                  emoji: "💝",
                  title: "Watch It Fill Up",
                  description:
                    "People add messages, photos, and videos. Everything appears in real-time. Moderate posts whenever you want.",
                },
                {
                  step: "04",
                  emoji: "🎭",
                  title: "Present & Celebrate",
                  description:
                    "Launch full-screen slideshow mode. Auto-scrolling handles long messages with smooth transitions.",
                },
              ].map((step, idx) => {
                return (
                  <PolaroidCard
                    key={step.step}
                    size="medium"
                    className="hover:rotate-0 transition-transform duration-300"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                          {step.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-black uppercase tracking-wide">
                              Step {step.step}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 font-fuzzy-bubbles mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </PolaroidCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="container-default">
          <div className="flex flex-col items-center mb-16">
            <h2 className="mb-4 text-gray-900 text-center text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 w-full max-w-2xl text-center mx-auto lg:mx-0">
              Thoughtful features that make celebrating easy and meaningful
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              {
                icon: Type,
                title: "Rich Text",
                description:
                  "Format with colors, styles, headings, and emojis.",
              },
              {
                icon: ImageIcon,
                title: "Media Gallery",
                description: "Photos, videos, GIFs, and audio support.",
              },
              {
                icon: Grid,
                title: "Masonry Layout",
                description: "Beautiful Pinterest-style grid automatically.",
              },
              {
                icon: Monitor,
                title: "Slideshow Mode",
                description: "Full-screen presentations with transitions.",
              },
              {
                icon: QrCode,
                title: "QR Codes",
                description: "Generate codes for events and parties.",
              },
              {
                icon: Mail,
                title: "Email Invites",
                description: "Send contribution invites directly.",
              },
              {
                icon: Lock,
                title: "Privacy Controls",
                description: "Domain restrictions and moderation.",
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description: "Watch posts appear live as they come in.",
              },
              {
                icon: Download,
                title: "Export & Share",
                description: "Download or share with permanent links.",
              },
              {
                icon: Users,
                title: "Unlimited People",
                description:
                  "No limits on contributors. The more, the merrier!",
              },
              {
                icon: Eye,
                title: "View Tracking",
                description: "See how many viewed and contributed.",
              },
              {
                icon: Palette,
                title: "Color Themes",
                description: "10 vibrant backgrounds to match your event.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <PolaroidCard
                  key={feature.title}
                  className="hover:rotate-0 w-full transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-fuzzy-bubbles font-bold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Board Types */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900 text-3xl font-fuzzy-bubbles md:text-5xl font-bold">
              Every Occasion Covered
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pre-designed boards for life's most important moments
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { name: "Birthday", emoji: "🎂" },
              { name: "Appreciation", emoji: "💕" },
              { name: "Farewell", emoji: "👋" },
              { name: "Congratulations", emoji: "⭐" },
              { name: "Graduation", emoji: "🎓" },
              { name: "Welcome", emoji: "🏠" },
              { name: "Anniversary", emoji: "💝" },
              { name: "Get Well", emoji: "💚" },
              { name: "Thank You", emoji: "🙏" },
              { name: "Wedding", emoji: "💍" },
              { name: "Retirement", emoji: "🌅" },
              { name: "Baby Shower", emoji: "👶" },
              { name: "Milestone", emoji: "🏆" },
              { name: "Condolences", emoji: "🕊️" },
            ].map((type, idx) => {
              return (
                <PolaroidCard
                  key={type.name}
                  className="hover:rotate-0 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <div className="text-center p-3">
                    <div className="text-4xl mb-3">{type.emoji}</div>
                    <h3 className="font-fuzzy-bubbles text-lg font-bold text-gray-900">
                      {type.name}
                    </h3>
                  </div>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Demo */}
      <section className="py-16 md:py-24 px-6">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              See It in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here are some example boards from real celebrations
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
              <ScrambledPictureLibrary className="hover:cursor-pointer" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Hover over the boards above to see them in action →
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases / Inspiration */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              How People Use Danke
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories of connection and celebration from our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                emoji: "🏢",
                title: "Workplace Celebrations",
                scenario:
                  "Sarah's team surprised her with 47 heartfelt messages when she got promoted",
                quote:
                  "I cried happy tears reading every single one. It's something I'll treasure forever.",
                person: "Sarah, Marketing Director",
              },
              {
                emoji: "🌍",
                title: "Long-Distance Love",
                scenario:
                  "A family scattered across 5 countries came together for grandma's 80th birthday",
                quote:
                  "My grandchildren in Australia, Germany, and the US all contributed. It felt like everyone was in the room.",
                person: "Maria, Grandmother",
              },
              {
                emoji: "🎓",
                title: "Graduation Memories",
                scenario:
                  "A graduating class of 200 students created a board for their beloved teacher",
                quote:
                  "After 30 years of teaching, this was the most meaningful gift I've ever received.",
                person: "Mr. Johnson, Teacher",
              },
              {
                emoji: "👋",
                title: "Farewell with Heart",
                scenario:
                  "When Jake left for his new adventure, his coworkers filled a board with memories",
                quote:
                  "I look back at it whenever I miss my old team. The photos and inside jokes are priceless.",
                person: "Jake, Software Engineer",
              },
              {
                emoji: "💒",
                title: "Wedding Wishes",
                scenario:
                  "Guests who couldn't attend the wedding sent video messages and photos",
                quote:
                  "We played the slideshow at our reception. There wasn't a dry eye in the house.",
                person: "Emma & David, Newlyweds",
              },
              {
                emoji: "🏥",
                title: "Get Well Support",
                scenario:
                  "A community rallied around a neighbor recovering from surgery",
                quote:
                  "Reading those messages during recovery gave me strength. I felt so supported.",
                person: "Robert, Community Member",
              },
            ].map((useCase) => (
              <PolaroidCard
                key={useCase.title}
                className="hover:rotate-0 transition-all duration-300"
              >
                <div className="p-2">
                  <div className="text-center mb-3">
                    <span className="text-4xl">{useCase.emoji}</span>
                  </div>
                  <h3 className="text-lg font-fuzzy-bubbles font-bold text-gray-900 text-center mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-3 leading-relaxed text-center">
                    {useCase.scenario}
                  </p>
                  <div className="bg-amber-50/50 rounded p-3 border border-amber-100">
                    <p className="text-gray-700 mb-2 text-center">
                      "{useCase.quote}"
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      — {useCase.person}
                    </p>
                  </div>
                </div>
              </PolaroidCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Social Proof Numbers */}
      <section className="py-16 md:py-20 px-6">
        <div className="container-default">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              Spreading Gratitude Everywhere
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands who are making appreciation meaningful
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              { number: "10,000+", label: "Boards Created", emoji: "📋" },
              { number: "50,000+", label: "Messages Shared", emoji: "💌" },
              { number: "100+", label: "Countries", emoji: "🌎" },
              { number: "4.9/5", label: "User Rating", emoji: "⭐" },
            ].map((stat) => (
              <PolaroidCard
                key={stat.label}
                size="small"
                className="hover:rotate-0 transition-all duration-300 w-36 md:w-44"
              >
                <div className="text-center p-2">
                  <span className="text-3xl mb-2 block">{stat.emoji}</span>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-xs">{stat.label}</div>
                </div>
              </PolaroidCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              Loved by Teams & Families
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what people are saying about their Danke experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "We used Danke for our CEO's retirement. The slideshow at the party had everyone in tears. So much better than a generic card!",
                author: "Jennifer M.",
                role: "HR Director",
                emoji: "👩‍💼",
              },
              {
                quote:
                  "My daughter is in the military overseas. For her birthday, we collected messages from 30+ family members. She said it was the best gift ever.",
                author: "Patricia L.",
                role: "Proud Mom",
                emoji: "👩",
              },
              {
                quote:
                  "As a teacher, I created boards for each graduating class. Parents love contributing, and students have a keepsake forever.",
                author: "Michael T.",
                role: "High School Teacher",
                emoji: "👨‍🏫",
              },
              {
                quote:
                  "The QR code feature is genius! We put it on the party invitation and people contributed before they even arrived.",
                author: "Amanda K.",
                role: "Event Planner",
                emoji: "🎉",
              },
              {
                quote:
                  "I've tried other group card apps. Danke is the only one that looks beautiful AND is actually easy to use. The slideshow mode is amazing.",
                author: "David R.",
                role: "Designer",
                emoji: "🎨",
              },
              {
                quote:
                  "We surprised our volunteer coordinator with messages from everyone she's helped over the years. She couldn't stop smiling for days.",
                author: "Community Center",
                role: "Non-profit Organization",
                emoji: "💚",
              },
            ].map((testimonial, idx) => (
              <PolaroidCard
                key={idx}
                className="hover:rotate-0 transition-all duration-300"
              >
                <div className="p-3">
                  <div className="flex gap-1 mb-3 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 text-center">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-100">
                    <span className="text-2xl">{testimonial.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </PolaroidCard>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              Why Choose Danke?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how Danke compares to traditional ways of showing appreciation
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Traditional Card */}
              <PolaroidCard className="hover:rotate-0 transition-all duration-300 opacity-75">
                <div className="p-4 text-center">
                  <span className="text-4xl mb-3 block">💌</span>
                  <h3 className="text-xl font-fuzzy-bubbles font-bold text-gray-900 mb-1">
                    Traditional Card
                  </h3>
                  <p className="text-gray-500 text-xs mb-4">The old way</p>
                  <ul className="space-y-2 text-left">
                    {[
                      "Limited space for messages",
                      "Gets lost or damaged",
                      "No photos or videos",
                      "Hard to coordinate",
                      "One-time viewing",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PolaroidCard>

              {/* Group Email */}
              <PolaroidCard className="hover:rotate-0 transition-all duration-300 opacity-75">
                <div className="p-4 text-center">
                  <span className="text-4xl mb-3 block">📧</span>
                  <h3 className="text-xl font-fuzzy-bubbles font-bold text-gray-900 mb-1">
                    Group Email
                  </h3>
                  <p className="text-gray-500 text-xs mb-4">The messy way</p>
                  <ul className="space-y-2 text-left">
                    {[
                      "Gets buried in inbox",
                      "Messy reply-all chains",
                      "No presentation mode",
                      "Attachments get lost",
                      "Not visually appealing",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PolaroidCard>

              {/* Danke */}
              <div className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                  RECOMMENDED
                </div>
                <PolaroidCard className="hover:rotate-0 transition-all duration-300">
                  <div className="p-4 text-center">
                    <span className="text-4xl mb-3 block">✨</span>
                    <h3 className="text-xl font-fuzzy-bubbles font-bold text-gray-900 mb-1">
                      Danke
                    </h3>
                    <p className="text-gray-900 text-xs mb-4 font-medium">
                      The better way
                    </p>
                    <ul className="space-y-2 text-left">
                      {[
                        "Unlimited messages & media",
                        "Beautiful & permanent",
                        "Cinematic slideshow mode",
                        "Easy to share & contribute",
                        "Free forever",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </PolaroidCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <span className="text-5xl mb-4 block">🤔</span>
            <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Danke
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="p-4 md:p-6">
              <div className="space-y-3">
                {[
                  {
                    question: "Is Danke really free?",
                    answer:
                      "Yes! Danke is completely free to use. Create unlimited boards, invite unlimited contributors, and keep your boards forever. We believe appreciation shouldn't have a price tag.",
                    emoji: "💰",
                  },
                  {
                    question: "Do contributors need to create an account?",
                    answer:
                      "No! Anyone with the link can contribute messages, photos, and videos without signing up. Only board creators need an account to manage their boards.",
                    emoji: "👥",
                  },
                  {
                    question: "How long do boards stay available?",
                    answer:
                      "Forever! Your boards never expire. They're always accessible via their unique link, so recipients can revisit their memories anytime.",
                    emoji: "♾️",
                  },
                  {
                    question: "Can I moderate or remove posts?",
                    answer:
                      "Absolutely. As the board creator, you have full control. You can review posts before they appear (moderation mode), edit, or remove any content.",
                    emoji: "🛡️",
                  },
                  {
                    question: "What file types can I upload?",
                    answer:
                      "We support images (JPG, PNG, GIF, WebP), videos (MP4, WebM), and audio files. Each post can include multiple media files.",
                    emoji: "📁",
                  },
                  {
                    question: "Can I make my board private?",
                    answer:
                      "Yes! You can restrict who can view your board, require approval for posts, or even limit contributors to specific email domains (great for workplace boards).",
                    emoji: "🔒",
                  },
                  {
                    question: "How does the slideshow mode work?",
                    answer:
                      "Click the slideshow button on any board to launch a full-screen presentation. Posts auto-advance, long messages auto-scroll, and transitions are smooth. Perfect for parties and events!",
                    emoji: "🎬",
                  },
                  {
                    question: "Can I download or export my board?",
                    answer:
                      "Yes! You can share your board via link, and all the content is preserved permanently. We're also working on PDF and video export features.",
                    emoji: "📥",
                  },
                ].map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white rounded-sm border-4 border-black relative"
                  >
                    <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-amber-50/50 transition-colors">
                      <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
                        <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
                      </div>
                      <span className="text-xl">{faq.emoji}</span>
                      <span className="font-semibold text-gray-900 text font-fuzzy-bubbles flex-1 text-left">
                        {faq.question}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="p-4 pl-12">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link href="/help">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-white/50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-6">
        <div className="container-narrow">
          <div className="flex flex-col items-center gap-8">
            <PolaroidCard
              size="large"
              className="hover:rotate-0 transition-transform duration-500 w-full"
            >
              <div className="text-center relative p-8 md:p-12">
                <div className="relative z-10">
                  <h2 className="mb-4 text-gray-900 text-3xl md:text-5xl font-fuzzy-bubbles font-bold">
                    Ready to Try It?
                  </h2>
                  <p className="text-xl text-gray-600 mb-3 max-w-xl mx-auto">
                    It takes about a minute to set up your first board
                  </p>
                  <p className="text-base text-gray-500 mb-8 max-w-xl mx-auto">
                    Free to use, no credit card required. Create as many boards
                    as you'd like.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <SignedIn>
                      <Link href="/create-board">
                        <Button
                          size="lg"
                          className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Create a Board
                        </Button>
                      </Link>
                    </SignedIn>
                    <SignedOut>
                      <SignUpButton>
                        <Button
                          size="lg"
                          className="bg-gray-900 hover:bg-gray-800 text-white border-0 px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Try It Free
                        </Button>
                      </SignUpButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
