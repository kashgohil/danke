'use client';

import {
  initPerformanceMonitoring,
  setWebVitalsCallback,
} from '@/lib/performance';
import { useEffect } from 'react';

interface PerformanceProviderProps {
  children: React.ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    initPerformanceMonitoring();

    setWebVitalsCallback((metric) => {
      // In production, you might want to send this to an analytics service
      if (process.env.NODE_ENV === 'development') {
        console.log(`Web Vital - ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
        });
      }

      // Example: Send to analytics service
      // analytics.track('web-vital', {
      //   metric_name: metric.name,
      //   value: metric.value,
      //   rating: metric.rating,
      //   page: window.location.pathname,
      // });
    });
  }, []);

  return <>{children}</>;
}
