import { AuthProvider } from '@/components/auth/auth-context';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { PerformanceDashboard } from '@/components/ui/performance-dashboard';
import { PerformanceProvider } from '@/components/ui/performance-provider';
import { ThemeProvider } from '@/components/ui/theme-context';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

import { AuthHeader } from '@/components/auth/auth-header';
import logo from 'public/danke.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Danke - Appreciation Board',
  description:
    'Create beautiful appreciation boards to collect heartfelt messages and memories',
  keywords: [
    'danke',
    'appreciation',
    'gratitude',
    'messages',
    'board',
    'memories',
  ],
  authors: [{ name: 'Danke Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Danke - Appreciation Board',
    description:
      'Create beautiful appreciation boards to collect heartfelt messages and memories',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
        </head>
        <body className={inter.className}>
          <PerformanceProvider>
            <div className="min-h-screen bg-background">
              <ErrorBoundary>
                <ThemeProvider>
                  <AuthProvider>
                    <div className="min-h-screen bg-gradient-to-br  from-danke-700 via-danke-300 to-danke-600">
                      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 xl:top-4 xl:rounded-xl z-40 xl:mx-auto w-full md:container">
                        <div className="container mx-auto px-4 py-4">
                          <div className="flex justify-between items-center">
                            <Link
                              href="/"
                              className="text-2xl font-bold bg-gradient-to-r from-danke-600 to-danke-gold bg-clip-text text-transparent hover:from-danke-700 hover:to-danke-500 transition-all flex items-center gap-2"
                            >
                              <Image
                                src={logo}
                                alt="Danke"
                                width={32}
                                height={32}
                              />
                              Danke
                            </Link>
                            <AuthHeader />
                          </div>
                        </div>
                      </header>
                      <main className="container mx-auto px-4 py-12">
                        {children}
                      </main>
                    </div>
                  </AuthProvider>
                </ThemeProvider>
              </ErrorBoundary>
            </div>
            <PerformanceDashboard />
          </PerformanceProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
