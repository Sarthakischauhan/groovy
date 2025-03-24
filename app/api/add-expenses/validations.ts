import { z } from 'zod';

export const createExpenseSchema = z.object({
  amount: z.number()
    .positive('Amount must be positive')
    .max(1000000, 'Amount cannot exceed 1,000,000'),
  necessary: z.boolean(),
  date_posted: z.string().datetime(),
  type: z.enum(['credit', 'debit']),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  user_id: z.string(),
  emoji: z.string().emoji().optional()
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>; 