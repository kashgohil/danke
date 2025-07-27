export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(label: string): () => void {
    const start = performance.now();

    return () => {
      const end = performance.now();
      const duration = end - start;

      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }

      this.metrics.get(label)!.push(duration);

      const measurements = this.metrics.get(label)!;
      if (measurements.length > 100) {
        measurements.shift();
      }

      if (process.env.NODE_ENV === 'development' && duration > 100) {
        console.warn(
          `Slow operation detected: ${label} took ${duration.toFixed(2)}ms`
        );
      }
    };
  }

  getMetrics(
    label: string
  ): { avg: number; min: number; max: number; count: number } | null {
    const measurements = this.metrics.get(label);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    const avg =
      measurements.reduce((sum, val) => sum + val, 0) / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);

    return { avg, min, max, count: measurements.length };
  }

  getAllMetrics(): Record<
    string,
    { avg: number; min: number; max: number; count: number }
  > {
    const result: Record<
      string,
      { avg: number; min: number; max: number; count: number }
    > = {};

    for (const [label] of this.metrics) {
      const metrics = this.getMetrics(label);
      if (metrics) {
        result[label] = metrics;
      }
    }

    return result;
  }

  clear(): void {
    this.metrics.clear();
  }
}

export const perf = PerformanceMonitor.getInstance();

export function measureAsync<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  const stopTimer = perf.startTimer(label);
  return fn().finally(stopTimer);
}

export function measureSync<T>(label: string, fn: () => T): T {
  const stopTimer = perf.startTimer(label);
  try {
    return fn();
  } finally {
    stopTimer();
  }
}

export function initWebVitals() {
  if (typeof window === 'undefined') return;

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Ignore errors in older browsers
    }
  }

  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        console.log('CLS:', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Ignore errors in older browsers
    }
  }
}

export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  const criticalImages = document.querySelectorAll('img[data-priority="high"]');
  criticalImages.forEach((img) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = (img as HTMLImageElement).src;
    document.head.appendChild(link);
  });

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}
