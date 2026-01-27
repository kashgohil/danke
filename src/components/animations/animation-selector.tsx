'use client';

import React from 'react';
import { Sparkles, Waves, Star, Move, Heart, Zap, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimationService } from '@/lib/animation-service';
import type { AnimationConfig } from '@/lib/animations';

interface AnimationSelectorProps {
  config: AnimationConfig;
  onChange: (config: AnimationConfig) => void;
  className?: string;
}

interface AnimationCardProps {
  animation: {
    type: string;
    name: string;
    description: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

function AnimationCard({ animation, isSelected, onSelect }: AnimationCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'particles': return <Sparkles className="h-6 w-6" />;
      case 'waves': return <Waves className="h-6 w-6" />;
      case 'stars': return <Star className="h-6 w-6" />;
      case 'floating': return <Move className="h-6 w-6" />;
      case 'pulse': return <Heart className="h-6 w-6" />;
      case 'bubbles': return <Circle className="h-6 w-6" />;
      default: return <Sparkles className="h-6 w-6" />;
    }
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md',
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-gray-300 hover:border-gray-400'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            'p-2 rounded-lg',
            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}>
            {getIcon(animation.type)}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{animation.name}</h3>
            <p className="text-xs text-muted-foreground">{animation.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AnimationSelector({
  config,
  onChange,
  className,
}: AnimationSelectorProps) {
  const animations = AnimationService.getAllAnimations();

  const handleTypeChange = (type: string) => {
    onChange({
      ...config,
      type: type as AnimationConfig['type'],
    });
  };

  const handleIntensityChange = (intensity: number) => {
    onChange({
      ...config,
      intensity,
    });
  };

  const handleSpeedChange = (speed: string) => {
    onChange({
      ...config,
      speed: speed as AnimationConfig['speed'],
    });
  };

  const handleColorChange = (color: string) => {
    onChange({
      ...config,
      color,
    });
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Animation Type Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Choose Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {animations.map((animation) => (
              <AnimationCard
                key={animation.type}
                animation={animation}
                isSelected={config.type === animation.type}
                onSelect={() => handleTypeChange(animation.type)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Animation Settings */}
      {config.type !== 'none' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Animation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Intensity */}
            <div className="space-y-2">
              <Label htmlFor="intensity" className="text-xs font-medium">
                Intensity: {config.intensity}/10
              </Label>
              <input
                id="intensity"
                type="range"
                min="1"
                max="10"
                step="1"
                value={config.intensity}
                onChange={(e) => handleIntensityChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Subtle</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Speed */}
            <div className="space-y-2">
              <Label htmlFor="speed-select" className="text-xs font-medium">
                Speed
              </Label>
              <Select
                value={config.speed}
                onValueChange={handleSpeedChange}
              >
                <SelectTrigger id="speed-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color (for applicable animations) */}
            {(config.type === 'particles' || config.type === 'stars' || config.type === 'floating' || config.type === 'bubbles') && (
              <div className="space-y-2">
                <Label htmlFor="color-picker" className="text-xs font-medium">
                  Color
                </Label>
                <div className="flex items-center space-x-2">
                  <input
                    id="color-picker"
                    type="color"
                    value={config.color || '#ffffff'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="text-xs text-muted-foreground">
                    {config.color || '#ffffff'}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}