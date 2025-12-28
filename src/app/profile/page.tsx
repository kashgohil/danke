import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
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
      <section className="relative pt-40 pb-16 md:pt-40 md:pb-20 lg:pt-50 px-6 md:px-12 lg:px-24">
        <div className="container-default">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-white/60"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <SignedIn>
            <UserProfile />
          </SignedIn>
          <SignedOut>
            <div className="max-w-2xl mx-auto">
              <div className="w-full bg-white/80 border border-gray-200 rounded-2xl p-8 md:p-10 text-center shadow-lg">
                <div className="w-16 h-16 bg-[#FDF6E3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="h-8 w-8 text-gray-800" />
                </div>
                <h3 className="text-2xl md:text-3xl font-fuzzy-bubbles text-gray-900 mb-4">
                  Sign in to view your profile.
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Sign in or create an account to manage your profile, track
                  your boards, and keep your memories organized.
                </p>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all font-semibold h-14 px-8 text-base"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>
        </div>
      </section>
    </div>
  );
}
