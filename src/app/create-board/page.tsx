import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CreateBoardClient } from "./create-board-client";

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

function FormSkeleton() {
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
      <div className="container-default w-full section-padding pt-50 pb-16">
        <div className="text-center mb-12 space-y-4">
          <div className="flex justify-center">
            <ShimmerBlock className="h-10 w-64" />
          </div>
          <div className="flex justify-center">
            <ShimmerBlock className="h-5 w-96 max-w-full" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-start justify-between gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <ShimmerBlock className="h-12 w-12 rounded-full" />
                <div className="mt-3 space-y-2">
                  <ShimmerBlock className="h-4 w-24" />
                  <ShimmerBlock className="h-3 w-32 hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-4 border-gray-900 rounded-sm p-8 md:p-12 shadow-2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <ShimmerBlock className="h-4 w-40" />
                <ShimmerBlock className="h-11 w-full" />
              </div>
              <div className="space-y-2">
                <ShimmerBlock className="h-4 w-32" />
                <ShimmerBlock className="h-11 w-full" />
              </div>
              <div className="space-y-2">
                <ShimmerBlock className="h-4 w-44" />
                <ShimmerBlock className="h-11 w-full" />
              </div>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-between sm:items-center">
                <ShimmerBlock className="h-11 w-32" />
                <ShimmerBlock className="h-11 w-40" />
              </div>
              <div className="pt-6 border-t-4 border-gray-900">
                <div className="flex justify-center">
                  <ShimmerBlock className="h-4 w-44" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CreateBoardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/create-board");
  }

  return (
    <Suspense fallback={<FormSkeleton />}>
      <CreateBoardClient />
    </Suspense>
  );
}
