'use client';

import { cn } from '@/lib/utils';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface MasonryLayoutProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  minColumnWidth?: number;
}

interface ItemPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function MasonryLayout({
  children,
  className,
  gap = 24,
  minColumnWidth = 280,
}: MasonryLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [itemPositions, setItemPositions] = useState<ItemPosition[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const childrenArray = Array.isArray(children) ? children : [children];

  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const newColumns = Math.max(
      1,
      Math.min(3, Math.floor((containerWidth + gap) / (minColumnWidth + gap)))
    );

    const columnWidth = (containerWidth - gap * (newColumns - 1)) / newColumns;
    const columnHeights = new Array(newColumns).fill(0);
    const positions: ItemPosition[] = [];

    itemRefs.current.forEach((itemRef, index) => {
      if (!itemRef) return;

      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      // Calculate position
      const x = shortestColumnIndex * (columnWidth + gap);
      const y = columnHeights[shortestColumnIndex];

      // Get the actual height of the item
      const itemHeight = itemRef.offsetHeight;

      positions[index] = {
        x,
        y,
        width: columnWidth,
        height: itemHeight,
      };

      // Update column height
      columnHeights[shortestColumnIndex] += itemHeight + gap;
    });

    setItemPositions(positions);
    setContainerHeight(Math.max(...columnHeights) - gap);
  }, [gap, minColumnWidth]);

  const debouncedCalculateLayout = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(calculateLayout, 150);
  }, [calculateLayout]);

  // Initial layout calculation
  useLayoutEffect(() => {
    const timer = setTimeout(calculateLayout, 100);
    return () => clearTimeout(timer);
  }, [calculateLayout, childrenArray.length]);

  // Resize observer for container
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(debouncedCalculateLayout);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [debouncedCalculateLayout]);

  // Intersection observer to recalculate when items change size
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((itemRef) => {
      if (!itemRef) return;

      const observer = new IntersectionObserver(
        () => {
          // Recalculate layout when items become visible or change
          setTimeout(calculateLayout, 50);
        },
        { threshold: 0.1 }
      );

      observer.observe(itemRef);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [calculateLayout, childrenArray.length]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full relative', className)}
      style={{
        height: containerHeight || 'auto',
        minHeight: containerHeight || 'auto',
      }}
    >
      {childrenArray.map((child, index) => {
        const position = itemPositions[index];

        return (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: position?.x || 0,
              top: position?.y || 0,
              width: position?.width || '100%',
              transform: 'translateZ(0)', // Force hardware acceleration
              opacity: position ? 1 : 0,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
