import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardClient } from "./dashboard-client";

function ShimmerBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-white border-2 border-gray-900 rounded-sm ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-[#FDF6E3] to-transparent bg-[length:1000px_100%]" />
    </div>
  );
}

function DashboardSkeleton() {
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
      <div className="container-default w-full px-6 md:px-12 lg:px-24 pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <ShimmerBlock className="h-10 w-56" />
              <ShimmerBlock className="h-4 w-72" />
            </div>
            <ShimmerBlock className="h-12 w-44" />
          </div>

          <div className="flex flex-wrap gap-3">
            {["w-40", "w-40", "w-40", "w-40"].map((width, index) => (
              <ShimmerBlock key={index} className={`h-20 ${width}`} />
            ))}
          </div>
        </div>

        <div className="space-y-0">
          <div className="flex w-full gap-2 border-4 border-gray-900 rounded-t-sm p-2 bg-[#FDF6E3]">
            <ShimmerBlock className="h-10 w-28" />
            <ShimmerBlock className="h-10 w-28" />
          </div>
          <div className="border-4 border-t-0 border-gray-900 rounded-b-sm bg-white shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-6 gap-4">
                {["w-28", "w-20", "w-24", "w-24", "w-24", "w-16"].map(
                  (width, index) => (
                    <ShimmerBlock key={index} className={`h-4 ${width}`} />
                  ),
                )}
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={rowIndex} className="px-6 py-5">
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <ShimmerBlock className="h-4 w-40" />
                    <ShimmerBlock className="h-4 w-20" />
                    <ShimmerBlock className="h-4 w-24" />
                    <ShimmerBlock className="h-4 w-24" />
                    <ShimmerBlock className="h-4 w-24" />
                    <ShimmerBlock className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/dashboard");
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardClient />
    </Suspense>
  );
}
