// Animation system constants and types

export interface AnimationConfig {
  type: 'none' | 'particles' | 'waves' | 'stars' | 'floating' | 'pulse' | 'bubbles';
  intensity: number; // 1-10
  speed: 'slow' | 'normal' | 'fast';
  color?: string; // For colored animations
  count?: number; // Number of elements
  size?: number; // Size of elements
}

// Animation definitions with CSS keyframes
export const ANIMATIONS = {
  none: {
    name: 'None',
    description: 'No animation',
    keyframes: '',
    properties: '',
  },

  particles: {
    name: 'Floating Particles',
    description: 'Subtle floating particles',
    keyframes: `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
        50% { transform: translateY(-15px) rotate(-180deg); opacity: 0.8; }
      }
    `,
    properties: '',
    generateElements: (config: AnimationConfig) => {
      const count = config.count || 20;
      const elements = [];

      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = config.speed === 'slow' ? 15 : config.speed === 'fast' ? 5 : 10;
        const size = (config.size || 4) + Math.random() * 4;

        elements.push(`
          <div class="particle" style="
            position: absolute;
            left: ${left}%;
            top: 100%;
            width: ${size}px;
            height: ${size}px;
            background: ${config.color || '#ffffff'};
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
          "></div>
        `);
      }

      return elements.join('');
    },
  },

  waves: {
    name: 'Ocean Waves',
    description: 'Gentle wave motion',
    keyframes: `
      @keyframes wave {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-10px); }
      }
      @keyframes wave-delayed {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-8px); }
      }
    `,
    properties: '',
    generateElements: (config: AnimationConfig) => {
      const count = config.count || 3;
      const elements = [];

      for (let i = 0; i < count; i++) {
        const top = 60 + (i * 15); // Stagger vertically
        const delay = i * 2;
        const duration = config.speed === 'slow' ? 12 : config.speed === 'fast' ? 4 : 8;

        elements.push(`
          <div class="wave" style="
            position: absolute;
            left: 0;
            top: ${top}%;
            width: 200%;
            height: 20px;
            background: linear-gradient(90deg,
              transparent 0%,
              ${config.color || 'rgba(255,255,255,0.1)'} 50%,
              transparent 100%);
            animation: wave ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
          "></div>
        `);
      }

      return elements.join('');
    },
  },

  stars: {
    name: 'Twinkling Stars',
    description: 'Night sky with twinkling stars',
    keyframes: `
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `,
    properties: '',
    generateElements: (config: AnimationConfig) => {
      const count = config.count || 50;
      const elements = [];

      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = config.speed === 'slow' ? 8 : config.speed === 'fast' ? 2 : 5;
        const size = (config.size || 2) + Math.random() * 2;

        elements.push(`
          <div class="star" style="
            position: absolute;
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            background: ${config.color || '#ffffff'};
            border-radius: 50%;
            animation: twinkle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
          "></div>
        `);
      }

      return elements.join('');
    },
  },

  floating: {
    name: 'Floating Elements',
    description: 'Gently floating geometric shapes',
    keyframes: `
      @keyframes floating {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-15px) rotate(120deg); }
        66% { transform: translateY(-8px) rotate(240deg); }
      }
    `,
    properties: '',
    generateElements: (config: AnimationConfig) => {
      const count = config.count || 15;
      const elements = [];
      const shapes = ['circle', 'square', 'triangle'];

      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = config.speed === 'slow' ? 20 : config.speed === 'fast' ? 6 : 12;
        const size = (config.size || 6) + Math.random() * 6;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        let borderRadius = '50%';
        if (shape === 'square') borderRadius = '0';
        if (shape === 'triangle') {
          // Triangle using CSS clip-path
          borderRadius = '0';
        }

        elements.push(`
          <div class="floating-shape" style="
            position: absolute;
            left: ${left}%;
            top: 100%;
            width: ${size}px;
            height: ${size}px;
            background: ${config.color || 'rgba(255,255,255,0.1)'};
            border-radius: ${borderRadius};
            ${shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
            animation: floating ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
          "></div>
        `);
      }

      return elements.join('');
    },
  },

  pulse: {
    name: 'Pulsing Background',
    description: 'Subtle background pulsing effect',
    keyframes: `
      @keyframes pulse-bg {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
    `,
    properties: 'animation: pulse-bg 4s ease-in-out infinite;',
    generateElements: () => '',
  },

  bubbles: {
    name: 'Rising Bubbles',
    description: 'Bubbles rising from bottom',
    keyframes: `
      @keyframes bubble-rise {
        0% { transform: translateY(100vh) scale(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) scale(1); opacity: 0; }
      }
    `,
    properties: '',
    generateElements: (config: AnimationConfig) => {
      const count = config.count || 8;
      const elements = [];

      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = config.speed === 'slow' ? 25 : config.speed === 'fast' ? 8 : 15;
        const size = (config.size || 8) + Math.random() * 8;

        elements.push(`
          <div class="bubble" style="
            position: absolute;
            left: ${left}%;
            bottom: -${size}px;
            width: ${size}px;
            height: ${size}px;
            background: ${config.color || 'rgba(255,255,255,0.2)'};
            border-radius: 50%;
            animation: bubble-rise ${duration}s linear infinite;
            animation-delay: ${delay}s;
          "></div>
        `);
      }

      return elements.join('');
    },
  },
};