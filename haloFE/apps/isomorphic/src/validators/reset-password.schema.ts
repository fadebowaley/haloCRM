import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './common-rules';

// form zod validation schema
  export const resetPasswordSchema = z
    .object({
      token: z.string().min(1, { message: 'Invalid or missing token.' }),
      password: validatePassword,
      confirmPassword: validateConfirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.passwordsDidNotMatch,
      path: ['confirmPassword'],
    });


// generate form types from zod validation schema
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
