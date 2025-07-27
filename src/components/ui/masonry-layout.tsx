'use client';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MasonryLayoutProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  minColumnWidth?: number;
}

export function MasonryLayout({
  children,
  className,
  gap = 24,
  minColumnWidth = 280,
}: MasonryLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateColumns = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newColumns = Math.max(
        1,
        Math.floor((containerWidth + gap) / (minColumnWidth + gap))
      );
      if (newColumns !== columns) {
        setColumns(newColumns);
      }
    }
  }, [gap, minColumnWidth, columns]);

  const debouncedUpdateColumns = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(updateColumns, 150);
  }, [updateColumns]);

  useEffect(() => {
    updateColumns();

    const resizeObserver = new ResizeObserver(debouncedUpdateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [updateColumns, debouncedUpdateColumns]);

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div
      ref={containerRef}
      className={cn('w-full', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        alignItems: 'start',
        willChange: 'transform',
      }}
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="w-full"
          style={{
            breakInside: 'avoid',
            transform: 'translateZ(0)', // Force hardware acceleration
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
