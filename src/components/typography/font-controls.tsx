'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TYPE_SCALES } from '@/lib/typography';

interface FontControlsProps {
  fontScale: number;
  onFontScaleChange: (scale: number) => void;
  className?: string;
}

export function FontControls({
  fontScale,
  onFontScaleChange,
  className,
}: FontControlsProps) {
  const scalePercentage = Math.round(fontScale * 100);

  const handleScaleChange = (newScale: number) => {
    onFontScaleChange(newScale);
  };

  const resetToDefault = () => {
    onFontScaleChange(1);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          Font Size Controls
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefault}
            className="h-8 px-2"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick scale presets */}
        <div className="space-y-3">
          <Label className="text-xs font-medium">Quick Presets</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(TYPE_SCALES).map(([key, scale]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleScaleChange(1)} // Use default scale for now
              >
                {scale.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom scale slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="font-scale" className="text-xs font-medium">
              Font Scale
            </Label>
            <span className="text-xs text-muted-foreground">{scalePercentage}%</span>
          </div>

          <input
            id="font-scale"
            type="range"
            min="50"
            max="150"
            step="5"
            value={scalePercentage}
            onChange={(e) => handleScaleChange(parseInt(e.target.value) / 100)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>50%</span>
            <span>100%</span>
            <span>150%</span>
          </div>
        </div>

        {/* Preview */}
        <div className="border rounded-lg p-4 bg-muted/50">
          <div className="space-y-2">
            <h3
              className="text-lg font-bold"
              style={{ fontSize: `${1.25 * fontScale}rem` }}
            >
              Heading Preview
            </h3>
            <p
              className="text-sm text-muted-foreground"
              style={{ fontSize: `${0.875 * fontScale}rem` }}
            >
              This is how your body text will appear with the current font scale.
              Adjust the slider above to see how the text size changes.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}