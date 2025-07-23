import { db, users, type NewUser, type User } from '@/lib/db';
import { eq } from 'drizzle-orm';

export class UserModel {
  static async findById(id: string): Promise<User | null> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      return user || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Failed to find user');
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      return user || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user');
    }
  }

  static async create(userData: NewUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values({
          ...userData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  static async update(
    id: string,
    userData: Partial<Omit<User, 'id' | 'createdAt'>>
  ): Promise<User> {
    try {
      const [user] = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await db.delete(users).where(eq(users.id, id));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  static async syncWithClerk(clerkUser: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
    imageUrl?: string;
  }): Promise<User> {
    try {
      const existingUser = await this.findById(clerkUser.id);

      const userData = {
        id: clerkUser.id,
        name:
          `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
          'Anonymous',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        avatarUrl: clerkUser.imageUrl || null,
      };

      if (!existingUser) {
        return await this.create(userData);
      }

      // Check if user data has changed
      const hasChanged =
        existingUser.name !== userData.name ||
        existingUser.email !== userData.email ||
        existingUser.avatarUrl !== userData.avatarUrl;

      if (hasChanged) {
        return await this.update(clerkUser.id, {
          name: userData.name,
          email: userData.email,
          avatarUrl: userData.avatarUrl,
        });
      }

      return existingUser;
    } catch (error) {
      console.error('Error syncing user with Clerk:', error);
      throw new Error('Failed to sync user');
    }
  }
}
