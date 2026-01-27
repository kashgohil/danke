export interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'birthday' | 'wedding' | 'holiday' | 'corporate' | 'general' | 'seasonal';
  isPremium: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow: 'none' | 'soft' | 'elevated' | 'floating' | 'glow';
  gradients?: {
    primary: string;
    secondary: string;
    background: string;
  };
  glass?: {
    enabled: boolean;
    opacity: number;
    blur: number;
  };
}

// Define 10+ professional themes
export const THEMES: Record<string, Theme> = {
  // Free themes (existing design)
  default: {
    id: 'default',
    name: 'Default',
    description: 'Clean and professional default theme',
    category: 'general',
    isPremium: false,
    colors: {
      primary: 'hsl(280, 65%, 60%)',
      secondary: 'hsl(260, 30%, 96%)',
      accent: 'hsl(25, 85%, 65%)',
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(220, 15%, 10%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(220, 15%, 10%)',
      muted: 'hsl(220, 15%, 96%)',
      mutedForeground: 'hsl(220, 10%, 45%)',
      border: 'hsl(220, 15%, 90%)',
      input: 'hsl(220, 15%, 88%)',
      ring: 'hsl(280, 65%, 60%)',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    borderRadius: 'lg',
    shadow: 'soft',
  },

  // Premium themes
  birthdayCelebration: {
    id: 'birthdayCelebration',
    name: 'Birthday Celebration',
    description: 'Bright and playful colors for birthday celebrations',
    category: 'birthday',
    isPremium: true,
    colors: {
      primary: 'hsl(45, 86%, 58%)',
      secondary: 'hsl(48, 100%, 96%)',
      accent: 'hsl(330, 100%, 75%)',
      background: 'hsl(45, 100%, 98%)',
      foreground: 'hsl(20, 25%, 15%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(20, 25%, 15%)',
      muted: 'hsl(45, 50%, 95%)',
      mutedForeground: 'hsl(20, 20%, 40%)',
      border: 'hsl(45, 30%, 85%)',
      input: 'hsl(45, 30%, 80%)',
      ring: 'hsl(45, 86%, 58%)',
    },
    fonts: {
      heading: 'Nunito',
      body: 'Nunito',
    },
    borderRadius: 'xl',
    shadow: 'elevated',
    gradients: {
      primary: 'linear-gradient(135deg, hsl(45, 86%, 58%) 0%, hsl(330, 100%, 75%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(48, 100%, 96%) 0%, hsl(45, 100%, 98%) 100%)',
      background: 'linear-gradient(135deg, hsl(45, 100%, 98%) 0%, hsl(330, 80%, 95%) 100%)',
    },
    glass: {
      enabled: true,
      opacity: 0.8,
      blur: 15,
    },
  },

  weddingElegant: {
    id: 'weddingElegant',
    name: 'Wedding Elegant',
    description: 'Sophisticated and romantic for weddings',
    category: 'wedding',
    isPremium: true,
    colors: {
      primary: 'hsl(320, 60%, 65%)',
      secondary: 'hsl(320, 40%, 95%)',
      accent: 'hsl(45, 70%, 75%)',
      background: 'hsl(320, 30%, 98%)',
      foreground: 'hsl(320, 20%, 15%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(320, 20%, 15%)',
      muted: 'hsl(320, 25%, 95%)',
      mutedForeground: 'hsl(320, 15%, 45%)',
      border: 'hsl(320, 20%, 88%)',
      input: 'hsl(320, 20%, 85%)',
      ring: 'hsl(320, 60%, 65%)',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lato',
    },
    borderRadius: 'lg',
    shadow: 'elevated',
    gradients: {
      primary: 'linear-gradient(135deg, hsl(320, 60%, 65%) 0%, hsl(45, 70%, 75%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(320, 40%, 95%) 0%, hsl(320, 50%, 92%) 100%)',
      background: 'linear-gradient(135deg, hsl(320, 30%, 98%) 0%, hsl(320, 40%, 95%) 100%)',
    },
  },

  holidayFestive: {
    id: 'holidayFestive',
    name: 'Holiday Festive',
    description: 'Red and green holiday theme for Christmas and winter celebrations',
    category: 'holiday',
    isPremium: true,
    colors: {
      primary: 'hsl(0, 75%, 55%)',
      secondary: 'hsl(120, 60%, 45%)',
      accent: 'hsl(45, 85%, 70%)',
      background: 'hsl(0, 20%, 98%)',
      foreground: 'hsl(0, 15%, 10%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(0, 15%, 10%)',
      muted: 'hsl(0, 15%, 95%)',
      mutedForeground: 'hsl(0, 10%, 45%)',
      border: 'hsl(0, 20%, 90%)',
      input: 'hsl(0, 20%, 85%)',
      ring: 'hsl(0, 75%, 55%)',
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Source Sans Pro',
    },
    borderRadius: 'md',
    shadow: 'elevated',
    gradients: {
      primary: 'linear-gradient(135deg, hsl(0, 75%, 55%) 0%, hsl(120, 60%, 45%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(120, 20%, 95%) 0%, hsl(45, 50%, 92%) 100%)',
      background: 'linear-gradient(135deg, hsl(0, 20%, 98%) 0%, hsl(120, 20%, 95%) 100%)',
    },
  },

  corporateProfessional: {
    id: 'corporateProfessional',
    name: 'Corporate Professional',
    description: 'Clean and professional for business environments',
    category: 'corporate',
    isPremium: true,
    colors: {
      primary: 'hsl(210, 100%, 35%)',
      secondary: 'hsl(210, 40%, 95%)',
      accent: 'hsl(210, 80%, 60%)',
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(210, 15%, 10%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(210, 15%, 10%)',
      muted: 'hsl(210, 15%, 96%)',
      mutedForeground: 'hsl(210, 10%, 45%)',
      border: 'hsl(210, 15%, 90%)',
      input: 'hsl(210, 15%, 88%)',
      ring: 'hsl(210, 100%, 35%)',
    },
    fonts: {
      heading: 'Roboto Slab',
      body: 'Roboto',
    },
    borderRadius: 'sm',
    shadow: 'soft',
  },

  summerVibes: {
    id: 'summerVibes',
    name: 'Summer Vibes',
    description: 'Bright and warm colors for summer celebrations',
    category: 'seasonal',
    isPremium: true,
    colors: {
      primary: 'hsl(45, 100%, 55%)',
      secondary: 'hsl(60, 80%, 90%)',
      accent: 'hsl(195, 80%, 55%)',
      background: 'hsl(45, 80%, 98%)',
      foreground: 'hsl(45, 25%, 15%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(45, 25%, 15%)',
      muted: 'hsl(45, 60%, 95%)',
      mutedForeground: 'hsl(45, 20%, 40%)',
      border: 'hsl(45, 40%, 85%)',
      input: 'hsl(45, 40%, 80%)',
      ring: 'hsl(45, 100%, 55%)',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Open Sans',
    },
    borderRadius: 'xl',
    shadow: 'floating',
    gradients: {
      primary: 'linear-gradient(135deg, hsl(45, 100%, 55%) 0%, hsl(195, 80%, 55%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(60, 80%, 95%) 0%, hsl(45, 80%, 98%) 100%)',
      background: 'linear-gradient(135deg, hsl(45, 80%, 98%) 0%, hsl(60, 80%, 95%) 100%)',
    },
  },

  autumnHarvest: {
    id: 'autumnHarvest',
    name: 'Autumn Harvest',
    description: 'Warm and earthy tones for fall celebrations',
    category: 'seasonal',
    isPremium: true,
    colors: {
      primary: 'hsl(25, 70%, 60%)',
      secondary: 'hsl(25, 50%, 90%)',
      accent: 'hsl(15, 75%, 55%)',
      background: 'hsl(25, 40%, 98%)',
      foreground: 'hsl(25, 20%, 15%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(25, 20%, 15%)',
      muted: 'hsl(25, 35%, 95%)',
      mutedForeground: 'hsl(25, 15%, 45%)',
      border: 'hsl(25, 30%, 88%)',
      input: 'hsl(25, 30%, 85%)',
      ring: 'hsl(25, 70%, 60%)',
    },
    fonts: {
      heading: 'Crimson Text',
      body: 'Libre Baskerville',
    },
    borderRadius: 'md',
    shadow: 'elevated',
    gradients: {
      primary: 'linear-gradient(135deg, hsl(25, 70%, 60%) 0%, hsl(15, 75%, 55%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(25, 50%, 90%) 0%, hsl(25, 60%, 85%) 100%)',
      background: 'linear-gradient(135deg, hsl(25, 40%, 98%) 0%, hsl(25, 50%, 90%) 100%)',
    },
  },

  nightSky: {
    id: 'nightSky',
    name: 'Night Sky',
    description: 'Dark theme with starry accents for evening events',
    category: 'general',
    isPremium: true,
    colors: {
      primary: 'hsl(220, 90%, 70%)',
      secondary: 'hsl(220, 40%, 15%)',
      accent: 'hsl(280, 80%, 65%)',
      background: 'hsl(220, 50%, 8%)',
      foreground: 'hsl(220, 15%, 95%)',
      card: 'hsl(220, 40%, 12%)',
      cardForeground: 'hsl(220, 15%, 95%)',
      muted: 'hsl(220, 30%, 18%)',
      mutedForeground: 'hsl(220, 10%, 70%)',
      border: 'hsl(220, 25%, 20%)',
      input: 'hsl(220, 25%, 18%)',
      ring: 'hsl(220, 90%, 70%)',
    },
    fonts: {
      heading: 'Oswald',
      body: 'Source Sans Pro',
    },
    borderRadius: 'lg',
    shadow: 'glow',
    gradients: {
      primary: 'linear-gradient(135deg, hsl(220, 90%, 70%) 0%, hsl(280, 80%, 65%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(220, 40%, 12%) 0%, hsl(220, 30%, 15%) 100%)',
      background: 'linear-gradient(135deg, hsl(220, 50%, 8%) 0%, hsl(220, 40%, 12%) 100%)',
    },
  },

  oceanBreeze: {
    id: 'oceanBreeze',
    name: 'Ocean Breeze',
    description: 'Calming blue tones for relaxed celebrations',
    category: 'general',
    isPremium: true,
    colors: {
      primary: 'hsl(195, 80%, 50%)',
      secondary: 'hsl(195, 60%, 90%)',
      accent: 'hsl(165, 70%, 45%)',
      background: 'hsl(195, 50%, 98%)',
      foreground: 'hsl(195, 25%, 15%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(195, 25%, 15%)',
      muted: 'hsl(195, 40%, 95%)',
      mutedForeground: 'hsl(195, 20%, 40%)',
      border: 'hsl(195, 30%, 88%)',
      input: 'hsl(195, 30%, 85%)',
      ring: 'hsl(195, 80%, 50%)',
    },
    fonts: {
      heading: 'Quicksand',
      body: 'Lato',
    },
    borderRadius: 'xl',
    shadow: 'floating',
    gradients: {
      primary: 'linear-gradient(135deg, hsl(195, 80%, 50%) 0%, hsl(165, 70%, 45%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(195, 60%, 90%) 0%, hsl(195, 70%, 85%) 100%)',
      background: 'linear-gradient(135deg, hsl(195, 50%, 98%) 0%, hsl(195, 60%, 90%) 100%)',
    },
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design for sophisticated events',
    category: 'general',
    isPremium: true,
    colors: {
      primary: 'hsl(0, 0%, 20%)',
      secondary: 'hsl(0, 0%, 96%)',
      accent: 'hsl(0, 0%, 60%)',
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 10%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(0, 0%, 10%)',
      muted: 'hsl(0, 0%, 96%)',
      mutedForeground: 'hsl(0, 0%, 45%)',
      border: 'hsl(0, 0%, 90%)',
      input: 'hsl(0, 0%, 88%)',
      ring: 'hsl(0, 0%, 20%)',
    },
    fonts: {
      heading: 'Helvetica Neue',
      body: 'Helvetica Neue',
    },
    borderRadius: 'sm',
    shadow: 'soft',
  },

  vintage: {
    id: 'vintage',
    name: 'Vintage',
    description: 'Muted colors and classic typography for nostalgic events',
    category: 'general',
    isPremium: true,
    colors: {
      primary: 'hsl(35, 25%, 45%)',
      secondary: 'hsl(35, 15%, 92%)',
      accent: 'hsl(15, 45%, 55%)',
      background: 'hsl(35, 20%, 98%)',
      foreground: 'hsl(35, 15%, 15%)',
      card: 'hsl(35, 10%, 98%)',
      cardForeground: 'hsl(35, 15%, 15%)',
      muted: 'hsl(35, 15%, 94%)',
      mutedForeground: 'hsl(35, 10%, 50%)',
      border: 'hsl(35, 15%, 88%)',
      input: 'hsl(35, 15%, 85%)',
      ring: 'hsl(35, 25%, 45%)',
    },
    fonts: {
      heading: 'Times New Roman',
      body: 'Georgia',
    },
    borderRadius: 'md',
    shadow: 'soft',
  },
};

// Helper functions for theme operations
export function getThemeById(id: string): Theme | undefined {
  return THEMES[id];
}

export function getThemesByCategory(category: string): Theme[] {
  return Object.values(THEMES).filter(theme => theme.category === category);
}

export function getPremiumThemes(): Theme[] {
  return Object.values(THEMES).filter(theme => theme.isPremium);
}

export function getFreeThemes(): Theme[] {
  return Object.values(THEMES).filter(theme => !theme.isPremium);
}

export function getAllThemes(): Theme[] {
  return Object.values(THEMES);
}

// Default theme for fallbacks
export const DEFAULT_THEME = THEMES.default;

// Theme categories for UI filtering
export const THEME_CATEGORIES = [
  { id: 'all', name: 'All Themes', count: getAllThemes().length },
  { id: 'birthday', name: 'Birthday', count: getThemesByCategory('birthday').length },
  { id: 'wedding', name: 'Wedding', count: getThemesByCategory('wedding').length },
  { id: 'holiday', name: 'Holiday', count: getThemesByCategory('holiday').length },
  { id: 'corporate', name: 'Corporate', count: getThemesByCategory('corporate').length },
  { id: 'seasonal', name: 'Seasonal', count: getThemesByCategory('seasonal').length },
  { id: 'general', name: 'General', count: getThemesByCategory('general').length },
];