# Danke - Appreciation Board Platform

A modern Next.js web application for creating and sharing beautiful appreciation boards. Collect heartfelt messages, memories, and celebrations from your community with rich media support and elegant layouts.

## Features

### Board Creation & Management

- **14 Board Types**: Appreciation, Birthday, Farewell, Welcome, Congratulations, Get Well Soon, Sympathy, Holiday, Anniversary, Retirement, Graduation, Baby Shower, Wedding, and General boards
- **Multi-step Board Creation**: Guided setup with basic info, type configuration, and board settings
- **Flexible Posting Modes**: Single post per user or multiple posts allowed
- **Privacy Controls**: Public/private boards with expiration dates and domain/email restrictions
- **Board Editing**: Update board settings, visibility, and configuration after creation
- **Moderation Tools**: Optional content moderation and anonymous posting controls

### Advanced Moderation System

- **Moderation Dashboard**: Comprehensive overview of posts requiring attention
- **Post Status Management**: Approve, reject, or request changes to posts
- **Moderator Management**: Add/remove moderators with granular permissions
- **Scheduled Deletion**: Schedule posts for automatic deletion
- **Content Review**: Track updated posts pending review
- **Moderation Notifications**: Real-time alerts for moderation actions

### Rich Content & Media

- **Rich Text Editor**: Tiptap-powered editor with formatting, colors, and styling
- **Emoji Support**: Built-in emoji picker with GitHub's complete emoji set for expressive messaging
- **Advanced Media Upload**: Support for images (2MB), videos (10MB), and audio files (5MB)
- **Media Carousel**: Beautiful display of multiple media files per post
- **Drag & Drop Upload**: Intuitive file upload with progress indicators
- **Media Preview**: Image, video, and audio preview with carousel display
- **Masonry Layout**: Responsive Pinterest-style layout for posts

### User Experience & Notifications

- **Secure Authentication**: Clerk-powered authentication with social login support
- **Notification System**: Alerts for post approvals, rejections, and moderation actions
- **Post Editing**: Edit posts within 10 minutes of creation with moderation workflow
- **Responsive Design**: Beautiful UI that works on all devices
- **User Dashboard**: Manage your boards and posts from a central location
- **Performance Monitoring**: Real-time performance metrics in development mode

### Sharing & Access Control

- **Dual Token System**: Separate view and post links for different access levels
- **Advanced Privacy Controls**: Domain restrictions, email allowlists/blocklists
- **Anonymous Posting**: Optional anonymous contributions with custom names
- **User Limits**: Configurable maximum posts per user
- **Board Permissions**: Fine-grained control over who can view and contribute
- **Moderator Roles**: Separate permissions for board creators and moderators

### System Monitoring & Status

- **Status Page**: Real-time system health monitoring and uptime tracking
- **Service Status**: Monitor web app, API, database, storage, and CDN performance
- **RSS Feed**: Subscribe to status updates and incident notifications
- **Performance Dashboard**: Development-mode performance metrics tracking
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

## Tech Stack

- **Frontend**: Next.js 15 with App Router and React 19
- **Database**: PostgreSQL with Drizzle ORM and advanced indexing
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Authentication**: Clerk Authentication with user synchronization
- **Rich Text**: Tiptap editor with extensions and custom styling
- **Media Storage**: Vercel Blob Storage with multi-format support
- **Notifications**: Real-time notification system with database persistence
- **Moderation**: Advanced content moderation with workflow management
- **Testing**: Vitest + Playwright for unit and E2E testing
- **Performance**: Optimized with caching, database indexing, and monitoring
- **Error Handling**: Comprehensive error boundaries and API error management

