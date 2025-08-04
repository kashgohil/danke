import { CSSProperties } from 'react';

/**
 * Generates a gradient background style based on a selected color
 * @param backgroundColor - Hex color string (e.g., "#3B82F6")
 * @returns CSS properties object with gradient background or empty object if no color
 */
export function generateGradientStyle(backgroundColor?: string): CSSProperties {
  if (!backgroundColor) {
    return {};
  }

  // Convert hex to RGB for gradient calculations
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(backgroundColor);
  if (!rgb) {
    return {};
  }

  // Create lighter and darker variations for gradient
  const lighterRgb = {
    r: Math.min(255, rgb.r + 80),
    g: Math.min(255, rgb.g + 80),
    b: Math.min(255, rgb.b + 80),
  };

  const darkerRgb = {
    r: Math.max(0, rgb.r - 40),
    g: Math.max(0, rgb.g - 40),
    b: Math.max(0, rgb.b - 40),
  };

  const lighterColor = `rgb(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b})`;
  const baseColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const darkerColor = `rgb(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b})`;

  return {
    background: `linear-gradient(135deg, ${lighterColor} 0%, ${baseColor} 50%, ${darkerColor} 100%)`,
  };
}

/**
 * Gets the default CSS classes for a container with optional gradient background
 * @param backgroundColor - Hex color string
 * @param baseClasses - Base CSS classes to apply
 * @returns CSS class string
 */
export function getGradientClasses(
  backgroundColor?: string,
  baseClasses: string = 'min-h-screen'
): string {
  return backgroundColor
    ? baseClasses
    : `${baseClasses} bg-gradient-to-br from-danke-50 via-white to-danke-100`;
}

/**
 * Generates card styling based on the selected background color
 * @param backgroundColor - Hex color string (e.g., "#3B82F6")
 * @returns CSS properties object for card styling
 */
export function generateCardStyle(backgroundColor?: string): CSSProperties {
  if (!backgroundColor) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    };
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(backgroundColor);
  if (!rgb) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
    };
  }

  // Calculate the lighter gradient color (same as background)
  const lighterRgb = {
    r: Math.min(255, rgb.r + 80),
    g: Math.min(255, rgb.g + 80),
    b: Math.min(255, rgb.b + 80),
  };

  // Calculate luminance to determine card strategy
  const luminance =
    (0.299 * lighterRgb.r + 0.587 * lighterRgb.g + 0.114 * lighterRgb.b) / 255;

  if (luminance > 0.5) {
    // Light background - use white/light cards for contrast
    return {
      backgroundColor: `rgba(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b}, 0.5)`,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    };
  } else {
    // Dark background - use dark cards for contrast
    return {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    };
  }
}

/**
 * Determines appropriate text colors based on background color
 * @param backgroundColor - Hex color string
 * @returns Object with text color classes
 */
export function getTextColors(backgroundColor?: string) {
  if (!backgroundColor) {
    return {
      primary: 'text-danke-900',
      secondary: 'text-danke-700',
      muted: 'text-danke-600',
      accent: 'text-danke-800',
    };
  }

  // Convert hex to RGB to calculate luminance
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(backgroundColor);
  if (!rgb) {
    return {
      primary: 'text-danke-900',
      secondary: 'text-danke-700',
      muted: 'text-danke-600',
      accent: 'text-danke-800',
    };
  }

  // Calculate the lighter gradient color (what users actually see as background)
  const lighterRgb = {
    r: Math.min(255, rgb.r + 80),
    g: Math.min(255, rgb.g + 80),
    b: Math.min(255, rgb.b + 80),
  };

  // Calculate relative luminance of the lighter gradient color
  const luminance =
    (0.299 * lighterRgb.r + 0.587 * lighterRgb.g + 0.114 * lighterRgb.b) / 255;

  // Use a more conservative threshold for better contrast
  if (luminance > 0.5) {
    // Light background - use very dark text for maximum contrast
    return {
      primary: 'text-gray-900',
      secondary: 'text-gray-800',
      muted: 'text-gray-700',
      accent: 'text-black',
    };
  } else {
    // Dark background - use very light text for maximum contrast
    return {
      primary: 'text-white',
      secondary: 'text-gray-50',
      muted: 'text-gray-100',
      accent: 'text-white',
    };
  }
}

/**
 * Generates inline text color styles for maximum contrast
 * @param backgroundColor - Hex color string
 * @returns Object with inline style colors
 */
export function getContrastTextStyles(backgroundColor?: string) {
  if (!backgroundColor) {
    return {
      primary: { color: '#1f2937' }, // gray-800
      secondary: { color: '#374151' }, // gray-700
      muted: { color: '#6b7280' }, // gray-500
      accent: { color: '#111827' }, // gray-900
    };
  }

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(backgroundColor);
  if (!rgb) {
    return {
      primary: { color: '#1f2937' },
      secondary: { color: '#374151' },
      muted: { color: '#6b7280' },
      accent: { color: '#111827' },
    };
  }

  // Calculate the lighter gradient color (what users actually see as background)
  const lighterRgb = {
    r: Math.min(255, rgb.r + 80),
    g: Math.min(255, rgb.g + 80),
    b: Math.min(255, rgb.b + 80),
  };

  // Calculate relative luminance of the lighter gradient color
  const luminance =
    (0.299 * lighterRgb.r + 0.587 * lighterRgb.g + 0.114 * lighterRgb.b) / 255;

  if (luminance > 0.5) {
    // Light background - use very dark colors for maximum contrast
    return {
      primary: { color: '#000000' }, // Pure black
      secondary: { color: '#1f2937' }, // gray-800
      muted: { color: '#374151' }, // gray-700
      accent: { color: '#000000' }, // Pure black
    };
  } else {
    // Dark background - use very light colors for maximum contrast
    return {
      primary: { color: '#ffffff' }, // Pure white
      secondary: { color: '#f9fafb' }, // gray-50
      muted: { color: '#e5e7eb' }, // gray-200
      accent: { color: '#ffffff' }, // Pure white
    };
  }
}
