import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi').min(3, 'Username minimal 3 karakter'),
  password: z.string().min(1, 'Password wajib diisi').min(6, 'Password minimal 6 karakter'),
})

export type LoginFormData = z.infer<typeof loginSchema>
