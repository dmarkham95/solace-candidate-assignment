import { z } from 'zod';

export const advocateQuerySchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  degree: z.string().optional(),
  minYearsOfExperience: z.coerce.number().optional(),
  maxYearsOfExperience: z.coerce.number().optional(),

  page: z.coerce.number().positive().default(1),
  pageSize: z.coerce.number().positive().max(100).default(10),
  sortBy: z
    .enum([
      'id',
      'firstName',
      'lastName',
      'city',
      'state',
      'degree',
      'yearsOfExperience',
      'phoneNumber',
      'createdAt',
      'updatedAt',
    ])
    .optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});

export const advocateSchema = z.object({
  id: z.number().optional(), // Optional for creation, present when fetching
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  degree: z.string().min(1, 'Degree is required'),
  yearsOfExperience: z
    .number()
    .int()
    .nonnegative('Years of experience must be a non-negative integer'),
  phoneNumber: z.number().positive('Phone number must be a positive number'),
  createdAt: z.date().optional(), // Auto-generated
  updatedAt: z.date().optional(), // Auto-generated
});

export const getAdvocateByIdSchema = z.object({
  id: z.number(),
});

export const createAdvocateSchema = advocateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAdvocateSchema = advocateSchema.partial().required({ id: true });

export type Advocate = z.infer<typeof advocateSchema>;
export type CreateAdvocateInput = z.infer<typeof createAdvocateSchema>;
export type UpdateAdvocateInput = z.infer<typeof updateAdvocateSchema>;
