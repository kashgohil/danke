'use client';

import React, { useState } from 'react';
import { Smartphone, Monitor, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BackgroundService, BACKGROUND_PATTERNS } from '@/lib/background-service';

export interface BackgroundPreviewConfig {
  type: 'color' | 'gradient' | 'pattern' | 'image' | 'video';
  value?: string;
  pattern?: string;
  videoUrl?: string;
  position: string;
  size: string;
  overlay: string;
  overlayOpacity: number;
  overlayColor?: string;
  parallax: boolean;
}

interface BackgroundPreviewProps {
  config: BackgroundPreviewConfig;
  onApply?: () => void;
  onReset?: () => void;
  className?: string;
}

export function BackgroundPreview({
  config,
  onApply,
  onReset,
  className,
}: BackgroundPreviewProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Generate CSS for the preview
  const previewCss = BackgroundService.generateBackgroundCss({
    type: config.type,
    value: config.value,
    pattern: config.pattern,
    overlay: config.overlay,
    overlayColor: config.overlayColor,
    overlayOpacity: config.overlayOpacity,
    position: config.position,
    size: config.size,
    parallax: config.parallax,
    videoUrl: config.videoUrl,
  });

  const containerClasses = cn(
    'relative rounded-lg overflow-hidden border-2 border-gray-200',
    previewMode === 'desktop' ? 'aspect-video w-full max-w-2xl mx-auto' : 'aspect-[9/16] w-64 mx-auto',
    className
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Preview</CardTitle>
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
      <CardContent className="space-y-4">
        {/* Preview Container */}
        <div className={containerClasses}>
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{
              background: config.type === 'color' ? config.value : undefined,
              ...(() => {
                // Parse the CSS string and apply styles
                const style: React.CSSProperties = {};

                // Handle different background types
                if (config.type === 'gradient' && config.value) {
                  style.background = config.value;
                } else if (config.type === 'pattern' && config.pattern) {
                  // Apply pattern CSS
                  const pattern = BACKGROUND_PATTERNS[config.pattern as keyof typeof BACKGROUND_PATTERNS];
                  if (pattern) {
                    // For preview, we'll use a simplified approach
                    style.backgroundColor = '#f8f9fa';
                    style.backgroundImage = 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)';
                    style.backgroundSize = '20px 20px';
                  }
                } else if (config.type === 'image' && config.value) {
                  style.backgroundImage = `url(${config.value})`;
                  style.backgroundPosition = config.position;
                  style.backgroundSize = config.size;
                  style.backgroundRepeat = config.size === 'tile' ? 'repeat' : 'no-repeat';
                }

                // Apply overlay if needed
                if (config.overlay !== 'none' && config.overlayOpacity > 0) {
                  style.position = 'relative';
                }

                return style;
              })(),
            }}
          >
            {/* Overlay */}
            {config.overlay !== 'none' && config.overlayOpacity > 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: config.overlay === 'custom' && config.overlayColor
                    ? config.overlayColor
                    : config.overlay === 'light'
                    ? 'rgba(255, 255, 255, 0.3)'
                    : config.overlay === 'dark'
                    ? 'rgba(0, 0, 0, 0.3)'
                    : config.overlay === 'gradient'
                    ? 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
                    : 'none',
                  opacity: config.overlayOpacity / 100,
                }}
              />
            )}

            {/* Sample Content */}
            <div className="relative z-10 text-center space-y-2 p-4">
              <h3 className="text-lg font-bold text-white drop-shadow-lg">
                Sample Board Title
              </h3>
              <p className="text-sm text-white/90 drop-shadow">
                This is how your background will look with content
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm"></div>
                <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm"></div>
                <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>

          <Button
            onClick={onApply}
            className="flex items-center space-x-1"
          >
            <Save className="h-4 w-4" />
            <span>Apply Background</span>
          </Button>
        </div>

        {/* Configuration Summary */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Type: <span className="font-medium capitalize">{config.type}</span></div>
          {config.overlay !== 'none' && (
            <div>Overlay: <span className="font-medium">{config.overlay} ({config.overlayOpacity}%)</span></div>
          )}
          <div>Size: <span className="font-medium">{config.size}</span></div>
          <div>Position: <span className="font-medium">{config.position}</span></div>
          {config.parallax && (
            <div>Parallax: <span className="font-medium">Enabled</span></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

