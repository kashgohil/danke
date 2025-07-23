import { currentUser } from '@clerk/nextjs/server';
import { UserModel } from './models/user';

export async function getCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  try {
    return await UserModel.syncWithClerk(clerkUser);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
