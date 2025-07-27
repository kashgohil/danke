import { AuthProvider } from '@/components/auth/auth-context';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { PerformanceDashboard } from '@/components/ui/performance-dashboard';
import { PerformanceProvider } from '@/components/ui/performance-provider';
import { ThemeProvider } from '@/components/ui/theme-context';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
                  <AuthProvider>{children}</AuthProvider>
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
