import React from 'react';

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

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

let webVitalsCallback: ((metric: WebVitalsMetric) => void) | null = null;

export function setWebVitalsCallback(
  callback: (metric: WebVitalsMetric) => void
) {
  webVitalsCallback = callback;
}

export function initWebVitals() {
  if (typeof window === 'undefined') return;

  trackLCP();
  trackFID();
  trackCLS();
  trackFCP();
  trackTTFB();
}

function trackLCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const value = entry.startTime;
        const metric: WebVitalsMetric = {
          name: 'LCP',
          value,
          rating:
            value <= 2500
              ? 'good'
              : value <= 4000
              ? 'needs-improvement'
              : 'poor',
          delta: value,
          id: 'lcp-' + Date.now(),
        };

        perf.startTimer('web-vitals-lcp')();
        webVitalsCallback?.(metric);

        if (process.env.NODE_ENV === 'development') {
          console.log('LCP:', value.toFixed(2) + 'ms', `(${metric.rating})`);
        }
      }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Ignore errors in older browsers
  }
}

function trackFID() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const value = (entry as any).processingStart - entry.startTime;
        const metric: WebVitalsMetric = {
          name: 'FID',
          value,
          rating:
            value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor',
          delta: value,
          id: 'fid-' + Date.now(),
        };

        webVitalsCallback?.(metric);

        if (process.env.NODE_ENV === 'development') {
          console.log('FID:', value.toFixed(2) + 'ms', `(${metric.rating})`);
        }
      }
    });
    observer.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // Ignore errors in older browsers
  }
}

function trackCLS() {
  if (!('PerformanceObserver' in window)) return;

  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }

      const metric: WebVitalsMetric = {
        name: 'CLS',
        value: clsValue,
        rating:
          clsValue <= 0.1
            ? 'good'
            : clsValue <= 0.25
            ? 'needs-improvement'
            : 'poor',
        delta: clsValue,
        id: 'cls-' + Date.now(),
      };

      webVitalsCallback?.(metric);

      if (process.env.NODE_ENV === 'development') {
        console.log('CLS:', clsValue.toFixed(3), `(${metric.rating})`);
      }
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // Ignore errors in older browsers
  }
}

function trackFCP() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const value = entry.startTime;
        const metric: WebVitalsMetric = {
          name: 'FCP',
          value,
          rating:
            value <= 1800
              ? 'good'
              : value <= 3000
              ? 'needs-improvement'
              : 'poor',
          delta: value,
          id: 'fcp-' + Date.now(),
        };

        webVitalsCallback?.(metric);

        if (process.env.NODE_ENV === 'development') {
          console.log('FCP:', value.toFixed(2) + 'ms', `(${metric.rating})`);
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    // Ignore errors in older browsers
  }
}

function trackTTFB() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  try {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    if (navigation) {
      const value = navigation.responseStart - navigation.requestStart;
      const metric: WebVitalsMetric = {
        name: 'TTFB',
        value,
        rating:
          value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor',
        delta: value,
        id: 'ttfb-' + Date.now(),
      };

      webVitalsCallback?.(metric);

      if (process.env.NODE_ENV === 'development') {
        console.log('TTFB:', value.toFixed(2) + 'ms', `(${metric.rating})`);
      }
    }
  } catch (e) {
    // Ignore errors in older browsers
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

export function withPerformanceTracking<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return function PerformanceTrackedComponent(props: T) {
    const stopTimer = perf.startTimer(`component-render-${componentName}`);

    React.useEffect(() => {
      stopTimer();
    });

    return React.createElement(Component, props);
  };
}

export function trackApiCall<T>(
  apiName: string,
  apiCall: () => Promise<T>
): Promise<T> {
  return measureAsync(`api-${apiName}`, apiCall);
}

export function trackDbQuery<T>(
  queryName: string,
  query: () => Promise<T>
): Promise<T> {
  return measureAsync(`db-${queryName}`, query);
}

export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined') {
    initWebVitals();
    optimizeImageLoading();

    window.addEventListener('load', () => {
      const stopTimer = perf.startTimer('page-load');
      stopTimer();
    });

    if (process.env.NODE_ENV === 'development') {
      setInterval(() => {
        const metrics = perf.getAllMetrics();
        if (Object.keys(metrics).length > 0) {
          console.group('Performance Metrics');
          Object.entries(metrics).forEach(([label, data]) => {
            console.log(
              `${label}: avg ${data.avg.toFixed(2)}ms (${data.count} samples)`
            );
          });
          console.groupEnd();
        }
      }, 30000); // Every 30 seconds
    }
  }
}
