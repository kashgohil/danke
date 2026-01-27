'use client';

import React, { useEffect, useRef } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimationService } from '@/lib/animation-service';
import type { AnimationConfig } from '@/lib/animations';

interface AnimationPreviewProps {
  config: AnimationConfig;
  className?: string;
}

export function AnimationPreview({
  config,
  className,
}: AnimationPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    if (containerRef.current) {
      if (isPlaying && config.type !== 'none') {
        AnimationService.applyAnimation(containerRef.current, config);
      } else {
        AnimationService.clearAnimation(containerRef.current);
      }
    }

    return () => {
      if (containerRef.current) {
        AnimationService.clearAnimation(containerRef.current);
      }
    };
  }, [config, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    // Reapply animation after a brief pause
    setTimeout(() => {
      if (containerRef.current) {
        AnimationService.clearAnimation(containerRef.current);
        if (config.type !== 'none') {
          AnimationService.applyAnimation(containerRef.current, config);
        }
      }
    }, 100);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Animation Preview</CardTitle>
          <div className="flex items-center space-x-1">
            {!isPlaying ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlay}
                disabled={config.type === 'none'}
                className="h-8 px-2"
              >
                <Play className="h-3 w-3 mr-1" />
                Play
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleStop}
                className="h-8 px-2"
              >
                <Square className="h-3 w-3 mr-1" />
                Stop
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={config.type === 'none'}
              className="h-8 px-2"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Preview Container */}
        <div
          ref={containerRef}
          className="relative rounded-lg border-2 border-gray-200 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100"
          style={{
            width: '100%',
            height: '300px',
            position: 'relative',
          }}
        >
          {/* Sample content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2 p-4">
              <h3 className="text-lg font-bold text-gray-800">
                Animation Preview
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                This is how the animation will look on your board background.
                {config.type === 'none' && ' No animation selected.'}
                {config.type !== 'none' && !isPlaying && ' Click Play to see the animation.'}
                {config.type !== 'none' && isPlaying && ' Animation is playing!'}
              </p>
            </div>
          </div>

          {/* Animation info overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {config.type === 'none' ? (
              'No animation'
            ) : (
              `${AnimationService.getAnimation(config.type)?.name || config.type} - Intensity: ${config.intensity}/10, Speed: ${config.speed}`
            )}
          </div>
        </div>

        {/* Configuration Summary */}
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Type:</span>
              <div>{AnimationService.getAnimation(config.type)?.name || 'None'}</div>
            </div>
            <div>
              <span className="font-medium">Intensity:</span>
              <div>{config.intensity}/10</div>
            </div>
          </div>
          <div className="pt-2 border-t">
            <span className="font-medium">Speed:</span>
            <span className="ml-2">{config.speed}</span>
            {config.color && (
              <>
                <span className="ml-4 font-medium">Color:</span>
                <span
                  className="ml-2 inline-block w-3 h-3 rounded border"
                  style={{ backgroundColor: config.color }}
                ></span>
                <span className="ml-1">{config.color}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}