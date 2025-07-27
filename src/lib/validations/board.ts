import { z } from 'zod';

// Extended board schema with new multi-step fields
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
  // New multi-step fields
  boardType: z.enum(['appreciation', 'birthday', 'farewell', 'general']),
  nameType: z.enum(['first-name', 'full-name', 'nickname']),
  postingMode: z.enum(['single', 'multiple']),
  moderationEnabled: z.boolean(),
  allowAnonymous: z.boolean(),
  maxPostsPerUser: z.string().nullable(),
  boardVisibility: z.enum(['public', 'private']),
  expirationDate: z.date().nullable(),
  typeConfig: z.record(z.string(), z.unknown()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Legacy create board schema (for backward compatibility)
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

// Multi-step board creation schema
export const createMultiStepBoardSchema = z.object({
  // Basic info (Step 1)
  title: z
    .string()
    .min(1, 'Board title is required')
    .max(255, 'Title too long'),
  recipientName: z
    .string()
    .min(1, 'Recipient name is required')
    .max(255, 'Recipient name too long'),
  boardType: z.enum(['appreciation', 'birthday', 'farewell', 'general']),
  nameType: z.enum(['first-name', 'full-name', 'nickname']),

  // Board configuration (Step 3)
  postingMode: z.enum(['single', 'multiple']),
  moderationEnabled: z.boolean().default(false),
  allowAnonymous: z.boolean().default(true),
  maxPostsPerUser: z
    .string()
    .regex(/^\d+$/, 'Must be a valid number')
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),
  boardVisibility: z.enum(['public', 'private']).default('public'),
  expirationDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional()
    .nullable(),

  // Type-specific configuration (Step 2) - stored as JSON
  typeConfig: z.record(z.string(), z.unknown()).optional(),
});

// Step-specific validation schemas
export const basicInfoStepSchema = z.object({
  boardType: z.enum(['appreciation', 'birthday', 'farewell', 'general']),
  recipientName: z
    .string()
    .min(1, 'Recipient name is required')
    .max(255, 'Recipient name too long'),
  nameType: z.enum(['first-name', 'full-name', 'nickname']),
  title: z
    .string()
    .min(1, 'Board title is required')
    .max(255, 'Title too long')
    .optional(), // Auto-generated but can be customized
});

export const typeConfigStepSchema = z.object({
  // Appreciation-specific
  appreciationTheme: z
    .enum(['professional', 'casual', 'celebration'])
    .optional(),
  showContributorNames: z.boolean().optional(),

  // Birthday-specific
  birthdayDate: z.string().date().optional(),
  ageDisplay: z.enum(['show', 'hide', 'milestone-only']).optional(),

  // Farewell-specific
  farewellType: z
    .enum(['retirement', 'job-change', 'relocation', 'other'])
    .optional(),
  lastWorkingDay: z.string().date().optional(),

  // General options
  customMessage: z.string().max(500, 'Custom message too long').optional(),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
    .optional(),
});

export const boardConfigStepSchema = z.object({
  postingMode: z.enum(['single', 'multiple']),
  moderationEnabled: z.boolean().default(false),
  allowAnonymous: z.boolean().default(true),
  maxPostsPerUser: z
    .string()
    .regex(/^\d+$/, 'Must be a valid number')
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),
  boardVisibility: z.enum(['public', 'private']).default('public'),
  expirationDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional()
    .nullable(),
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
  boardType: z
    .enum(['appreciation', 'birthday', 'farewell', 'general'])
    .optional(),
  nameType: z.enum(['first-name', 'full-name', 'nickname']).optional(),
  postingMode: z.enum(['single', 'multiple']).optional(),
  moderationEnabled: z.boolean().optional(),
  allowAnonymous: z.boolean().optional(),
  maxPostsPerUser: z.string().nullable().optional(),
  boardVisibility: z.enum(['public', 'private']).optional(),
  expirationDate: z.date().nullable().optional(),
  typeConfig: z.record(z.string(), z.unknown()).nullable().optional(),
});

// Type exports
export type BoardSchema = z.infer<typeof boardSchema>;
export type CreateBoardSchema = z.infer<typeof createBoardSchema>;
export type CreateMultiStepBoardSchema = z.infer<
  typeof createMultiStepBoardSchema
>;
export type BasicInfoStepSchema = z.infer<typeof basicInfoStepSchema>;
export type TypeConfigStepSchema = z.infer<typeof typeConfigStepSchema>;
export type BoardConfigStepSchema = z.infer<typeof boardConfigStepSchema>;
export type UpdateBoardSchema = z.infer<typeof updateBoardSchema>;
