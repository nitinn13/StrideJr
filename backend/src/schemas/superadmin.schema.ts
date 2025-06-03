import { z } from 'zod'
import { Role } from '@prisma/client'

// School Management Schema
export const createSchoolSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'School name must be at least 2 characters long'),
        address: z.string().min(5, 'Address must be at least 5 characters long').optional(),
        phone: z.string().regex(/^\+?\d{10,}$/, 'Phone number must be at least 10 digits').optional(),
        email: z.string().email('Invalid email format').optional()
    })
})

export const updateSchoolSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID format')
  }),
  body: z
    .object({
      name: z.string().min(2, 'School name must be at least 2 characters').optional(),
      address: z.string().min(5, 'Address must be at least 5 characters').optional(),
      phone: z
        .string()
        .regex(/^\+?\d{10,}$/, 'Phone number must be at least 10 digits')
        .optional(),
      email: z.string().email('Invalid email format').optional()
    })
})

// Admin Management Schema
export const createAdminSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters')
  })
})

// System Management Schema
export const getAnalyticsSchema = z.object({
  query: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    schoolId: z.string().uuid('Invalid school ID').optional()
  })
})

// Batch Operations Schema
export const batchCreateUsersSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    users: z
      .array(
        z.object({
          email: z.string().email('Invalid email format'),
          name: z.string().min(2, 'Name must be at least 2 characters'),
          role: z.enum([Role.ADMIN, Role.TEACHER, Role.PARENT]),
          password: z.string().min(8, 'Password must be at least 8 characters')
        })
      )
      .min(1, 'At least one user is required')
  })
})


export const getSchoolStatsSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID format')
  })
})


// School Configuration Schema
export const updateSchoolConfigSchema = z.object({
    params: z.object({
        schoolId: z.string().uuid('Invalid school ID format')
    }),
    body: z.object({
        academicYear: z.object({
            startDate: z.string().datetime('Invalid start date format'),
            endDate: z.string().datetime('Invalid end date format')
        }).optional(),
        features: z.object({
            enableAttendance: z.boolean().optional(),
            enableFees: z.boolean().optional(),
            enableExams: z.boolean().optional(),
        }).optional(),
    })
})
