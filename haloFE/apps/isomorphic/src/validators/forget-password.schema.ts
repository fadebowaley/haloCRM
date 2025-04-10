import { z } from 'zod';
import { validateEmail } from './common-rules';

// form zod validation schema
export const forgetPasswordSchema = z.object({
  email: validateEmail,
});

// generate form types from zod validation schema
export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
