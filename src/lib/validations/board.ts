import { z } from 'zod';

export const boardSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, 'Board title is required')
    .max(255, 'Title too long'),
  recipientName: z
    .string()
    .min(1, 'Recipient name is required')
    .max(255, 'Recipient name too long'),
  creatorId: z.string().min(1, 'Creator ID is required'),
  viewToken: z.string().min(1, 'View token is required'),
  postToken: z.string().min(1, 'Post token is required'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createBoardSchema = z.object({
  title: z
    .string()
    .min(1, 'Board title is required')
    .max(255, 'Title too long'),
  recipientName: z
    .string()
    .min(1, 'Recipient name is required')
    .max(255, 'Recipient name too long'),
});

export const updateBoardSchema = z.object({
  title: z
    .string()
    .min(1, 'Board title is required')
    .max(255, 'Title too long')
    .optional(),
  recipientName: z
    .string()
    .min(1, 'Recipient name is required')
    .max(255, 'Recipient name too long')
    .optional(),
});

export type BoardSchema = z.infer<typeof boardSchema>;
export type CreateBoardSchema = z.infer<typeof createBoardSchema>;
export type UpdateBoardSchema = z.infer<typeof updateBoardSchema>;
