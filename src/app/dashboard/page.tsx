import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardClient } from "./dashboard-client";

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
      <div className="container-default px-6 md:px-12 lg:px-24 pt-40 pb-16">
        <div className="space-y-6">
          <div className="h-10 bg-white border-4 border-gray-900 rounded-sm animate-pulse w-64" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-white border-4 border-gray-900 rounded-sm animate-pulse"
              />
            ))}
          </div>
          <div className="h-96 bg-white border-4 border-gray-900 rounded-sm animate-pulse" />
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
