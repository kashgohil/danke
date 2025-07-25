import { z } from 'zod';

const richTextContentSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.any()).optional(),
});

export const createPostSchema = z.object({
  content: richTextContentSchema,
  mediaUrls: z
    .array(z.string().url())
    .max(5, 'Maximum 5 media files allowed')
    .optional()
    .default([]),
});

export const updatePostSchema = z.object({
  content: richTextContentSchema.optional(),
  mediaUrls: z.array(z.string().url()).optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
export type RichTextContent = z.infer<typeof richTextContentSchema>;
