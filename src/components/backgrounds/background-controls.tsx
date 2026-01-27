'use client';

import React from 'react';
import { Move, Expand, Eye, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BACKGROUND_OVERLAYS } from '@/lib/background-service';

export interface BackgroundControlsConfig {
  position: string;
  size: string;
  overlay: string;
  overlayOpacity: number;
  overlayColor?: string;
  parallax: boolean;
}

interface BackgroundControlsProps {
  config: BackgroundControlsConfig;
  onChange: (config: BackgroundControlsConfig) => void;
  showParallax?: boolean;
  className?: string;
}

const POSITION_OPTIONS = [
  { value: 'center', label: 'Center' },
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
];

const SIZE_OPTIONS = [
  { value: 'cover', label: 'Cover (fill)' },
  { value: 'contain', label: 'Contain (fit)' },
  { value: 'tile', label: 'Tile (repeat)' },
];

export function BackgroundControls({
  config,
  onChange,
  showParallax = true,
  className,
}: BackgroundControlsProps) {
  const updateConfig = (updates: Partial<BackgroundControlsConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Position Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Move className="h-4 w-4" />
            <span>Position</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="position-select" className="text-xs font-medium">
                Alignment
              </Label>
              <Select
                value={config.position}
                onValueChange={(value) => updateConfig({ position: value })}
              >
                <SelectTrigger id="position-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POSITION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Expand className="h-4 w-4" />
            <span>Size & Scaling</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="size-select" className="text-xs font-medium">
              Size Mode
            </Label>
            <Select
              value={config.size}
              onValueChange={(value) => updateConfig({ size: value })}
            >
              <SelectTrigger id="size-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overlay Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Overlay</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="overlay-select" className="text-xs font-medium">
              Overlay Type
            </Label>
            <Select
              value={config.overlay}
              onValueChange={(value) => updateConfig({ overlay: value })}
            >
              <SelectTrigger id="overlay-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(BACKGROUND_OVERLAYS).map(([key, overlay]) => (
                  <SelectItem key={key} value={key}>
                    {overlay.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="opacity-slider" className="text-xs font-medium">
                Opacity
              </Label>
              <span className="text-xs text-muted-foreground">
                {config.overlayOpacity}%
              </span>
            </div>
            <input
              id="opacity-slider"
              type="range"
              min={0}
              max={100}
              step={5}
              value={config.overlayOpacity}
              onChange={(e) => updateConfig({ overlayOpacity: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {config.overlay === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="overlay-color" className="text-xs font-medium">
                Custom Color
              </Label>
              <div className="flex items-center space-x-2">
                <input
                  id="overlay-color"
                  type="color"
                  value={config.overlayColor || '#000000'}
                  onChange={(e) => updateConfig({ overlayColor: e.target.value })}
                  className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <span className="text-xs text-muted-foreground">
                  {config.overlayColor || '#000000'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Options */}
      {showParallax && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Advanced</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="parallax-toggle" className="text-sm font-medium">
                  Parallax Scrolling
                </Label>
                <p className="text-xs text-muted-foreground">
                  Creates a subtle scrolling effect
                </p>
              </div>
              <input
                id="parallax-toggle"
                type="checkbox"
                checked={config.parallax}
                onChange={(e) => updateConfig({ parallax: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange({
            position: 'center',
            size: 'cover',
            overlay: 'none',
            overlayOpacity: 0,
            overlayColor: undefined,
            parallax: false,
          })}
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}