import { z } from 'zod';
import { Role } from '@foodiego/common-types'; // still unused but fine

export const registerUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Not a valid email'),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' }),
    firstName: z
      .string()
      .min(1, { message: 'First name is required' }),
    lastName: z
      .string()
      .min(1, { message: 'Last name is required' }),
    phone: z.string().optional(),
  }),
  headers: z.object({
    'x-package-name': z
      .string()
      .min(1, { message: 'X-Package-Name header is required' }),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Not a valid email'),
    password: z
      .string()
      .min(1, { message: 'Password is required' }),
  }),
  headers: z.object({
    'x-package-name': z
      .string()
      .min(1, { message: 'X-Package-Name header is required' }),
  }),
});

export const oAuthSignInSchema = z.object({
  body: z.object({
    token: z.string().min(1, { message: 'OAuth token is required' }),
    provider: z.literal('google', { message: "Provider must be 'google'" }),
  }),
  headers: z.object({
    'x-package-name': z.string().min(1, { message: 'X-Package-Name header is required' }),
  }),
});

