import { put } from '@vercel/blob';
import { cache } from './cache';

// Background pattern definitions
export const BACKGROUND_PATTERNS = {
  polkaDots: {
    name: 'Polka Dots',
    category: 'geometric',
    css: `
      background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
      background-size: 20px 20px;
    `,
  },
  stripesHorizontal: {
    name: 'Horizontal Stripes',
    category: 'geometric',
    css: `
      background-image: repeating-linear-gradient(
        0deg,
        rgba(255,255,255,0.1) 0px,
        rgba(255,255,255,0.1) 2px,
        transparent 2px,
        transparent 20px
      );
    `,
  },
  stripesVertical: {
    name: 'Vertical Stripes',
    category: 'geometric',
    css: `
      background-image: repeating-linear-gradient(
        90deg,
        rgba(255,255,255,0.1) 0px,
        rgba(255,255,255,0.1) 2px,
        transparent 2px,
        transparent 20px
      );
    `,
  },
  checks: {
    name: 'Checks',
    category: 'geometric',
    css: `
      background-image:
        linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    `,
  },
  triangles: {
    name: 'Triangles',
    category: 'geometric',
    css: `
      background-image:
        linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    `,
  },
  circles: {
    name: 'Circles',
    category: 'geometric',
    css: `
      background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 2px, transparent 2px);
      background-size: 30px 30px;
    `,
  },
  waves: {
    name: 'Waves',
    category: 'organic',
    css: `
      background-image: radial-gradient(ellipse at top, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 50%);
      background-size: 100px 100px;
      background-position: 0 0, 50px 50px;
    `,
  },
  noise: {
    name: 'Noise',
    category: 'texture',
    css: `
      background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 4px 4px;
    `,
  },
  paper: {
    name: 'Paper',
    category: 'texture',
    css: `
      background-image:
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 20px 20px;
    `,
  },
  fabric: {
    name: 'Fabric',
    category: 'texture',
    css: `
      background-image:
        repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 8px),
        repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 8px);
    `,
  },
};

// Gradient definitions
export const BACKGROUND_GRADIENTS = {
  sunset: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 50%, #4ecdc4 100%)',
  ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  forest: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  pink: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  blue: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  green: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  orange: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  cosmic: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  dawn: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
};

// Background overlay types
export const BACKGROUND_OVERLAYS = {
  none: { name: 'None', css: 'none' },
  light: { name: 'Light', css: 'rgba(255, 255, 255, 0.3)' },
  dark: { name: 'Dark', css: 'rgba(0, 0, 0, 0.3)' },
  gradient: {
    name: 'Gradient',
    css: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
  },
};

/**
 * Service for managing background operations
 */
export class BackgroundService {
  /**
   * Upload an image to Vercel Blob storage
   */
  static async uploadImage(
    file: File,
    userId: string,
    boardId?: string
  ): Promise<{ url: string; filename: string }> {
    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('File size must be less than 5MB');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('File must be JPEG, PNG, WebP, or GIF');
    }

