#!/usr/bin/env bun

import { measureAsync, measureSync, perf } from '../src/lib/performance';

async function testPerformanceMonitoring() {
  console.log('🚀 Testing Performance Monitoring System\n');

  // Test sync operations
  console.log('Testing sync operations...');
  for (let i = 0; i < 5; i++) {
    measureSync('sync-operation', () => {
      let sum = 0;
      for (let j = 0; j < 100000; j++) {
        sum += j;
      }
      return sum;
    });
  }

  // Test async operations
  console.log('Testing async operations...');
  for (let i = 0; i < 3; i++) {
    await measureAsync('async-operation', async () => {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
      return 'completed';
    });
  }

  // Test database simulation
  console.log('Testing database operations...');
  for (let i = 0; i < 4; i++) {
    await measureAsync('db-query', async () => {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
      return { id: i, data: `record-${i}` };
    });
  }

  // Test API simulation
  console.log('Testing API operations...');
  for (let i = 0; i < 3; i++) {
    await measureAsync('api-call', async () => {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 200));
      return { status: 'success', data: `api-response-${i}` };
    });
  }

  // Display results
  console.log('\n📊 Performance Metrics:');
  console.log('========================');

  const metrics = perf.getAllMetrics();
  Object.entries(metrics).forEach(([label, data]) => {
    console.log(`${label}:`);
    console.log(`  Average: ${data.avg.toFixed(2)}ms`);
    console.log(`  Min: ${data.min.toFixed(2)}ms`);
    console.log(`  Max: ${data.max.toFixed(2)}ms`);
    console.log(`  Count: ${data.count}`);
    console.log('');
  });

  console.log('✅ Performance monitoring test completed!');
}

testPerformanceMonitoring().catch(console.error);
