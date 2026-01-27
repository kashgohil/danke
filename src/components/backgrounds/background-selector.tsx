'use client';

import React, { useState } from 'react';
import { Palette, Layers, Shapes, Image, Video, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BACKGROUND_GRADIENTS, BACKGROUND_PATTERNS } from '@/lib/background-service';

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'pattern' | 'image' | 'video';
  value?: string;
  pattern?: string;
  videoUrl?: string;
}

interface BackgroundSelectorProps {
  value: BackgroundConfig;
  onChange: (config: BackgroundConfig) => void;
  userImages?: Array<{ url: string; filename: string }>;
  className?: string;
}

// Color presets
const COLOR_PRESETS = [
  '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529',
  '#f8d7da', '#f5c6cb', '#721c24', '#dc3545', '#c82333',
  '#d4edda', '#c3e6cb', '#155724', '#28a745', '#218838',
  '#cce5ff', '#99d6ff', '#004085', '#0066cc', '#0056b3',
  '#fff3cd', '#ffeaa7', '#856404', '#ffc107', '#e0a800',
  '#d1ecf1', '#9ecae1', '#0c5460', '#17a2b8', '#138496',
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(value);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-10 gap-2">
        {COLOR_PRESETS.map((color) => (
          <button
            key={color}
            className={cn(
              'w-8 h-8 rounded-md border-2 transition-all hover:scale-110',
              value === color ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
            )}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={color}
          />
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={customColor}
          onChange={(e) => {
            setCustomColor(e.target.value);
            onChange(e.target.value);
          }}
          className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
        />
        <span className="text-sm text-muted-foreground">Custom color</span>
      </div>
    </div>
  );
}

interface GradientSelectorProps {
  value: string;
  onChange: (gradient: string) => void;
}

function GradientSelector({ value, onChange }: GradientSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(BACKGROUND_GRADIENTS).map(([key, gradient]) => (
        <button
          key={key}
          className={cn(
            'aspect-video rounded-lg border-2 transition-all hover:scale-105 relative overflow-hidden',
            value === gradient ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
          )}
          style={{ background: gradient }}
          onClick={() => onChange(gradient)}
        >
          {value === gradient && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </Badge>
          </div>
        </button>
      ))}
    </div>
  );
}

interface PatternSelectorProps {
  value: string;
  onChange: (pattern: string) => void;
}

function PatternSelector({ value, onChange }: PatternSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {Object.entries(BACKGROUND_PATTERNS).map(([key, pattern]) => (
        <button
          key={key}
          className={cn(
            'aspect-square rounded-lg border-2 transition-all hover:scale-105 relative overflow-hidden bg-white',
            value === key ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                <defs>${pattern.css.replace(/background-image:\s*/, '')}</defs>
                <rect width="60" height="60" fill="white"/>
                <rect width="60" height="60" fill="url(#pattern)"/>
              </svg>
            `)}")`,
            backgroundSize: '20px 20px',
          }}
          onClick={() => onChange(key)}
        >
          {value === key && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="absolute bottom-1 left-1 right-1">
            <Badge variant="secondary" className="text-xs truncate">
              {pattern.name}
            </Badge>
          </div>
        </button>
      ))}
    </div>
  );
}

interface ImageGalleryProps {
  images: Array<{ url: string; filename: string }>;
  value?: string;
  onChange: (url: string) => void;
}

function ImageGallery({ images, value, onChange }: ImageGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm">No uploaded images yet</p>
        <p className="text-xs">Upload images using the upload tab</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {images.map((image) => (
        <button
          key={image.url}
          className={cn(
            'aspect-square rounded-lg border-2 overflow-hidden transition-all hover:scale-105',
            value === image.url ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
          )}
          onClick={() => onChange(image.url)}
        >
          <img
            src={image.url}
            alt={image.filename}
            className="w-full h-full object-cover"
          />
          {value === image.url && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

export function BackgroundSelector({
  value,
  onChange,
  userImages = [],
  className,
}: BackgroundSelectorProps) {
  const [activeTab, setActiveTab] = useState<string>('colors');

  const handleColorChange = (color: string) => {
    onChange({ type: 'color', value: color });
  };

  const handleGradientChange = (gradient: string) => {
    onChange({ type: 'gradient', value: gradient });
  };

  const handlePatternChange = (pattern: string) => {
    onChange({ type: 'pattern', pattern });
  };

  const handleImageChange = (url: string) => {
    onChange({ type: 'image', value: url });
  };

  return (
    <div className={cn('w-full', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="colors" className="flex items-center space-x-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Colors</span>
          </TabsTrigger>
          <TabsTrigger value="gradients" className="flex items-center space-x-1">
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Gradients</span>
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center space-x-1">
            <Shapes className="h-4 w-4" />
            <span className="hidden sm:inline">Patterns</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center space-x-1">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Images</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center space-x-1">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="mt-4">
          <ColorPicker
            value={value.type === 'color' ? value.value || '#ffffff' : '#ffffff'}
            onChange={handleColorChange}
          />
        </TabsContent>

        <TabsContent value="gradients" className="mt-4">
          <GradientSelector
            value={value.type === 'gradient' ? value.value || '' : ''}
            onChange={handleGradientChange}
          />
        </TabsContent>

        <TabsContent value="patterns" className="mt-4">
          <PatternSelector
            value={value.type === 'pattern' ? value.pattern || '' : ''}
            onChange={handlePatternChange}
          />
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <ImageGallery
            images={userImages}
            value={value.type === 'image' ? value.value : undefined}
            onChange={handleImageChange}
          />
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Video backgrounds</p>
            <p className="text-xs">Available for Pro users</p>
            <Button className="mt-4" variant="outline">
              Upgrade to Pro
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}