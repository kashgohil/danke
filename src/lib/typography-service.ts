import { FontPairing, FONT_PAIRINGS, getFontPairing } from './typography';
import { cache } from './cache';

/**
 * Service for managing typography operations
 */
export class TypographyService {
  /**
   * Generate CSS for font loading
   */
  static generateFontCSS(pairing: FontPairing): string {
    const fonts = [];

    // Google Fonts URLs for common fonts
    const googleFonts: Record<string, string> = {
      'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
      'Playfair Display': 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
      'Lato': 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
      'Nunito': 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap',
      'Roboto Slab': 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600;700&display=swap',
      'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
      'Fuzzy Bubbles': 'https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&display=swap',
      'Quicksand': 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap',
    };

    // Add heading font
    if (googleFonts[pairing.fonts.heading.family]) {
      fonts.push(`@import url('${googleFonts[pairing.fonts.heading.family]}');`);
    }

    // Add body font (if different from heading)
    if (pairing.fonts.heading.family !== pairing.fonts.body.family && googleFonts[pairing.fonts.body.family]) {
      fonts.push(`@import url('${googleFonts[pairing.fonts.body.family]}');`);
    }

    return fonts.join('\n');
  }

  /**
   * Generate CSS custom properties for typography
   */
  static generateTypographyCSS(pairing: FontPairing, scaleMultiplier: number = 1): string {
    const vars: string[] = [];

    // Font families
    vars.push(`--font-heading: '${pairing.fonts.heading.family}';`);
    vars.push(`--font-body: '${pairing.fonts.body.family}';`);

    // Font weights
    vars.push(`--font-weight-heading: ${pairing.fonts.heading.weight};`);
    vars.push(`--font-weight-body: ${pairing.fonts.body.weight};`);

    // Font styles
    vars.push(`--font-style-heading: ${pairing.fonts.heading.style};`);
    vars.push(`--font-style-body: ${pairing.fonts.body.style};`);

    // Type scale with multiplier
    Object.entries(pairing.typeScale).forEach(([key, value]) => {
      vars.push(`--font-size-${key}: ${value * scaleMultiplier}rem;`);
    });

    // Line heights
    vars.push(`--line-height-heading: ${pairing.lineHeight.heading};`);
    vars.push(`--line-height-body: ${pairing.lineHeight.body};`);

    // Letter spacing
    vars.push(`--letter-spacing-heading: ${pairing.letterSpacing.heading}em;`);
    vars.push(`--letter-spacing-body: ${pairing.letterSpacing.body}em;`);

    return vars.join('\n  ');
  }

  /**
   * Create font loading link element
   */
  static createFontLinkElement(pairing: FontPairing): HTMLLinkElement | null {
    const googleFonts: Record<string, string> = {
      'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
      'Playfair Display': 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
      'Lato': 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
      'Nunito': 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap',
      'Roboto Slab': 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600;700&display=swap',
      'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
      'Fuzzy Bubbles': 'https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles:wght@400;700&display=swap',
      'Quicksand': 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap',
    };

    const headingUrl = googleFonts[pairing.fonts.heading.family];
    const bodyUrl = pairing.fonts.heading.family !== pairing.fonts.body.family
      ? googleFonts[pairing.fonts.body.family]
      : null;

    if (headingUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = headingUrl;
      return link;
    }

    return null;
  }

  /**
   * Apply typography to document
   */
  static applyTypography(pairing: FontPairing, scaleMultiplier: number = 1): void {
    // Remove existing typography styles
    const existingStyles = document.querySelectorAll('style[data-typography]');
    existingStyles.forEach(style => style.remove());

    // Add font loading links
    const fontLink = this.createFontLinkElement(pairing);
    if (fontLink) {
      // Remove existing font links
      const existingLinks = document.querySelectorAll('link[data-typography-font]');
      existingLinks.forEach(link => link.remove());

      fontLink.setAttribute('data-typography-font', 'true');
      document.head.appendChild(fontLink);
    }

    // Add typography CSS
    const typographyStyle = document.createElement('style');
    typographyStyle.setAttribute('data-typography', 'true');

    const css = `
      :root {
        ${this.generateTypographyCSS(pairing, scaleMultiplier)}
      }
    `;

    typographyStyle.textContent = css;
    document.head.appendChild(typographyStyle);

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-typography', pairing.id);
      localStorage.setItem('typography-scale', scaleMultiplier.toString());
    }
  }

  /**
   * Get applied typography from localStorage
   */
  static getAppliedTypography(): { pairing: FontPairing; scale: number } | null {
    if (typeof window === 'undefined') return null;

    const pairingId = localStorage.getItem('selected-typography');
    const scaleStr = localStorage.getItem('typography-scale');

    if (!pairingId) return null;

    const pairing = getFontPairing(pairingId);
    const scale = scaleStr ? parseFloat(scaleStr) : 1;

    if (!pairing) return null;

    return { pairing, scale };
  }

  /**
   * Get typography by ID with caching
   */
  static getTypography(id: string): FontPairing | null {
    const cacheKey = `typography:${id}`;

    const cached = cache.get<FontPairing>(cacheKey);
    if (cached) return cached;

    const pairing = getFontPairing(id);
    if (pairing) {
      cache.set(cacheKey, pairing, 60 * 60 * 1000); // Cache for 1 hour
      return pairing;
    }

    return null;
  }

  /**
   * Get all typography pairings (cached)
   */
  static getAllTypography(): FontPairing[] {
    const cacheKey = 'typography:all';

    const cached = cache.get<FontPairing[]>(cacheKey);
    if (cached) return cached;

    const pairings = Object.values(FONT_PAIRINGS);
    cache.set(cacheKey, pairings, 30 * 60 * 1000); // Cache for 30 minutes

    return pairings;
  }

  /**
   * Validate typography configuration
   */
  static validatePairing(pairing: any): pairing is FontPairing {
    if (!pairing || typeof pairing !== 'object') return false;

    const required = ['id', 'name', 'description', 'category', 'fonts', 'typeScale', 'lineHeight', 'letterSpacing'];
    for (const field of required) {
      if (!(field in pairing)) return false;
    }

    return true;
  }

  /**
   * Generate typography preview CSS
   */
  static generatePreviewCSS(pairing: FontPairing, selector: string, scaleMultiplier: number = 1): string {
    return `
      ${selector} {
        ${this.generateTypographyCSS(pairing, scaleMultiplier)}
      }
    `;
  }

  /**
   * Clear typography cache
   */
  static clearCache(): void {
    // Clear all typography cache entries
    // In a production system, you might want to extend the cache to support key iteration
    cache.clear();
  }
}