## Getting Started

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- **PostgreSQL** database
- **Clerk** account (free at https://clerk.com)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kashgohil/danke.git
   cd danke
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up Clerk Authentication**

   - Go to https://dashboard.clerk.com/
   - Create a new application
   - Copy your publishable key and secret key

4. **Set up Vercel Blob Storage**

   - Go to your Vercel dashboard
   - Navigate to Storage > Blob
   - Create a new Blob store or use an existing one
   - Copy the read/write token

5. **Configure environment variables**

   Create `.env.local` with your database URL, Clerk keys, and Blob token:

   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-key-here"
   CLERK_SECRET_KEY="sk_test_your-key-here"
   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_your-token-here"
   ```

6. **Set up the database**

   ```bash
   bun run db:generate
   bun run db:migrate
   ```

7. **Start the development server**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

8. **Start the development server**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

### Database

- `bun run db:generate` - Generate migration files
- `bun run db:migrate` - Run migrations
- `bun run db:studio` - Open Drizzle Studio

### Testing

- `bun run test` - Run unit tests with Vitest
- `bun run test:run` - Run tests once
- `bun run test:ui` - Run tests with UI
- `bun run test:e2e` - Run E2E tests with Playwright
- `bun run test:e2e:ui` - Run E2E tests with UI
- `bun run test:performance` - Run performance tests and benchmarks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── boards/        # Board management APIs
│   │   ├── posts/         # Post management APIs
│   │   ├── notifications/ # Notification APIs
│   │   ├── upload/        # Media upload APIs
│   │   └── status/        # System status APIs
│   ├── boards/            # Board-related pages
│   ├── create-board/      # Board creation flow
│   ├── dashboard/         # User dashboard
│   ├── status/            # System status page
│   └── ...
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── boards/           # Board-related components
│   │   ├── moderation-dashboard.tsx
│   │   ├── moderator-management.tsx
│   │   └── board-config-update.tsx
│   ├── posts/            # Post-related components
│   │   ├── post-edit-dialog.tsx
│   │   └── post-moderation-controls.tsx
│   └── ui/               # Reusable UI components
│       ├── notification-bell.tsx
│       ├── notifications-drawer.tsx
│       ├── media-upload.tsx
│       ├── performance-dashboard.tsx
│       └── masonry-layout.tsx
├── hooks/                # Custom React hooks
│   ├── use-notifications.ts
│   └── use-multi-step-form.ts
├── lib/                  # Utility functions and configurations
│   ├── db/              # Database schema and connection
│   ├── models/          # Data models and business logic
│   │   ├── board.ts
│   │   ├── post.ts
│   │   ├── moderator.ts
│   │   └── user.ts
│   ├── validations/     # Zod validation schemas
│   ├── notifications.ts # Notification service
│   ├── moderation.ts    # Moderation utilities
│   ├── board-access.ts  # Access control logic
│   └── performance.ts   # Performance monitoring
├── test/                 # Test files
│   ├── api/             # API tests
│   ├── components/      # Component tests
│   ├── e2e/             # End-to-end tests
│   ├── integration/     # Integration tests
│   └── performance.test.ts
└── types/               # TypeScript type definitions
```

## Key Features in Detail

### Board Types

The application supports 14 different board types, each with:

- Custom icons and descriptions
- Automatic title generation
- Type-specific configurations
- Flexible name formatting (first name, full name, nickname)

### Multi-step Form System

- **Step 1**: Basic information (name, board type, title)
- **Step 2**: Type-specific configuration
- **Step 3**: Board settings (privacy, moderation, limits, access controls)

### Advanced Moderation Workflow

- **Three-tier Moderation**: Approved, pending, and change-requested states
- **Moderator Dashboard**: Visual overview of posts needing attention
- **Bulk Actions**: Mark multiple posts for review or deletion
- **Notification Integration**: Automatic alerts for moderation actions
- **Scheduled Deletion**: Set posts to be automatically removed
- **Edit Tracking**: Monitor when posts are updated after initial submission

### Media System

- **Vercel Blob Storage**: Secure, scalable cloud storage for all media files
- **File Size Limits**: Images (2MB max), videos (10MB max), audio (5MB max)
- **Drag-and-Drop Upload**: Intuitive file upload with progress indicators
- **Media Preview**: Image, video, and audio preview with carousel display
- **Supported Formats**: JPEG, PNG, WebP, GIF, MP4, WebM, MP3, WAV, OGG
- **Upload Progress**: Real-time upload progress with error handling

### Notification System

- **Real-time Notifications**: Instant alerts for moderation actions
- **Notification Bell**: Visual indicator with unread count
- **Notification Drawer**: Slide-out panel with notification history
- **Mark as Read**: Individual and bulk mark-as-read functionality
- **Persistent Storage**: Notifications stored in database for reliability

### Privacy & Access Control

- **Domain Restrictions**: Allow/block specific email domains
- **Email Lists**: Granular control with allowed/blocked email addresses
- **Board Visibility**: Public, private, and restricted access modes
- **Expiration Dates**: Automatic board closure after specified date
- **Moderator Permissions**: Separate access levels for creators and moderators

### Performance Optimizations

- **Database Indexing**: Optimized queries with composite indexes
- **Caching Strategies**: Intelligent caching for frequently accessed data
- **Performance Monitoring**: Real-time metrics tracking in development
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Lazy Loading**: Optimized component loading and code splitting

## Authentication

The app uses Clerk for comprehensive authentication:

- **Multiple Sign-in Methods**: Email/password, Google, GitHub, and more
- **User Management**: Built-in user dashboard and profile management
- **Session Management**: Secure session handling with automatic refresh
- **Middleware Protection**: Route-level authentication guards
- **Database Sync**: Automatic user synchronization between Clerk and PostgreSQL

## API Documentation

The application provides comprehensive RESTful APIs for:

- **Boards**: CRUD operations, permissions management, moderation settings
- **Posts**: Create, read, update, delete posts with moderation workflow
- **Moderation**: Post approval, rejection, and status management
- **Moderators**: Add/remove moderators, permission management
- **Notifications**: Real-time notification delivery and management
- **Users**: User data and board relationships
- **Media**: File upload and management with progress tracking
- **Authentication**: User verification and session management
- **Status**: System health monitoring and uptime tracking

API documentation is available in the `docs/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`bun run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