    // Generate unique filename
    const extension = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const filename = `background-${userId}-${timestamp}-${random}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return {
      url: blob.url,
      filename,
    };
  }

  /**
   * Upload a video to Vercel Blob storage
   */
  static async uploadVideo(
    file: File,
    userId: string,
    boardId?: string
  ): Promise<{ url: string; filename: string }> {
    // Validate file
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      throw new Error('Video file size must be less than 50MB');
    }

    const allowedTypes = ['video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Video must be MP4 or WebM format');
    }

    // Generate unique filename
    const extension = file.name.split('.').pop() || 'mp4';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const filename = `background-video-${userId}-${timestamp}-${random}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return {
      url: blob.url,
      filename,
    };
  }

  /**
   * Generate CSS for background configuration
   */
  static generateBackgroundCss(config: {
    type: string;
    value?: string;
    pattern?: string;
    overlay: string;
    overlayColor?: string;
    overlayOpacity: number;
    position: string;
    size: string;
    parallax: boolean;
    videoUrl?: string;
  }): string {
    let css = '';

    // Base background
    if (config.type === 'color') {
      css += `background-color: ${config.value || '#ffffff'};`;
    } else if (config.type === 'gradient') {
      css += `background: ${config.value};`;
    } else if (config.type === 'pattern') {
      const pattern = BACKGROUND_PATTERNS[config.pattern as keyof typeof BACKGROUND_PATTERNS];
      if (pattern) {
        css += pattern.css;
      }
    } else if (config.type === 'image' && config.value) {
      css += `
        background-image: url(${config.value});
        background-position: ${config.position};
        background-size: ${config.size};
        background-repeat: ${config.size === 'tile' ? 'repeat' : 'no-repeat'};
      `;
    } else if (config.type === 'video' && config.videoUrl) {
      // Video backgrounds are handled separately in the component
      css += `background-color: #000000;`; // Fallback
    }

    // Overlay
    if (config.overlay !== 'none' && config.overlayOpacity > 0) {
      let overlayCss = '';
      if (config.overlay === 'custom' && config.overlayColor) {
        overlayCss = config.overlayColor;
      } else {
        overlayCss = BACKGROUND_OVERLAYS[config.overlay as keyof typeof BACKGROUND_OVERLAYS]?.css || 'none';
      }

      if (overlayCss !== 'none') {
        // Apply opacity to the overlay
        const opacity = config.overlayOpacity / 100;
        if (overlayCss.startsWith('rgba')) {
          // Already has alpha, replace it
          overlayCss = overlayCss.replace(/rgba\([^,]+,[^,]+,[^,]+,\s*[^)]+\)/, (match) => {
            return match.replace(/,\s*[^)]+\)/, `, ${opacity})`);
          });
        } else if (overlayCss.startsWith('linear-gradient')) {
          // For gradients, we need to modify the alpha values
          overlayCss = overlayCss.replace(/rgba?\([^)]+\)/g, (match) => {
            return match.replace(/,\s*\d*\.?\d+\)/, `, ${opacity})`);
          });
        } else {
          // Solid color, add alpha
          overlayCss = overlayCss.replace(/rgb\(/, 'rgba(').replace(/\)/, `, ${opacity})`);
        }

        css += `
          position: relative;
        `;
        css += `
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${overlayCss};
            pointer-events: none;
            z-index: 1;
          }
        `;
      }
    }

    // Parallax (CSS-only approximation)
    if (config.parallax) {
      css += `
        background-attachment: fixed;
        background-position: center;
      `;
    }

    return css.trim();
  }

  /**
   * Get background patterns by category
   */
  static getPatternsByCategory(category?: string): typeof BACKGROUND_PATTERNS {
    if (!category) {
      return BACKGROUND_PATTERNS;
    }

    const filtered: Partial<typeof BACKGROUND_PATTERNS> = {};
    Object.entries(BACKGROUND_PATTERNS).forEach(([key, pattern]) => {
      if (pattern.category === category) {
        filtered[key as keyof typeof BACKGROUND_PATTERNS] = pattern;
      }
    });

    return filtered as typeof BACKGROUND_PATTERNS;
  }

  /**
   * Get all background gradients
   */
  static getGradients(): typeof BACKGROUND_GRADIENTS {
    return BACKGROUND_GRADIENTS;
  }

  /**
   * Get background overlays
   */
  static getOverlays(): typeof BACKGROUND_OVERLAYS {
    return BACKGROUND_OVERLAYS;
  }

  /**
   * Validate background configuration
   */
  static validateConfig(config: any): boolean {
    if (!config || typeof config !== 'object') return false;

    const required = ['type', 'overlay', 'overlayOpacity', 'position', 'size', 'parallax'];
    for (const field of required) {
      if (!(field in config)) return false;
    }

    const validTypes = ['color', 'gradient', 'pattern', 'image', 'video'];
    if (!validTypes.includes(config.type)) return false;

    if (config.type === 'image' && !config.value) return false;
    if (config.type === 'video' && !config.videoUrl) return false;
    if (config.type === 'pattern' && !config.pattern) return false;

    return true;
  }

  /**
   * Generate background preview (for thumbnails)
   */
  static async generatePreview(
    config: any,
    width: number = 300,
    height: number = 200
  ): Promise<string> {
    // This would typically use a headless browser or canvas to generate a preview
    // For now, return a placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
          Background Preview
        </text>
      </svg>
    `)}`;
  }

  /**
   * Clean up unused background files (optional maintenance function)
   */
  static async cleanupUnusedFiles(): Promise<void> {
    // This would check for background files that are no longer referenced
    // Implementation would depend on how we track file usage
    console.log('Background cleanup not implemented yet');
  }
}