import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  email: z.string().email('Invalid email address').max(255, 'Email too long'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  email: z.string().email('Invalid email address').max(255, 'Email too long'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name too long')
    .optional(),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
