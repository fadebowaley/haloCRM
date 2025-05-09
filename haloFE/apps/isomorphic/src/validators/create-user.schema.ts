import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

// form zod validation schema
export const createUserSchema = z.object({
  firstname: z.string().min(1, { message: messages.fullNameIsRequired }),
  lastname: z.string().min(1, { message: messages.fullNameIsRequired }),
  password: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof createUserSchema>;

/****
 * 
 * 
 *  "firstname": "John Doe",
  "lastname": "John Doe",
  "isOwner": false,
  "email": "morl@gmail.com.com",
  "password": "Password123"
 */