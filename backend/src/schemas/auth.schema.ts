import { Role } from '@prisma/client'
import { z } from 'zod'

export const registerSchema = z.object({
  body: z.object({
    email:   z.string().email(),
    password: z.string().min(6),
    name:    z.string().min(2),
    role:    z.nativeEnum(Role),    // import Role from @prisma/client
    schoolId: z.string().uuid().optional()
  })
})

export const loginSchema = z.object({
  body: z.object({
    email:    z.string().email(),
    password: z.string().min(6)
  })
})
