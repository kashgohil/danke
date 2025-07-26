import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterEach, vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    user: {
      id: 'test-user-id',
      firstName: 'Test',
      lastName: 'User',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
      imageUrl: 'https://example.com/avatar.jpg',
    },
    isLoaded: true,
    isSignedIn: true,
  }),
  useAuth: () => ({
    userId: 'test-user-id',
    isLoaded: true,
    isSignedIn: true,
    signOut: vi.fn(),
  }),
  SignInButton: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
  SignUpButton: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
  UserButton: () => React.createElement('div', {}, 'User Button'),
  ClerkProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', {}, children),
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});
