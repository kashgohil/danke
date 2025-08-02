import { z } from 'zod';

export const createMultiStepBoardSchema = z
  .object({
    // basic info
    title: z
      .string()
      .min(1, 'Board title is required')
      .max(255, 'Title too long')
      .trim(),
    recipientName: z
      .string()
      .min(1, 'Recipient name is required')
      .max(255, 'Recipient name too long')
      .trim(),
    boardType: z.enum(
      [
        'appreciation',
        'birthday',
        'farewell',
        'welcome',
        'congratulations',
        'get-well',
        'sympathy',
        'holiday',
        'anniversary',
        'retirement',
        'graduation',
        'baby-shower',
        'wedding',
        'general',
      ],
      {
        error: 'Please select a valid board type',
      }
    ),

    // board config
    postingMode: z.enum(['single', 'multiple'], {
      message: 'Please select a posting mode',
    }),
    moderationEnabled: z.boolean().default(false),
    allowAnonymous: z.boolean().default(true),
    maxPostsPerUser: z
      .string()
      .regex(/^\d*$/, 'Must be a valid number or empty')
      .transform((val) => (val === '' || val === undefined ? null : val))
      .nullable()
      .optional()
      .refine((val) => {
        if (val === null || val === undefined) return true;
        const num = parseInt(val);
        return num > 0 && num <= 100;
      }, 'Maximum posts per user must be between 1 and 100'),
    boardVisibility: z.enum(['public', 'private']).default('public'),
    expirationDate: z
      .union([z.date(), z.iso.datetime()])
      .transform((val) => (typeof val === 'string' ? new Date(val) : val))
      .optional()
      .nullable()
      .refine((date) => {
        if (!date) return true;
        return date > new Date();
      }, 'Expiration date must be in the future'),

    // type config
    typeConfig: z.record(z.string(), z.unknown()).optional(),
  })
  .refine(
    (data) => {
      if (data.postingMode === 'single' && data.maxPostsPerUser) {
        const maxPosts = parseInt(data.maxPostsPerUser);
        return maxPosts <= 1;
      }
      return true;
    },
    {
      message: 'Single posting mode cannot allow more than 1 post per user',
      path: ['maxPostsPerUser'],
    }
  );

export const basicInfoStepSchema = z.object({
  boardType: z
    .enum([
      'appreciation',
      'birthday',
      'farewell',
      'welcome',
      'congratulations',
      'get-well',
      'sympathy',
      'holiday',
      'anniversary',
      'retirement',
      'graduation',
      'baby-shower',
      'wedding',
      'general',
    ])
    .default('general'),
  recipientName: z
    .string()
    .min(1, 'Recipient name is required')
    .max(255, 'Recipient name too long')
    .trim()
    .default(''),
  title: z
    .string()
    .min(1, 'Board title is required')
    .max(255, 'Title too long')
    .optional()
    .default(''),
});

export const typeConfigStepSchema = z.object({
  // Appreciation-specific
  appreciationTheme: z
    .enum(['professional', 'casual', 'celebration'])
    .optional()
    .default('casual'),
  showContributorNames: z.boolean().optional().default(true),

  // Birthday-specific
  birthdayDate: z
    .union([z.date(), z.iso.datetime()])
    .transform((val) => (typeof val === 'string' ? new Date(val) : val))
    .optional()
    .nullable(),
  ageDisplay: z.enum(['show', 'hide', 'milestone-only']).optional(),

  // Farewell-specific
  farewellType: z
    .enum(['retirement', 'job-change', 'relocation', 'other'])
    .optional(),
  lastWorkingDay: z
    .union([z.date(), z.iso.datetime()])
    .transform((val) => (typeof val === 'string' ? new Date(val) : val))
    .optional()
    .nullable(),

  // General options
  customMessage: z.string().max(500, 'Custom message too long').optional(),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
    .optional(),
});

export const boardConfigStepSchema = z.object({
  postingMode: z.enum(['single', 'multiple']).default('multiple'),
  moderationEnabled: z.boolean().default(false),
  allowAnonymous: z.boolean().default(true),
  maxPostsPerUser: z.number().nullable().optional(),
  boardVisibility: z.enum(['public', 'private']).default('public'),

  expirationDate: z
    .union([z.date(), z.iso.datetime()])
    .transform((val) => (typeof val === 'string' ? new Date(val) : val))
    .optional()
    .nullable()
    .refine((date) => {
      if (!date) return true;
      return date > new Date();
    }, 'Expiration date must be in the future'),
});

export type CreateMultiStepBoardSchema = z.infer<
  typeof createMultiStepBoardSchema
>;
export type BasicInfoStepSchema = z.infer<typeof basicInfoStepSchema>;
export type TypeConfigStepSchema = z.infer<typeof typeConfigStepSchema>;
export type BoardConfigStepSchema = z.infer<typeof boardConfigStepSchema>;
