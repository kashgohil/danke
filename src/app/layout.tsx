import { AuthProvider } from "@/components/auth/auth-context";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Kalam, Playfair_Display } from "next/font/google";
import "./globals.css";

import { MainHeader } from "@/components/layout/main-header";
import { Toaster } from "@/components/ui/sonner";
import { PostEditProvider } from "@/contexts/post-edit-context";

const inter = Inter({ subsets: ["latin"] });
const kalam = Kalam({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danke - Appreciation Board",
  description:
    "Create beautiful appreciation boards to collect heartfelt messages and memories",
  keywords: [
    "danke",
    "appreciation",
    "gratitude",
    "messages",
    "board",
    "memories",
  ],
  authors: [{ name: "Danke Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Danke - Appreciation Board",
    description:
      "Create beautiful appreciation boards to collect heartfelt messages and memories",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kalam:wght@400&family=Playfair+Display:wght@400&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <div className="min-h-screen">
            <ErrorBoundary>
              <AuthProvider>
                <PostEditProvider>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none fixed inset-0 -z-10 bg-[hsl(250,40%,99%)]"
                  />
                  <div className="min-h-screen flex flex-col">
                    <MainHeader />
                    <main className="flex-1 w-full">{children}</main>
                  </div>
                </PostEditProvider>
              </AuthProvider>
            </ErrorBoundary>
          </div>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
