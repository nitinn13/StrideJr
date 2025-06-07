import { z } from 'zod';

// Common schemas
const dateTimeSchema = z.string().datetime('Invalid date format');
const uuidSchema = z.string().uuid('Invalid UUID format');

// Attendance Schema
export const markAttendanceSchema = z.object({
  params: z.object({
    scheduleId: uuidSchema.describe('Schedule ID')
  }),
  body: z.object({
    date: dateTimeSchema,
    attendance: z.array(z.object({
      studentId: uuidSchema,
      status: z.enum(['PRESENT', 'ABSENT', 'LATE'], {
        description: 'Attendance status must be PRESENT, ABSENT, or LATE'
      })
    })).min(1, 'At least one attendance record is required')
  })
});

// Schedule Schema
export const viewScheduleSchema = z.object({
  query: z.object({
    date: dateTimeSchema.optional(),
    week: z.string().optional()
  })
});

// Test Schema
export const createTestSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Test name is required'),
    date: dateTimeSchema,
    subjectId: uuidSchema,
    sectionId: uuidSchema
  })
});

// Marks Schema
export const uploadMarksSchema = z.object({
  params: z.object({
    testId: uuidSchema
  }),
  body: z.object({
    marks: z.array(z.object({
      studentId: uuidSchema,
      score: z.number()
        .min(0, 'Score cannot be negative')
        .max(100, 'Score cannot exceed 100')
    })).min(1, 'At least one mark record is required')
  })
});

// Substitute Request Schema
export const createSubstituteRequestSchema = z.object({
  body: z.object({
    scheduleId: uuidSchema,
    responderId: uuidSchema,
    reason: z.string().min(1, 'Reason is required')
  })
});

export const respondToSubstituteSchema = z.object({
  params: z.object({
    requestId: uuidSchema
  }),
  body: z.object({
    status: z.enum(['ACCEPTED', 'DECLINED'], {
      description: 'Status must be either ACCEPTED or DECLINED'
    }),
    response: z.string().optional()
  })
});

// Student Report Schema
export const viewStudentReportSchema = z.object({
  params: z.object({
    studentId: uuidSchema
  }),
  query: z.object({
    fromDate: dateTimeSchema.optional(),
    toDate: dateTimeSchema.optional(),
    includeAttendance: z.boolean().optional(),
    includeMarks: z.boolean().optional()
  })
});

// Calendar Schema
export const viewCalendarSchema = z.object({
  query: z.object({
    month: z.number().min(1).max(12).optional(),
    year: z.number().min(2000).max(2100).optional(),
    includeHolidays: z.boolean().optional(),
    includeTests: z.boolean().optional()
  })
});