'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newColumns = Math.max(
          1,
          Math.floor((containerWidth + gap) / (minColumnWidth + gap))
        );
        setColumns(newColumns);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [gap, minColumnWidth]);

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
      }}
    >
      {childrenArray.map((child, index) => (
        <div key={index} className="w-full">
          {child}
        </div>
      ))}
    </div>
  );
}
