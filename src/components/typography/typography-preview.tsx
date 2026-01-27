'use client';

import React from 'react';
import { Eye, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FontPairing } from '@/lib/typography';
import { TypographyService } from '@/lib/typography-service';

interface TypographyPreviewProps {
  pairing: FontPairing;
  fontScale: number;
  className?: string;
}

export function TypographyPreview({
  pairing,
  fontScale,
  className,
}: TypographyPreviewProps) {
  const [previewMode, setPreviewMode] = React.useState<'desktop' | 'mobile'>('desktop');

  // Generate preview CSS
  const previewCss = TypographyService.generatePreviewCSS(pairing, '.typography-preview', fontScale);

  const containerClasses = cn(
    'relative rounded-lg border-2 border-gray-200 overflow-hidden bg-white',
    previewMode === 'desktop' ? 'aspect-video w-full max-w-2xl mx-auto' : 'aspect-[9/16] w-64 mx-auto',
    className
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Typography Preview</span>
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
              className="h-8 w-8 p-0"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              className="h-8 w-8 p-0"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Preview Container */}
        <div className={containerClasses}>
          <style dangerouslySetInnerHTML={{ __html: previewCss }} />
          <div className="typography-preview p-6 h-full overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-md mx-auto space-y-6">
              {/* Sample content */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to Our Celebration
                </h1>

                <h2 className="text-2xl font-semibold text-gray-800">
                  A Special Message
                </h2>

                <p className="text-base text-gray-700 leading-relaxed">
                  We're gathered here today to celebrate and share our heartfelt messages.
                  This board is a place where memories are made and connections are strengthened.
                  Each message represents a moment of joy, support, or appreciation.
                </p>

                <h3 className="text-xl font-medium text-gray-800">
                  What Makes This Special
                </h3>

                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Personalized messages from loved ones</li>
                  <li>• Beautiful typography that matches the occasion</li>
                  <li>• Easy sharing with friends and family</li>
                  <li>• Memories that last forever</li>
                </ul>

                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                  "The most beautiful things in the world cannot be seen or even touched,
                  they must be felt with the heart."
                  <br />
                  <cite className="text-sm not-italic text-gray-500 mt-2 block">
                    — Helen Keller
                  </cite>
                </blockquote>

                <p className="text-sm text-gray-500">
                  Share your message below and be part of this special moment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Typography details */}
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium">Heading Font:</div>
              <div>{pairing.fonts.heading.family} ({pairing.fonts.heading.weight})</div>
            </div>
            <div>
              <div className="font-medium">Body Font:</div>
              <div>{pairing.fonts.body.family} ({pairing.fonts.body.weight})</div>
            </div>
          </div>
          <div className="pt-2 border-t">
            Font Scale: <span className="font-medium">{Math.round(fontScale * 100)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}