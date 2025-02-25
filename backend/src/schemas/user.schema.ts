import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2).max(256),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
  body: z.object({
    email: z.string().email().optional(),
    name: z.string().min(2).max(256).optional(),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
});
