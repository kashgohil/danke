# Performance Monitoring Setup

This document outlines the comprehensive performance monitoring system that has been implemented across the platform.

## Overview

The performance monitoring system provides:

- Real-time performance tracking for API calls, database queries, and component renders
- Web Vitals monitoring (LCP, FID, CLS, FCP, TTFB)
- Development dashboard for monitoring performance metrics
- Automated performance testing and alerts

## Components

### 1. Core Performance Library (`src/lib/performance.ts`)

**PerformanceMonitor Class:**

- Singleton pattern for consistent monitoring across the app
- Tracks timing metrics with automatic cleanup (keeps last 100 measurements)
- Provides statistical analysis (avg, min, max, count)
- Development warnings for slow operations (>100ms)

**Key Functions:**

- `measureSync(label, fn)` - Track synchronous operations
- `measureAsync(label, fn)` - Track asynchronous operations
- `trackApiCall(name, apiCall)` - Specialized API call tracking
- `trackDbQuery(name, query)` - Specialized database query tracking

**Web Vitals Tracking:**

- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)
- Time to First Byte (TTFB)

### 2. Performance Provider (`src/components/ui/performance-provider.tsx`)

Client-side initialization component that:

- Initializes performance monitoring on app startup
- Sets up Web Vitals callbacks
- Handles performance data collection
- Only active in development mode

### 3. Performance Dashboard (`src/components/ui/performance-dashboard.tsx`)

Development-only dashboard that displays:

- Real-time performance metrics
- Color-coded performance indicators (green/yellow/red)
- Refresh and clear functionality
- Auto-refresh every 5 seconds
- Sortable metrics by average time

### 4. Integration Points

**API Routes:**

- All API routes wrapped with `trackApiCall()`
- Automatic performance tracking for:
  - Board creation/retrieval
  - Post creation/retrieval
  - File uploads

**Database Models:**

- All database operations wrapped with `trackDbQuery()`
- Tracks performance for:
  - Board CRUD operations
  - Post CRUD operations
  - User operations

**React Components:**

- Key components include performance tracking
- Conditional tracking (disabled in test environment)
- Tracks component render times

## Usage

### Basic Tracking

```typescript
import { measureSync, measureAsync, perf } from '@/lib/performance';

// Sync operation
const result = measureSync('my-operation', () => {
  // Your synchronous code here
  return someValue;
});

// Async operation
const result = await measureAsync('my-async-operation', async () => {
  // Your asynchronous code here
  return await someAsyncValue;
});

// Get metrics
const metrics = perf.getMetrics('my-operation');
console.log(`Average: ${metrics.avg}ms`);
```

### API Tracking

```typescript
import { trackApiCall } from '@/lib/performance';

export async function POST(request: NextRequest) {
  return trackApiCall('my-api-endpoint', async () => {
    // Your API logic here
    return NextResponse.json(result);
  });
}
```

### Database Tracking

```typescript
import { trackDbQuery } from '@/lib/performance';

static async create(data: any): Promise<Model> {
  return trackDbQuery('model-create', async () => {
    // Your database query here
    return await db.insert(table).values(data).returning();
  });
}
```

## Development Features

### Performance Dashboard

The dashboard appears in the bottom-right corner during development and shows:

- All tracked operations with their metrics
- Performance ratings (good/needs-improvement/poor)
- Real-time updates
- Manual refresh and clear options

### Console Logging

In development mode, the system automatically logs:

- Slow operations (>100ms) with warnings
- Web Vitals measurements with ratings
- Periodic performance summaries (every 30 seconds)

### Testing

Run performance tests:

```bash
bun run test:performance
```

Run specific performance tests:

```bash
bun run test src/test/performance.test.ts
```

## Performance Thresholds

**Web Vitals Thresholds:**

- LCP: Good ≤2.5s, Needs Improvement ≤4s, Poor >4s
- FID: Good ≤100ms, Needs Improvement ≤300ms, Poor >300ms
- CLS: Good ≤0.1, Needs Improvement ≤0.25, Poor >0.25
- FCP: Good ≤1.8s, Needs Improvement ≤3s, Poor >3s
- TTFB: Good ≤800ms, Needs Improvement ≤1.8s, Poor >1.8s

**Operation Thresholds:**

- Slow operation warning: >100ms
- Dashboard color coding:
  - Green: <500ms
  - Yellow: 500ms-1000ms
  - Red: >1000ms

## Scripts

- `bun run test:performance` - Run performance monitoring tests
- Performance dashboard automatically available in development mode

## Files Modified/Created

**New Files:**

- `src/lib/performance.ts` - Core performance monitoring library
- `src/components/ui/performance-provider.tsx` - Client-side initialization
- `src/components/ui/performance-dashboard.tsx` - Development dashboard
- `scripts/test-performance.ts` - Performance testing script
- `PERFORMANCE_SETUP.md` - This documentation

**Modified Files:**

- `src/app/layout.tsx` - Added performance provider and dashboard
- `src/app/api/boards/route.ts` - Added API tracking
- `src/app/api/posts/route.ts` - Added API tracking
- `src/app/api/upload/route.ts` - Added API tracking
- `src/lib/models/board.ts` - Added database query tracking
- `src/lib/models/post.ts` - Added database query tracking
- `src/components/boards/board-view.tsx` - Added component tracking
- `src/components/posts/post-creation-form.tsx` - Added component tracking
- `src/test/performance.test.ts` - Enhanced performance tests
- `package.json` - Added performance test script

## Best Practices

1. **Use Descriptive Labels:** Always use clear, descriptive labels for tracking
2. **Track Critical Paths:** Focus on user-facing operations and bottlenecks
3. **Monitor in Development:** Use the dashboard to identify performance issues early
4. **Test Performance:** Include performance tests in your CI/CD pipeline
5. **Conditional Tracking:** Disable tracking in test environments to avoid interference

## Future Enhancements

Potential improvements to consider:

- Integration with external monitoring services (DataDog, New Relic)
- Performance budgets and automated alerts
- Historical performance data storage
- Performance regression detection
- User-specific performance tracking
- Mobile performance monitoring
