# Comprehensive Test Suite

This directory contains a complete test suite for the Appreciation Board application, covering all requirements from the specification.

## Test Structure

### Unit Tests for API Endpoints (`/api/`)

#### `boards.test.ts`

- **POST /api/boards**: Tests board creation with authentication, validation, and error handling
- **GET /api/boards/[viewToken]**: Tests board retrieval by view token, including 404 handling
- Covers requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.3, 2.4

#### `posts.test.ts`

- **POST /api/posts**: Tests post creation with content validation and authentication
- **PUT /api/posts/[postId]**: Tests post editing with 10-minute time limit validation
- **DELETE /api/posts/[postId]**: Tests post deletion with creator verification
- Covers requirements: 3.1, 3.2, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6

#### `upload.test.ts`

- **POST /api/upload**: Tests media file upload with type validation, size limits, and authentication
- Supports image, video, and audio formats as specified
- Covers requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6

### Component Tests (`/components/`)

#### `board-creation-form.test.tsx`

- Tests form validation for title and recipient name
- Tests successful board creation and navigation
- Tests loading states and error handling
- Covers requirements: 1.1, 1.2, 1.3, 1.4

#### `post-creation-form.test.tsx`

- Tests rich text editor integration
- Tests media upload functionality
- Tests form validation and submission
- Tests loading states and error handling
- Covers requirements: 3.1, 3.2, 3.4, 3.5, 5.1-5.6, 6.1-6.5

#### `board-view.test.tsx`

- Tests board display with title and recipient
- Tests masonry layout rendering
- Tests post filtering (excluding deleted posts)
- Tests empty state display
- Tests user information display
- Covers requirements: 2.1, 2.2, 2.3, 2.4, 7.1-7.5

### Integration Tests (`/e2e/`)

#### `board-creation.spec.ts`

- End-to-end test for complete board creation flow
- Tests form validation, submission, and navigation
- Tests authentication requirements
- Tests error handling scenarios

#### `post-creation.spec.ts`

- End-to-end test for post creation with media upload
- Tests rich text editing and media attachment
- Tests form validation and error states
- Tests loading states during submission

### Database Operation Tests (`/db/`)

#### `models.test.ts`

- Tests all database operations for User, Board, and Post models
- Tests CRUD operations with proper data validation
- Tests relationship handling between entities
- Tests error scenarios and edge cases
- Covers all database-related requirements

## Test Coverage by Requirement

### Requirement 1: Board Creation

- ✅ API endpoint tests (`boards.test.ts`)
- ✅ Component tests (`board-creation-form.test.tsx`)
- ✅ Integration tests (`board-creation.spec.ts`)
- ✅ Database tests (`models.test.ts`)

### Requirement 2: Board Viewing

- ✅ API endpoint tests (`boards.test.ts`)
- ✅ Component tests (`board-view.test.tsx`)
- ✅ Database tests (`models.test.ts`)

### Requirement 3: Post Creation

- ✅ API endpoint tests (`posts.test.ts`)
- ✅ Component tests (`post-creation-form.test.tsx`)
- ✅ Integration tests (`post-creation.spec.ts`)
- ✅ Database tests (`models.test.ts`)

### Requirement 4: Post Moderation

- ✅ API endpoint tests (`posts.test.ts`)
- ✅ Component tests (`board-view.test.tsx`)
- ✅ Database tests (`models.test.ts`)

### Requirement 5: Media Upload

- ✅ API endpoint tests (`upload.test.ts`)
- ✅ Component tests (`post-creation-form.test.tsx`)
- ✅ Integration tests (`post-creation.spec.ts`)

### Requirement 6: Rich Text Formatting

- ✅ Component tests (`post-creation-form.test.tsx`)
- ✅ Integration tests (`post-creation.spec.ts`)

### Requirement 7: Masonry Layout

- ✅ Component tests (`board-view.test.tsx`)

### Requirement 8: Post Editing

- ✅ API endpoint tests (`posts.test.ts`)
- ✅ Database tests (`models.test.ts`)

## Test Framework Setup

### Vitest Configuration

- Environment: jsdom for DOM testing
- Global test functions enabled
- Path aliases configured for imports
- Setup file for mocking Next.js and Clerk

### Playwright Configuration

- Multi-browser testing (Chrome, Firefox, Safari)
- Local development server integration
- HTML reporting enabled
- Retry configuration for CI/CD

### Mocking Strategy

- **Next.js Router**: Mocked for navigation testing
- **Clerk Authentication**: Mocked for user authentication
- **Database Operations**: Mocked with Vitest mocks
- **File System**: Mocked for upload testing

## Running Tests

```bash
# Run all unit and component tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage

# Run integration tests
bun run test:e2e

# Run integration tests with UI
bun run test:e2e:ui
```

## Test Data Management

### Mock Data

- Consistent test user data across all tests
- Sample board and post data for various scenarios
- Media file mocks for upload testing

### Database Seeding

- Test database setup with clean state
- Isolated test environments
- Proper cleanup after test runs

## Error Scenarios Covered

1. **Authentication Errors**: Unauthorized access attempts
2. **Validation Errors**: Invalid form data and API requests
3. **Network Errors**: Failed API calls and timeouts
4. **File Upload Errors**: Invalid file types and size limits
5. **Database Errors**: Connection issues and constraint violations
6. **Time-based Errors**: Edit time limit exceeded scenarios

## Performance Testing Considerations

While not implemented in this basic suite, the following performance tests should be considered:

1. **Load Testing**: Concurrent user scenarios
2. **Media Upload Performance**: Large file handling
3. **Database Query Optimization**: Query performance under load
4. **Frontend Performance**: Component rendering with large datasets

## Accessibility Testing

Component tests include basic accessibility checks:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast validation

This comprehensive test suite ensures all requirements are thoroughly tested with appropriate coverage for unit, integration, and end-to-end scenarios.
