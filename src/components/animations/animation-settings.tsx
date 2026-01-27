'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimationSelector } from './animation-selector';
import { AnimationPreview } from './animation-preview';
import type { AnimationConfig } from '@/lib/animations';

interface AnimationSettingsProps {
  initialConfig?: Partial<AnimationConfig>;
  onSave?: (config: AnimationConfig) => void;
  className?: string;
}

export function AnimationSettings({
  initialConfig,
  onSave,
  className,
}: AnimationSettingsProps) {
  const [config, setConfig] = useState<AnimationConfig>({
    type: initialConfig?.type || 'none',
    intensity: initialConfig?.intensity || 5,
    speed: initialConfig?.speed || 'normal',
    color: initialConfig?.color,
    ...initialConfig,
  });

  const handleConfigChange = (newConfig: AnimationConfig) => {
    setConfig(newConfig);
  };

  const handleApply = () => {
    onSave?.(config);
  };

  return (
    <div className={className}>
      <Tabs defaultValue="selector" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="selector">Select Animation</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="apply">Apply</TabsTrigger>
        </TabsList>

        <TabsContent value="selector" className="mt-6">
          <AnimationSelector
            config={config}
            onChange={handleConfigChange}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <AnimationPreview config={config} />
        </TabsContent>

        <TabsContent value="apply" className="mt-6">
          <div className="max-w-md mx-auto">
            <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
              <h3 className="font-medium">Apply Animation</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Animation:</span>
                  <span className="font-medium">
                    {config.type === 'none' ? 'None' : config.type}
                  </span>
                </div>
                {config.type !== 'none' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Intensity:</span>
                      <span className="font-medium">{config.intensity}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Speed:</span>
                      <span className="font-medium capitalize">{config.speed}</span>
                    </div>
                    {config.color && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Color:</span>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: config.color }}
                          />
                          <span className="font-medium text-xs">{config.color}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex space-x-3 justify-center pt-4">
                <button
                  onClick={handleApply}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Apply Animation
                </button>
                <button
                  onClick={() => setConfig({ type: 'none', intensity: 5, speed: 'normal' })}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}