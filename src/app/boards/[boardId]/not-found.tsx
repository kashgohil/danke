import { Button } from '@/components/ui/button';
import { Heart, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(250,40%,99%)] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
      </div>

      <div className="text-center max-w-md mx-auto px-4 relative">
        <div className="mx-auto w-28 h-28 bg-danke-100 rounded-3xl flex items-center justify-center mb-8 shadow-xl border-4 border-white rotate-6">
          <Search className="w-12 h-12 text-danke-700" />
        </div>
        <h1 className="text-5xl font-black text-danke-700 mb-6 tracking-tight">
          Board Not Found
        </h1>
        <p className="text-danke-600 mb-8 text-lg leading-relaxed">
          The board you&apos;re looking for doesn&apos;t exist or the link may
          be invalid. Please check the URL and try again.
        </p>
        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-danke-500 hover:bg-danke-600 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
              <Heart className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <div className="text-sm text-danke-500">
            or{' '}
            <Link
              href="/create-board"
              className="text-danke-600 hover:text-danke-700 font-medium underline"
            >
              create a new board
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
