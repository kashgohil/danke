import { Theme, THEMES, getThemeById } from './themes';
import { cache } from './cache';

/**
 * Service for managing theme operations
 */
export class ThemeService {
  /**
   * Generate CSS custom properties from a theme
   */
  static generateCssVariables(theme: Theme): string {
    const vars: string[] = [];

    // Color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      vars.push(`--color-${key}: ${value};`);
    });

    // Font variables
    vars.push(`--font-heading: '${theme.fonts.heading}';`);
    vars.push(`--font-body: '${theme.fonts.body}';`);

    // Border radius
    const borderRadiusMap = {
      none: '0px',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    };
    vars.push(`--border-radius: ${borderRadiusMap[theme.borderRadius]};`);

    // Shadow
    const shadowMap = {
      none: 'none',
      soft: '0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.06)',
      elevated: '0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.12)',
      floating: '0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.16)',
      glow: '0 0 0 4px rgba(var(--color-primary), 0.1)',
    };
    vars.push(`--shadow: ${shadowMap[theme.shadow]};`);

    // Gradients (if available)
    if (theme.gradients) {
      if (theme.gradients.primary) {
        vars.push(`--gradient-primary: ${theme.gradients.primary};`);
      }
      if (theme.gradients.secondary) {
        vars.push(`--gradient-secondary: ${theme.gradients.secondary};`);
      }
      if (theme.gradients.background) {
        vars.push(`--gradient-background: ${theme.gradients.background};`);
      }
    }

    // Glass effect (if enabled)
    if (theme.glass?.enabled) {
      vars.push(`--glass-backdrop-filter: blur(${theme.glass.blur}px) saturate(180%);`);
      vars.push(`--glass-background: rgba(255, 255, 255, ${theme.glass.opacity});`);
      vars.push(`--glass-border: rgba(255, 255, 255, 0.18);`);
    }

    return vars.join('\n  ');
  }

  /**
   * Validate theme configuration
   */
  static validateTheme(theme: any): theme is Theme {
    if (!theme || typeof theme !== 'object') return false;

    // Check required fields
    const requiredFields = ['id', 'name', 'description', 'category', 'colors', 'fonts', 'borderRadius', 'shadow'];
    for (const field of requiredFields) {
      if (!(field in theme)) return false;
    }

    // Check colors structure
    const requiredColors = ['primary', 'secondary', 'accent', 'background', 'foreground', 'card', 'cardForeground', 'muted', 'mutedForeground', 'border', 'input', 'ring'];
    for (const color of requiredColors) {
      if (!(color in theme.colors)) return false;
    }

    // Check fonts structure
    if (!theme.fonts.heading || !theme.fonts.body) return false;

    return true;
  }

  /**
   * Get theme by ID with caching
   */
  static getTheme(id: string): Theme | null {
    const cacheKey = `theme:${id}`;

    // Check cache first
    const cached = cache.get<Theme>(cacheKey);
    if (cached) return cached;

    const theme = getThemeById(id);
    if (theme) {
      // Cache for 1 hour
      cache.set(cacheKey, theme, 60 * 60 * 1000);
      return theme;
    }

    return null;
  }

  /**
   * Get all themes (cached)
   */
  static getAllThemes(): Theme[] {
    const cacheKey = 'themes:all';

    const cached = cache.get<Theme[]>(cacheKey);
    if (cached) return cached;

    const themes = Object.values(THEMES);
    // Cache for 30 minutes
    cache.set(cacheKey, themes, 30 * 60 * 1000);

    return themes;
  }

  /**
   * Get themes by category (cached)
   */
  static getThemesByCategory(category: string): Theme[] {
    const cacheKey = `themes:category:${category}`;

    const cached = cache.get<Theme[]>(cacheKey);
    if (cached) return cached;

    const themes = Object.values(THEMES).filter(theme => theme.category === category);
    // Cache for 30 minutes
    cache.set(cacheKey, themes, 30 * 60 * 1000);

    return themes;
  }

  /**
   * Get premium themes (cached)
   */
  static getPremiumThemes(): Theme[] {
    const cacheKey = 'themes:premium';

    const cached = cache.get<Theme[]>(cacheKey);
    if (cached) return cached;

    const themes = Object.values(THEMES).filter(theme => theme.isPremium);
    // Cache for 30 minutes
    cache.set(cacheKey, themes, 30 * 60 * 1000);

    return themes;
  }

  /**
   * Get free themes (cached)
   */
  static getFreeThemes(): Theme[] {
    const cacheKey = 'themes:free';

    const cached = cache.get<Theme[]>(cacheKey);
    if (cached) return cached;

    const themes = Object.values(THEMES).filter(theme => !theme.isPremium);
    // Cache for 30 minutes
    cache.set(cacheKey, themes, 30 * 60 * 1000);

    return themes;
  }

  /**
   * Create CSS style element for theme
   */
  static createThemeStyleElement(theme: Theme): HTMLStyleElement {
    const style = document.createElement('style');
    style.setAttribute('data-theme', theme.id);

    const css = `
      [data-theme="${theme.id}"] {
        ${this.generateCssVariables(theme)}
      }
    `;

    style.textContent = css;
    return style;
  }

  /**
   * Apply theme to document
   */
  static applyTheme(theme: Theme): void {
    // Remove existing theme styles
    const existingStyles = document.querySelectorAll('style[data-theme]');
    existingStyles.forEach(style => style.remove());

    // Add new theme style
    const themeStyle = this.createThemeStyleElement(theme);
    document.head.appendChild(themeStyle);

    // Set data-theme attribute on root
    document.documentElement.setAttribute('data-theme', theme.id);

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-theme', theme.id);
    }
  }

  /**
   * Get applied theme from localStorage
   */
  static getAppliedTheme(): Theme | null {
    if (typeof window === 'undefined') return null;

    const themeId = localStorage.getItem('selected-theme');
    if (!themeId) return null;

    return this.getTheme(themeId);
  }

  /**
   * Clear theme cache (for development/admin)
   */
  static clearCache(): void {
    // Since we can't iterate over cache keys, we'll clear all cache
    // In a production system, you might want to extend the cache to support key iteration
    cache.clear();
  }

  /**
   * Generate theme preview CSS (for theme gallery)
   */
  static generatePreviewCss(theme: Theme, selector: string): string {
    return `
      ${selector} {
        ${this.generateCssVariables(theme)}
      }
    `;
  }
}