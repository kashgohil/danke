'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographySelector } from './typography-selector';
import { FontControls } from './font-controls';
import { TypographyPreview } from './typography-preview';
import { getFontPairing } from '@/lib/typography';
import type { FontPairing } from '@/lib/typography';

interface TypographySettingsProps {
  initialPairingId?: string;
  initialFontScale?: number;
  onSave?: (config: { pairingId: string; fontScale: number }) => void;
  className?: string;
}

export function TypographySettings({
  initialPairingId = 'modern',
  initialFontScale = 1,
  onSave,
  className,
}: TypographySettingsProps) {
  const [selectedPairingId, setSelectedPairingId] = useState(initialPairingId);
  const [fontScale, setFontScale] = useState(initialFontScale);

  const selectedPairing = getFontPairing(selectedPairingId);

  const handleApply = () => {
    onSave?.({
      pairingId: selectedPairingId,
      fontScale,
    });
  };

  const handleReset = () => {
    setSelectedPairingId('modern');
    setFontScale(1);
  };

  if (!selectedPairing) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Typography pairing not found</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <Tabs defaultValue="selector" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="selector">Select Fonts</TabsTrigger>
          <TabsTrigger value="controls">Size Controls</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="apply">Apply</TabsTrigger>
        </TabsList>

        <TabsContent value="selector" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographySelector
                value={selectedPairingId}
                onChange={setSelectedPairingId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="mt-6">
          <FontControls
            fontScale={fontScale}
            onFontScaleChange={setFontScale}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <TypographyPreview
            pairing={selectedPairing}
            fontScale={fontScale}
          />
        </TabsContent>

        <TabsContent value="apply" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Apply Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Current Selection:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Font Pairing:</span>
                    <div className="font-medium">{selectedPairing.name}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Font Scale:</span>
                    <div className="font-medium">{Math.round(fontScale * 100)}%</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleApply}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Apply Typography
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors"
                >
                  Reset to Default
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}