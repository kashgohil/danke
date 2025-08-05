# Danke - Appreciation Board Platform

A modern Next.js web application for creating and sharing beautiful appreciation boards. Collect heartfelt messages, memories, and celebrations from your community with rich media support and elegant layouts.

## Features

### Board Creation & Management

- **14 Board Types**: Appreciation, Birthday, Farewell, Welcome, Congratulations, Get Well Soon, Sympathy, Holiday, Anniversary, Retirement, Graduation, Baby Shower, Wedding, and General boards
- **Multi-step Board Creation**: Guided setup with basic info, type configuration, and board settings
- **Flexible Posting Modes**: Single post per user or multiple posts allowed
- **Privacy Controls**: Public/private boards with expiration dates
- **Moderation Tools**: Optional content moderation and anonymous posting controls

### Rich Content & Media

- **Rich Text Editor**: Tiptap-powered editor with formatting, colors, and styling
- **Media Uploads**: Support for images, videos, audio files, and GIFs
- **Media Carousel**: Beautiful display of multiple media files per post
- **Masonry Layout**: Responsive Pinterest-style layout for posts

### User Experience

- **Secure Authentication**: Clerk-powered authentication with social login support
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Live updates as new posts are added
- **User Dashboard**: Manage your boards and posts from a central location
- **Post Management**: Edit posts within 10 minutes of creation

### Sharing & Access Control

- **Dual Token System**: Separate view and post links for different access levels
- **Anonymous Posting**: Optional anonymous contributions
- **User Limits**: Configurable maximum posts per user
- **Board Permissions**: Fine-grained control over who can view and contribute

## Tech Stack

- **Frontend**: Next.js 15 with App Router and React 19
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Authentication**: Clerk Authentication
- **Rich Text**: Tiptap editor with extensions
- **Media Handling**: File upload with preview and carousel components
- **Testing**: Vitest + Playwright for unit and E2E testing
- **Performance**: Optimized with caching and database indexing

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

4. **Configure environment variables**

   Create `.env.local` with your database URL and Clerk keys:

   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-key-here"
   CLERK_SECRET_KEY="sk_test_your-key-here"
   ```

5. **Set up the database**

   ```bash
   bun run db:generate
   bun run db:migrate
   ```

6. **Start the development server**

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
- `bun run test:performance` - Run performance tests

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── boards/            # Board-related pages
│   ├── create-board/      # Board creation flow
│   ├── dashboard/         # User dashboard
│   └── ...
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── boards/           # Board-related components
│   ├── posts/            # Post-related components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── db/              # Database schema and connection
│   ├── models/          # Data models and business logic
│   ├── validations/     # Zod validation schemas
│   └── ...
├── test/                 # Test files
│   ├── api/             # API tests
│   ├── components/      # Component tests
│   ├── e2e/             # End-to-end tests
│   └── ...
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
- **Step 3**: Board settings (privacy, moderation, limits)

### Media System

- File upload with drag-and-drop support
- Image, video, and audio preview
- Media carousel for multiple files
- Optimized storage and delivery

### Performance Optimizations

- Database indexing for fast queries
- Caching strategies for frequently accessed data
- Optimized component rendering
- Performance monitoring and testing

## Authentication

The app uses Clerk for comprehensive authentication:

- **Multiple Sign-in Methods**: Email/password, Google, GitHub, and more
- **User Management**: Built-in user dashboard and profile management
- **Session Management**: Secure session handling with automatic refresh
- **Middleware Protection**: Route-level authentication guards
- **Database Sync**: Automatic user synchronization between Clerk and PostgreSQL

## API Documentation

The application provides RESTful APIs for:

- **Boards**: CRUD operations, permissions management
- **Posts**: Create, read, update, delete posts
- **Users**: User data and board relationships
- **Media**: File upload and management
- **Authentication**: User verification and session management

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
