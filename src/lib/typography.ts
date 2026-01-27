// Typography system constants and types

export interface FontPairing {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'elegant' | 'friendly' | 'professional' | 'playful';
  isPremium: boolean;
  fonts: {
    heading: {
      family: string;
      weight: string;
      style: string;
    };
    body: {
      family: string;
      weight: string;
      style: string;
    };
  };
  typeScale: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
    body: number;
    small: number;
  };
  lineHeight: {
    heading: number;
    body: number;
  };
  letterSpacing: {
    heading: number;
    body: number;
  };
}

// Professional font pairings
export const FONT_PAIRINGS: Record<string, FontPairing> = {
  modern: {
    id: 'modern',
    name: 'Modern Clean',
    description: 'Clean and contemporary typography for modern designs',
    category: 'modern',
    isPremium: false,
    fonts: {
      heading: {
        family: 'Inter',
        weight: '600',
        style: 'normal',
      },
      body: {
        family: 'Inter',
        weight: '400',
        style: 'normal',
      },
    },
    typeScale: {
      h1: 2.5, h2: 2, h3: 1.75, h4: 1.5, h5: 1.25, h6: 1.125,
      body: 1, small: 0.875,
    },
    lineHeight: {
      heading: 1.2,
      body: 1.6,
    },
    letterSpacing: {
      heading: -0.02,
      body: 0,
    },
  },

  elegant: {
    id: 'elegant',
    name: 'Elegant Serif',
    description: 'Sophisticated serif fonts for formal occasions',
    category: 'elegant',
    isPremium: true,
    fonts: {
      heading: {
        family: 'Playfair Display',
        weight: '700',
        style: 'normal',
      },
      body: {
        family: 'Lato',
        weight: '400',
        style: 'normal',
      },
    },
    typeScale: {
      h1: 3, h2: 2.25, h3: 1.875, h4: 1.5, h5: 1.25, h6: 1.125,
      body: 1, small: 0.875,
    },
    lineHeight: {
      heading: 1.1,
      body: 1.7,
    },
    letterSpacing: {
      heading: -0.01,
      body: 0.01,
    },
  },

  friendly: {
    id: 'friendly',
    name: 'Friendly Rounded',
    description: 'Warm and approachable rounded fonts',
    category: 'friendly',
    isPremium: true,
    fonts: {
      heading: {
        family: 'Nunito',
        weight: '700',
        style: 'normal',
      },
      body: {
        family: 'Nunito',
        weight: '400',
        style: 'normal',
      },
    },
    typeScale: {
      h1: 2.75, h2: 2.125, h3: 1.75, h4: 1.5, h5: 1.25, h6: 1.125,
      body: 1, small: 0.875,
    },
    lineHeight: {
      heading: 1.3,
      body: 1.6,
    },
    letterSpacing: {
      heading: 0,
      body: 0,
    },
  },

  professional: {
    id: 'professional',
    name: 'Corporate Professional',
    description: 'Clean and authoritative for business environments',
    category: 'professional',
    isPremium: true,
    fonts: {
      heading: {
        family: 'Roboto Slab',
        weight: '600',
        style: 'normal',
      },
      body: {
        family: 'Roboto',
        weight: '400',
        style: 'normal',
      },
    },
    typeScale: {
      h1: 2.625, h2: 2.125, h3: 1.75, h4: 1.5, h5: 1.25, h6: 1.125,
      body: 1, small: 0.875,
    },
    lineHeight: {
      heading: 1.2,
      body: 1.5,
    },
    letterSpacing: {
      heading: 0,
      body: 0.01,
    },
  },

  playful: {
    id: 'playful',
    name: 'Playful Fun',
    description: 'Energetic and fun fonts for celebrations',
    category: 'playful',
    isPremium: true,
    fonts: {
      heading: {
        family: 'Fuzzy Bubbles',
        weight: '700',
        style: 'normal',
      },
      body: {
        family: 'Quicksand',
        weight: '400',
        style: 'normal',
      },
    },
    typeScale: {
      h1: 2.75, h2: 2.25, h3: 1.875, h4: 1.625, h5: 1.375, h6: 1.125,
      body: 1, small: 0.875,
    },
    lineHeight: {
      heading: 1.4,
      body: 1.7,
    },
    letterSpacing: {
      heading: 0.02,
      body: 0.01,
    },
  },
};

// Type scale presets
export const TYPE_SCALES = {
  small: {
    name: 'Small',
    scale: {
      h1: 2, h2: 1.75, h3: 1.5, h4: 1.375, h5: 1.25, h6: 1.125,
      body: 1, small: 0.875,
    },
  },
  medium: {
    name: 'Medium',
    scale: {
      h1: 2.5, h2: 2, h3: 1.75, h4: 1.5, h5: 1.25, h6: 1.125,
      body: 1, small: 0.875,
    },
  },
  large: {
    name: 'Large',
    scale: {
      h1: 3, h2: 2.25, h3: 1.875, h4: 1.625, h5: 1.375, h6: 1.125,
      body: 1, small: 0.875,
    },
  },
};

// Helper functions
export function getFontPairing(id: string): FontPairing | undefined {
  return FONT_PAIRINGS[id];
}

export function getFontPairingsByCategory(category?: string): FontPairing[] {
  if (!category) {
    return Object.values(FONT_PAIRINGS);
  }
  return Object.values(FONT_PAIRINGS).filter(pairing => pairing.category === category);
}

export function getPremiumFontPairings(): FontPairing[] {
  return Object.values(FONT_PAIRINGS).filter(pairing => pairing.isPremium);
}

export function getFreeFontPairings(): FontPairing[] {
  return Object.values(FONT_PAIRINGS).filter(pairing => !pairing.isPremium);
}