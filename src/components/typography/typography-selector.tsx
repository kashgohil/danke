'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FontPairing, FONT_PAIRINGS } from '@/lib/typography';

interface TypographySelectorProps {
  value: string;
  onChange: (pairingId: string) => void;
  className?: string;
}

interface TypographyCardProps {
  pairing: FontPairing;
  isSelected: boolean;
  onSelect: () => void;
}

function TypographyCard({ pairing, isSelected, onSelect }: TypographyCardProps) {
  return (
    <div
      className={cn(
        'relative border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md',
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-gray-300 hover:border-gray-400'
      )}
      onClick={onSelect}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="bg-primary text-primary-foreground rounded-full p-1">
            <Check className="h-3 w-3" />
          </div>
        </div>
      )}

      {/* Premium badge */}
      {pairing.isPremium && (
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs">
            Pro
          </Badge>
        </div>
      )}

      <div className="space-y-4">
        {/* Preview text */}
        <div className="space-y-2">
          <h3
            className="text-2xl font-bold"
            style={{
              fontFamily: pairing.fonts.heading.family,
              fontWeight: pairing.fonts.heading.weight,
              lineHeight: pairing.lineHeight.heading,
              letterSpacing: `${pairing.letterSpacing.heading}em`,
            }}
          >
            {pairing.name}
          </h3>
          <p
            className="text-sm text-muted-foreground"
            style={{
              fontFamily: pairing.fonts.body.family,
              fontWeight: pairing.fonts.body.weight,
              lineHeight: pairing.lineHeight.body,
              letterSpacing: `${pairing.letterSpacing.body}em`,
            }}
          >
            This is how your board text will look with this typography pairing.
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>

        {/* Font info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Heading:</span>
            <span className="font-medium">{pairing.fonts.heading.family}</span>
          </div>
          <div className="flex justify-between">
            <span>Body:</span>
            <span className="font-medium">{pairing.fonts.body.family}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TypographySelector({
  value,
  onChange,
  className,
}: TypographySelectorProps) {
  const pairings = Object.values(FONT_PAIRINGS);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Modern', 'Elegant', 'Friendly', 'Professional', 'Playful'].map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              // TODO: Implement category filtering
              console.log('Filter by category:', category.toLowerCase());
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Typography grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pairings.map((pairing) => (
          <TypographyCard
            key={pairing.id}
            pairing={pairing}
            isSelected={value === pairing.id}
            onSelect={() => onChange(pairing.id)}
          />
        ))}
      </div>

      {/* Current selection info */}
      {value && (
        <div className="text-sm text-muted-foreground">
          Selected: <span className="font-medium">{FONT_PAIRINGS[value]?.name}</span>
        </div>
      )}
    </div>
  );
}