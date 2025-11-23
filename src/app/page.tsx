import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { ScrambledPictureLibrary } from "@/components/ui/scrambled-picture-library";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import {
  Award,
  Cake,
  CheckCircle,
  Download,
  Eye,
  Gift,
  GraduationCap,
  Grid,
  Heart,
  Home,
  ImageIcon,
  Lock,
  Mail,
  Monitor,
  Palette,
  PartyPopper,
  Presentation,
  QrCode,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Type,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Unique Hero Section - Memory Canvas Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-purple-900 flex-shrink-0">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-pulse"></div>
        </div>

        <div className="container-default section-padding relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Badge */}
            <div className="animate-in mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                <Heart className="w-4 h-4 text-pink-300" />
                <span className="text-white font-semibold">
                  A simple way to share appreciation
                </span>
              </div>
            </div>

            {/* Main Heading - More Creative */}
            <h1 className="animate-in-delay-1 mb-8 text-white">
              <span className="block text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Danke
              </span>
              <span className="block text-2xl md:text-4xl text-white/90 font-light">
                Collect and share memories, together
              </span>
            </h1>

            {/* What It Actually Does - Clear Description */}
            <div className="animate-in-delay-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                <span className="font-bold text-pink-300">Danke</span> brings
                people together to celebrate what matters. Collect heartfelt
                messages, cherished photos, and meaningful videos in one
                beautiful place, then share the joy with a stunning slideshow.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-in-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <SignedIn>
                <Link href="/create-board">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-purple-900 border-0 min-w-[240px] h-16 text-lg font-bold shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105"
                  >
                    <Sparkles className="w-6 h-6 mr-2" />
                    Create a Board
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/20 min-w-[240px] h-16 text-lg font-semibold"
                  >
                    My Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-purple-900 border-0 min-w-[240px] h-16 text-lg font-bold shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105"
                  >
                    <Sparkles className="w-6 h-6 mr-2" />
                    Try It Free
                  </Button>
                </SignUpButton>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/20 min-w-[240px] h-16 text-lg font-semibold"
                  >
                    See How It Works
                  </Button>
                </Link>
              </SignedOut>
            </div>

            {/* Trust Indicators */}
            <div className="animate-in-delay-4 flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">Set up in 60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-300" />
                <span className="font-medium">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="font-medium">Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-400/20 rounded-full blur-lg animate-pulse"></div>
      </section>

      {/* What Makes Danke Different */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative mt-16">
        <div className="container-default">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600">Why people like Danke</span>
            </div>
            <h2 className="mb-6 text-gray-900 text-5xl md:text-6xl font-black">
              A Better Way to Appreciate
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              Cards get lost. Emails get buried. Sticky notes fade.{" "}
              <span className="font-bold text-purple-600">
                Danke preserves appreciation beautifully, forever.
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                color: "bg-pink-500",
                bgColor: "bg-pink-50",
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
                color: "bg-purple-500",
                bgColor: "bg-purple-50",
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
                color: "bg-cyan-500",
                bgColor: "bg-cyan-50",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`${feature.bgColor} border-2 border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 group`}
                  style={{
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <div className="mb-2">
                    <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                      {feature.subtitle}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Actually Works - Detailed */}
      <section
        id="how-it-works"
        className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-indigo-900 text-white relative overflow-hidden"
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="container-default relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Rocket className="w-4 h-4 text-cyan-300" />
              <span className="text-white">Step-by-Step Guide</span>
            </div>
            <h2 className="mb-6 text-white text-5xl md:text-6xl font-black">
              How Danke Works
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
              From creation to celebration in four simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {[
              {
                step: "01",
                emoji: "🎨",
                title: "Create Your Board",
                description:
                  "Pick from 14 board types for any occasion, choose your colors, and set privacy controls. Takes about a minute to get everything ready.",
              },
              {
                step: "02",
                emoji: "🔗",
                title: "Share the Link",
                description:
                  "Copy your unique link and share it however you like—email, text, QR code. Contributors don't need to sign up, they just click and start adding.",
              },
              {
                step: "03",
                emoji: "💝",
                title: "Watch It Fill Up",
                description:
                  "People add messages, photos, videos, and more. Everything appears in real-time in a beautiful layout, and you can moderate posts if you want.",
              },
              {
                step: "04",
                emoji: "🎭",
                title: "Present & Celebrate",
                description:
                  "Launch full-screen slideshow mode to display everything beautifully. Auto-scrolling handles long messages, and smooth transitions make every contribution shine.",
              },
            ].map((step, idx) => {
              return (
                <div
                  key={step.step}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Step Number & Emoji */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="text-8xl md:text-9xl font-black text-white/5 absolute -top-6 -left-2">
                            {step.step}
                          </div>
                          <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center">
                            <span className="text-6xl">{step.emoji}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                            {step.title}
                          </h3>
                          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {idx < 3 && (
                    <div className="flex justify-center py-4">
                      <div className="w-1 h-12 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white mt-16">
        <div className="container-default">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Wand2 className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600">Powerful Features</span>
            </div>
            <h2 className="mb-6 text-gray-900 text-5xl md:text-6xl font-black">
              What's Included
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Thoughtful features that make celebrating easy and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: Type,
                title: "Rich Text Editor",
                description:
                  "Format text with colors, styles, headings, lists, and emojis. Make your message stand out.",
                color: "bg-blue-500",
              },
              {
                icon: ImageIcon,
                title: "Media Gallery",
                description:
                  "Upload photos, videos, GIFs, and audio. Each post supports multiple files.",
                color: "bg-pink-500",
              },
              {
                icon: Grid,
                title: "Masonry Layout",
                description:
                  "Your board automatically arranges in a beautiful Pinterest-style grid.",
                color: "bg-purple-500",
              },
              {
                icon: Monitor,
                title: "Slideshow Mode",
                description:
                  "Full-screen presentation with auto-advance, transitions, and custom backgrounds.",
                color: "bg-cyan-500",
              },
              {
                icon: QrCode,
                title: "QR Code Sharing",
                description:
                  "Generate QR codes for events. Perfect for weddings, parties, and gatherings.",
                color: "bg-green-500",
              },
              {
                icon: Mail,
                title: "Email Invites",
                description:
                  "Send contribution invites directly via email from the platform.",
                color: "bg-orange-500",
              },
              {
                icon: Lock,
                title: "Privacy Controls",
                description:
                  "Restrict access by email domain, enable moderation, or keep it fully public.",
                color: "bg-red-500",
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description:
                  "Watch posts appear live as people contribute. No refresh needed.",
                color: "bg-yellow-500",
              },
              {
                icon: Download,
                title: "Export & Share",
                description:
                  "Download your board or share it anywhere with a permanent link.",
                color: "bg-indigo-500",
              },
              {
                icon: Users,
                title: "Unlimited Contributors",
                description:
                  "No limits on how many people can add to your board. The more, the merrier!",
                color: "bg-teal-500",
              },
              {
                icon: Eye,
                title: "View Tracking",
                description:
                  "See how many people have viewed your board and contributed.",
                color: "bg-violet-500",
              },
              {
                icon: Palette,
                title: "10 Color Themes",
                description:
                  "Choose from 10 vibrant background colors to match your event's vibe.",
                color: "bg-rose-500",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300 group"
                  style={{
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Board Types Showcase */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-purple-50 mt-16">
        <div className="container-default">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white border border-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
              <Star className="w-4 h-4 text-orange-500" />
              <span className="text-purple-600">14 Ready-Made Templates</span>
            </div>
            <h2 className="mb-6 text-gray-900 text-5xl md:text-6xl font-black">
              Every Occasion Covered
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Pre-designed boards for life's most important moments
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Birthday",
                icon: Cake,
                color: "bg-pink-500",
                emoji: "🎂",
              },
              {
                name: "Appreciation",
                icon: Heart,
                color: "bg-red-500",
                emoji: "❤️",
              },
              {
                name: "Farewell",
                icon: PartyPopper,
                color: "bg-blue-500",
                emoji: "👋",
              },
              {
                name: "Congratulations",
                icon: Star,
                color: "bg-yellow-500",
                emoji: "⭐",
              },
              {
                name: "Graduation",
                icon: GraduationCap,
                color: "bg-green-500",
                emoji: "🎓",
              },
              {
                name: "Welcome",
                icon: Home,
                color: "bg-purple-500",
                emoji: "🏠",
              },
              {
                name: "Anniversary",
                icon: Gift,
                color: "bg-pink-500",
                emoji: "🎁",
              },
              {
                name: "Get Well Soon",
                icon: Heart,
                color: "bg-green-500",
                emoji: "💚",
              },
              {
                name: "Thank You",
                icon: Sparkles,
                color: "bg-cyan-500",
                emoji: "🙏",
              },
              {
                name: "Wedding",
                icon: Heart,
                color: "bg-rose-500",
                emoji: "💍",
              },
              {
                name: "Retirement",
                icon: PartyPopper,
                color: "bg-orange-500",
                emoji: "🌅",
              },
              {
                name: "Baby Shower",
                icon: Gift,
                color: "bg-blue-400",
                emoji: "👶",
              },
              {
                name: "Milestone",
                icon: Award,
                color: "bg-purple-500",
                emoji: "🏆",
              },
              {
                name: "Condolences",
                icon: Heart,
                color: "bg-gray-500",
                emoji: "🕊️",
              },
            ].map((type, idx) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.name}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-14 h-14 ${type.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                      {type.emoji}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {type.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-slate-800 text-white">
        <div className="container-default">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Eye className="w-4 h-4 text-cyan-300" />
              <span className="text-white">See It In Action</span>
            </div>
            <h2 className="mb-6 text-white text-5xl md:text-6xl font-black">
              See What It Looks Like
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto">
              Here are some example boards
            </p>
          </div>

          {/* Add the scrambled picture library here as a visual demo */}
          <div className="max-w-4xl mx-auto mb-12">
            <ScrambledPictureLibrary className="hover:cursor-pointer" />
          </div>

          <div className="text-center">
            <p className="text-white/70 text-lg mb-8">
              Hover over the boards above to see them in action →
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="container-narrow relative z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 md:p-20 text-center shadow-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-bold">Ready to Start?</span>
            </div>

            <h2 className="mb-6 text-white text-4xl md:text-6xl font-black">
              Want to Try It?
              <br />
              <span className="text-white/90 text-3xl md:text-5xl">
                It takes about a minute to set up
              </span>
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Free to use, no credit card needed.
              <br />
              <span className="font-bold">
                Create as many boards as you'd like.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignedIn>
                <Link href="/create-board">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-purple-700 border-0 min-w-[220px] h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create a Board
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-purple-700 border-0 min-w-[220px] h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try It Free
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Footer />
      </div>
    </div>
  );
}
