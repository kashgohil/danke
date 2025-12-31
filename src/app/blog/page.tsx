import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  Lightbulb,
  Sparkles,
  Users,
} from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Danke",
  description:
    "Discover tips, stories, and inspiration for creating meaningful appreciation boards. Learn how to celebrate the people who matter most.",
};

export default function BlogPage() {
  const featuredPost = {
    title: "The Psychology Behind Why Appreciation Matters",
    excerpt:
      "Discover the science-backed reasons why expressing gratitude and appreciation strengthens relationships, boosts mental health, and creates lasting positive impact in communities.",
    category: "Insights",
    readTime: "8 min read",
    date: "Nov 20, 2024",
    image: "🧠",
    author: "Danke Team",
  };

  const blogPosts = [
    {
      title: "10 Creative Ways to Use Appreciation Boards",
      excerpt:
        "From farewell parties to milestone celebrations, discover unique and creative ways to use appreciation boards that go beyond the traditional use cases.",
      category: "Tips & Tricks",
      readTime: "6 min read",
      date: "Nov 18, 2024",
      image: "💡",
      author: "Sarah Chen",
    },
    {
      title: "How Remote Teams Stay Connected with Danke",
      excerpt:
        "Learn how distributed teams use appreciation boards to maintain culture, celebrate wins, and foster genuine connections across time zones.",
      category: "Use Cases",
      readTime: "5 min read",
      date: "Nov 15, 2024",
      image: "🌍",
      author: "Michael Roberts",
    },
    {
      title: "Writing Meaningful Messages: A Guide",
      excerpt:
        "Struggling with what to write? This guide will help you craft heartfelt, authentic messages that truly resonate and make lasting impressions.",
      category: "How-To",
      readTime: "7 min read",
      date: "Nov 12, 2024",
      image: "✍️",
      author: "Emma Taylor",
    },
    {
      title: "The Ultimate Farewell Board Checklist",
      excerpt:
        "Planning a farewell celebration? Follow this comprehensive checklist to create a memorable send-off that your colleague will treasure forever.",
      category: "Resources",
      readTime: "10 min read",
      date: "Nov 10, 2024",
      image: "✅",
      author: "Alex Kumar",
    },
    {
      title: "Celebrating Milestones: A Year in Review",
      excerpt:
        "Real stories from teams who used appreciation boards to celebrate anniversaries, promotions, and major achievements throughout the year.",
      category: "Stories",
      readTime: "8 min read",
      date: "Nov 8, 2024",
      image: "🎉",
      author: "Jessica Martinez",
    },
    {
      title: "5 Templates to Kickstart Your Next Board",
      excerpt:
        "Save time with these proven board templates designed for birthdays, retirements, thank you boards, team celebrations, and more.",
      category: "Templates",
      readTime: "4 min read",
      date: "Nov 5, 2024",
      image: "📋",
      author: "David Park",
    },
    {
      title: "Building Company Culture Through Recognition",
      excerpt:
        "How regular appreciation and recognition rituals can transform your company culture and boost employee engagement and retention.",
      category: "Insights",
      readTime: "9 min read",
      date: "Nov 3, 2024",
      image: "🏢",
      author: "Rachel Green",
    },
    {
      title: "The Art of Timing: When to Share Your Board",
      excerpt:
        "Timing is everything. Learn the best practices for when to create, share, and reveal your appreciation board for maximum emotional impact.",
      category: "Tips & Tricks",
      readTime: "6 min read",
      date: "Oct 30, 2024",
      image: "⏰",
      author: "Tom Wilson",
    },
    {
      title: "Privacy & Security: How We Protect Your Memories",
      excerpt:
        "A transparent look at how we handle data, maintain privacy, and ensure your appreciation boards and memories remain secure.",
      category: "Product Updates",
      readTime: "7 min read",
      date: "Oct 28, 2024",
      image: "🔒",
      author: "Danke Team",
    },
  ];

  const categories = [
    { name: "All Posts", count: 9 },
    { name: "Tips & Tricks", count: 2 },
    { name: "Use Cases", count: 1 },
    { name: "How-To", count: 1 },
    { name: "Insights", count: 2 },
    { name: "Stories", count: 1 },
    { name: "Resources", count: 1 },
    { name: "Templates", count: 1 },
  ];

  const topics = [
    {
      icon: Heart,
      title: "Appreciation Ideas",
      description: "Creative ways to show gratitude",
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Building strong communities",
    },
    {
      icon: Lightbulb,
      title: "Best Practices",
      description: "Tips from the experts",
    },
    {
      icon: Sparkles,
      title: "Success Stories",
      description: "Real celebration examples",
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
                Blog
              </p>
              <h1 className="mt-6 text-5xl md:text-6xl text-gray-900 font-fuzzy-bubbles leading-tight">
                Stories and insights that celebrate people.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Tips, inspiration, and stories about creating meaningful
                connections through appreciation.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                <BookOpen className="w-4 h-4 text-gray-700" />
                <span>Fresh ideas to make every board feel personal.</span>
              </div>
            </div>

            <PolaroidCard
              size="large"
              className="w-full max-w-lg mx-auto p-8 md:p-10"
            >
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Featured
                </p>
                <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-2 border-2 border-gray-900/30 px-3 py-1 rounded-full bg-[#FDF6E3] text-gray-800 font-semibold uppercase tracking-wide">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-10 px-4 text-sm">
                  Read article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </PolaroidCard>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="border-2 border-gray-900/10 bg-white/80 text-gray-800 hover:bg-white px-5 py-2 h-auto"
              >
                {category.name}
                <span className="ml-2 text-xs text-gray-500">
                  ({category.count})
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Featured post
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
              Featured story
            </h2>
          </div>

          <PolaroidCard className="w-full max-w-none p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-44 h-44 bg-[#FDF6E3] rounded-3xl flex items-center justify-center text-6xl">
                {featuredPost.image}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 border-2 border-gray-900/30 px-3 py-1 rounded-full bg-[#FDF6E3] text-xs text-gray-800 font-semibold uppercase tracking-wide">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    By {featuredPost.author}
                  </span>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold">
                    Read article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </PolaroidCard>
        </div>
      </section>

      {/* Latest Posts Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Latest articles
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Recent posts
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our latest tips, stories, and insights on creating
              meaningful appreciation moments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <PolaroidCard
                key={post.title}
                size="medium"
                className="w-full max-w-none p-6"
              >
                <div className="space-y-4">
                  <div className="w-full h-32 bg-[#FDF6E3] rounded-sm flex items-center justify-center text-5xl">
                    {post.image}
                  </div>
                  <span className="border-2 border-gray-900/30 px-3 py-1 rounded-full bg-[#FDF6E3] text-xs text-gray-800 font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-fuzzy-bubbles font-bold text-gray-900 line-clamp-2 mt-4">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-gray-500">
                        {post.author}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </PolaroidCard>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Popular topics
            </p>
            <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900 mb-4">
              Explore by topic
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <PolaroidCard
                  key={topic.title}
                  size="medium"
                  className="w-full max-w-none p-6 text-center"
                >
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </PolaroidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white/40">
        <div className="container-default max-w-5xl mx-auto">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                Stay updated
              </p>
              <h2 className="text-3xl md:text-4xl font-fuzzy-bubbles mb-4 text-gray-900">
                Get appreciation tips in your inbox
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest articles, tips, and
                inspiration delivered monthly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 w-full sm:w-auto"
              />
              <Button
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-12 px-6 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">No spam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Monthly insights</span>
              </div>
            </div>
          </PolaroidCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24">
        <div className="container-narrow">
          <PolaroidCard className="w-full max-w-none p-10 md:p-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Ready to start?
            </p>
            <h2 className="text-3xl md:text-5xl font-fuzzy-bubbles mb-6 text-gray-900">
              Create your first board today
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Put what you&apos;ve learned into practice. Start creating meaningful
              appreciation moments now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create-board">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 font-semibold h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Create board
                </Button>
              </Link>
              <Link href="/guides">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold h-14 px-8 text-base"
                >
                  View guides
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
