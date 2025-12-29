import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CreateBoardClient } from "./create-board-client";

// Loading component for the form
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
      <div className="container-default px-6 md:px-12 lg:px-24 pt-24 pb-16">
        <div className="space-y-6">
          <div className="h-10 w-32 bg-white border-4 border-gray-900 rounded-sm animate-pulse" />
          <div className="space-y-2">
            <div className="h-10 bg-white border-4 border-gray-900 rounded-sm animate-pulse w-64" />
            <div className="h-5 bg-white border-4 border-gray-900 rounded-sm animate-pulse w-96 max-w-full" />
          </div>
          <div className="h-14 bg-white border-4 border-gray-900 rounded-sm animate-pulse" />
          <div className="bg-white border-4 border-gray-900 rounded-sm p-8 md:p-12 shadow-2xl">
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-4 pt-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse flex-1" />
                <div className="h-10 bg-gray-200 rounded animate-pulse w-24" />
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
