import { AnimationConfig, ANIMATIONS } from './animations';

/**
 * Service for managing background animations
 */
export class AnimationService {
  /**
   * Generate CSS for animation
   */
  static generateAnimationCSS(config: AnimationConfig): string {
    if (config.type === 'none') return '';

    const animation = ANIMATIONS[config.type];
    if (!animation) return '';

    let css = animation.keyframes;

    // Add animation properties
    if (animation.properties) {
      css += `
        .background-animation {
          ${animation.properties}
        }
      `;
    }

    return css;
  }

  /**
   * Generate HTML elements for animation
   */
  static generateAnimationElements(config: AnimationConfig): string {
    if (config.type === 'none') return '';

    const animation = ANIMATIONS[config.type];
    if (!animation || !animation.generateElements) return '';

    return animation.generateElements(config);
  }

  /**
   * Apply animation to a container
   */
  static applyAnimation(
    container: HTMLElement,
    config: AnimationConfig
  ): void {
    // Remove existing animations
    this.clearAnimation(container);

    if (config.type === 'none') return;

    // Add CSS styles
    const styleId = 'background-animation-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const css = this.generateAnimationCSS(config);
    styleElement.textContent = css;

    // Add animation class to container
    container.classList.add('background-animation');

    // Generate and add animation elements
    const elementsHtml = this.generateAnimationElements(config);
    if (elementsHtml) {
      const animationContainer = document.createElement('div');
      animationContainer.className = 'animation-elements';
      animationContainer.innerHTML = elementsHtml;
      container.appendChild(animationContainer);
    }
  }

  /**
   * Clear animation from container
   */
  static clearAnimation(container: HTMLElement): void {
    // Remove animation class
    container.classList.remove('background-animation');

    // Remove animation elements
    const animationElements = container.querySelector('.animation-elements');
    if (animationElements) {
      animationElements.remove();
    }
  }

  /**
   * Validate animation configuration
   */
  static validateConfig(config: any): config is AnimationConfig {
    if (!config || typeof config !== 'object') return false;

    const validTypes = Object.keys(ANIMATIONS);
    if (!validTypes.includes(config.type)) return false;

    if (config.intensity && (config.intensity < 1 || config.intensity > 10)) return false;
    if (config.speed && !['slow', 'normal', 'fast'].includes(config.speed)) return false;

    return true;
  }

  /**
   * Get animation by type
   */
  static getAnimation(type: string) {
    return ANIMATIONS[type as keyof typeof ANIMATIONS];
  }

  /**
   * Get all available animations
   */
  static getAllAnimations() {
    return Object.entries(ANIMATIONS).map(([key, animation]) => ({
      type: key,
      ...animation,
    }));
  }

  /**
   * Calculate animation properties based on intensity
   */
  static calculateIntensityProperties(config: AnimationConfig) {
    const intensity = config.intensity || 5;
    const intensityFactor = intensity / 10; // 0.1 to 1.0

    return {
      opacity: 0.3 + (intensityFactor * 0.4), // 0.3 to 0.7
      scale: 0.8 + (intensityFactor * 0.4), // 0.8 to 1.2
      count: Math.floor(5 + (intensityFactor * 15)), // 5 to 20 elements
      speed: config.speed === 'slow' ? 1.5 : config.speed === 'fast' ? 0.5 : 1.0,
    };
  }
}