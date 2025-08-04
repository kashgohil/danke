'use client';

import { PostCreationForm } from '@/components/posts/post-creation-form';
import { Button } from '@/components/ui/button';
import {
  generateGradientStyle,
  getContrastTextStyles,
  getGradientClasses,
  getTextColors,
} from '@/lib/gradient-utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface Board {
  id: string;
  title: string;
  recipientName: string;
  typeConfig?: any;
}

interface PostPageClientProps {
  board: Board;
}

export function PostPageClient({ board }: PostPageClientProps) {
  const backgroundColor = (board.typeConfig as any)?.backgroundColor;
  const gradientStyle = generateGradientStyle(backgroundColor);
  const defaultClasses = getGradientClasses(
    backgroundColor,
    'fixed inset-0 w-full h-full'
  );
  const textColors = getTextColors(backgroundColor);
  const contrastTextStyles = getContrastTextStyles(backgroundColor);

  useEffect(() => {
    // Apply gradient to body for full-screen coverage
    if (backgroundColor) {
      const style = generateGradientStyle(backgroundColor);
      if (style.background) {
        document.body.style.background = style.background as string;
      }
    } else {
      // Apply default gradient
      document.body.style.background =
        'linear-gradient(135deg, #fef7ed 0%, #ffffff 50%, #fef7ed 100%)';
    }

    // Cleanup function to reset body background
    return () => {
      document.body.style.background = '';
    };
  }, [backgroundColor]);

  return (
    <>
      {/* Full-screen background layer */}
      <div className={defaultClasses} style={gradientStyle} />

      {/* Content layer */}
      <div className="relative min-h-screen p-4">
        <div className="mb-6">
          <Link href={`/boards/${board.id}/manage`}>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              style={contrastTextStyles.secondary}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Board</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={contrastTextStyles.primary}
          >
            {board.title}
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={contrastTextStyles.secondary}
          >
            Add your appreciation message for{' '}
            <span className="font-semibold" style={contrastTextStyles.accent}>
              {board.recipientName}
            </span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <PostCreationForm
            boardId={board.id}
            // onPostCreated={() => {
            //   window.location.href = `/boards/${board.viewToken}`;
            // }}
          />
        </div>
      </div>
    </>
  );
}
