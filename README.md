# Appreciation Board

A Next.js web application for creating and sharing appreciation boards, similar to KudoBoard.

## Features

- Create appreciation boards for people or occasions
- Share view and post links with different access levels
- Rich text editor with formatting options
- Media uploads (images, videos, audio, GIFs)
- Masonry layout for posts
- User authentication and moderation with Clerk
- Time-limited post editing (10 minutes)

## Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Authentication**: Clerk Authentication
- **Rich Text**: Tiptap editor

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Clerk account (free at https://clerk.com)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up Clerk Authentication:

   - Go to https://dashboard.clerk.com/
   - Create a new application
   - Copy your publishable key and secret key

4. Set up environment variables:
   Update `.env.local` with your database URL and Clerk keys:

   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-key-here"
   CLERK_SECRET_KEY="sk_test_your-key-here"
   ```

5. Generate and run database migrations:

   ```bash
   bun run db:generate
   bun run db:migrate
   ```

6. Start the development server:
   ```bash
   bun run dev
   ```

### Database Commands

- `bun run db:generate` - Generate migration files
- `bun run db:migrate` - Run migrations
- `bun run db:studio` - Open Drizzle Studio

## Authentication

This app uses Clerk for authentication, which provides:

- Email/password authentication
- Social login (Google, GitHub, etc.)
- User management dashboard
- Session management
- Security features

Users are automatically synced between Clerk and our database when they sign in.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── sign-in/        # Clerk sign-in page
│   ├── sign-up/        # Clerk sign-up page
│   └── ...
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
│   ├── db/             # Database schema and connection
│   ├── auth.ts         # Clerk integration utilities
│   └── utils.ts        # General utilities
├── middleware.ts        # Clerk middleware for route protection
└── drizzle/            # Database migrations
```

## Development Status

✅ Project foundation and database schema setup
✅ Clerk authentication integration
⏳ User authentication system (API endpoints - next task)

## License

MIT
