'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BackgroundUpload } from './background-upload';
import { BackgroundSelector, type BackgroundConfig } from './background-selector';
import { BackgroundControls, type BackgroundControlsConfig } from './background-controls';
import { BackgroundPreview } from './background-preview';

interface BackgroundSettingsProps {
  initialConfig?: {
    type: BackgroundConfig['type'];
    value?: string;
    pattern?: string;
    videoUrl?: string;
    position: string;
    size: string;
    overlay: string;
    overlayOpacity: number;
    overlayColor?: string;
    parallax: boolean;
  };
  onSave?: (config: BackgroundSettingsProps['initialConfig']) => void;
  userImages?: Array<{ url: string; filename: string }>;
  className?: string;
}

export function BackgroundSettings({
  initialConfig,
  onSave,
  userImages = [],
  className,
}: BackgroundSettingsProps) {
  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundConfig>(
    initialConfig ? {
      type: initialConfig.type,
      value: initialConfig.value,
      pattern: initialConfig.pattern,
      videoUrl: initialConfig.videoUrl,
    } : {
      type: 'color',
      value: '#ffffff',
    }
  );

  const [controlsConfig, setControlsConfig] = useState<BackgroundControlsConfig>(
    initialConfig ? {
      position: initialConfig.position,
      size: initialConfig.size,
      overlay: initialConfig.overlay,
      overlayOpacity: initialConfig.overlayOpacity,
      overlayColor: initialConfig.overlayColor,
      parallax: initialConfig.parallax,
    } : {
      position: 'center',
      size: 'cover',
      overlay: 'none',
      overlayOpacity: 0,
      parallax: false,
    }
  );

  const handleBackgroundChange = (config: BackgroundConfig) => {
    setBackgroundConfig(config);
  };

  const handleControlsChange = (config: BackgroundControlsConfig) => {
    setControlsConfig(config);
  };

  const handleUpload = (url: string, filename: string) => {
    setBackgroundConfig({
      type: 'image',
      value: url,
    });
    // Add to user images list
    if (!userImages.find(img => img.url === url)) {
      userImages.push({ url, filename });
    }
  };

  const handleRemoveImage = () => {
    setBackgroundConfig({
      type: 'color',
      value: '#ffffff',
    });
  };

  const handleApply = () => {
    const fullConfig = {
      ...backgroundConfig,
      ...controlsConfig,
    };
    onSave?.(fullConfig);
  };

  const handleReset = () => {
    setBackgroundConfig({
      type: 'color',
      value: '#ffffff',
    });
    setControlsConfig({
      position: 'center',
      size: 'cover',
      overlay: 'none',
      overlayOpacity: 0,
      parallax: false,
    });
  };

  const previewConfig = {
    ...backgroundConfig,
    ...controlsConfig,
  };

  return (
    <div className={className}>
      <Tabs defaultValue="selector" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="selector">Select</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="selector" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Background</CardTitle>
            </CardHeader>
            <CardContent>
              <BackgroundSelector
                value={backgroundConfig}
                onChange={handleBackgroundChange}
                userImages={userImages}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Images</CardTitle>
            </CardHeader>
            <CardContent>
              <BackgroundUpload
                onUpload={handleUpload}
                onRemove={handleRemoveImage}
                currentImage={backgroundConfig.type === 'image' ? backgroundConfig.value : undefined}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="mt-6">
          <BackgroundControls
            config={controlsConfig}
            onChange={handleControlsChange}
            showParallax={true}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <BackgroundPreview
            config={previewConfig}
            onApply={handleApply}
            onReset={handleReset}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}