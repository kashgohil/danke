import { db, users } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function getCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  // Try to find user in our database
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, clerkUser.id))
    .limit(1);

  // If user doesn't exist in our DB, create them
  if (!dbUser) {
    const [newUser] = await db
      .insert(users)
      .values({
        id: clerkUser.id,
        name:
          `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
          'Anonymous',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        avatarUrl: clerkUser.imageUrl,
      })
      .returning();

    return newUser;
  }

  // Update user info if it has changed
  if (
    dbUser.name !==
      `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
    dbUser.email !== clerkUser.emailAddresses[0]?.emailAddress ||
    dbUser.avatarUrl !== clerkUser.imageUrl
  ) {
    const [updatedUser] = await db
      .update(users)
      .set({
        name:
          `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
          'Anonymous',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        avatarUrl: clerkUser.imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, clerkUser.id))
      .returning();

    return updatedUser;
  }

  return dbUser;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}
