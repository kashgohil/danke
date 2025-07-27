'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { perf } from '@/lib/performance';
import { BarChart3, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  [key: string]: {
    avg: number;
    min: number;
    max: number;
    count: number;
  };
}

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  const refreshMetrics = () => {
    setMetrics(perf.getAllMetrics());
  };

  const clearMetrics = () => {
    perf.clear();
    setMetrics({});
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      refreshMetrics();

      const interval = setInterval(refreshMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!isVisible) return null;

  const sortedMetrics = Object.entries(metrics).sort(
    ([, a], [, b]) => b.avg - a.avg
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 max-h-96 overflow-hidden shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Performance Metrics
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshMetrics}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMetrics}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="max-h-64 overflow-y-auto space-y-2">
            {sortedMetrics.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No metrics available
              </p>
            ) : (
              sortedMetrics.map(([label, data]) => (
                <div key={label} className="text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium truncate" title={label}>
                      {label}
                    </span>
                    <span className="text-gray-500">({data.count})</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Avg: {data.avg.toFixed(1)}ms</span>
                    <span>Min: {data.min.toFixed(1)}ms</span>
                    <span>Max: {data.max.toFixed(1)}ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className={`h-1 rounded-full ${
                        data.avg > 1000
                          ? 'bg-red-500'
                          : data.avg > 500
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${Math.min((data.avg / 2000) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
