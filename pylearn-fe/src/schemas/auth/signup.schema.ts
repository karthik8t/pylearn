import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6)
})

export type SignupSchema = z.infer<typeof signupSchema>