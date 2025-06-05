import { z } from 'zod';

// Add/Remove Student
export const createStudentSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    name: z.string().min(1, 'Student name is required'),
    email: z.string().email('Invalid email format'),
    sectionId: z.string().uuid('Invalid section ID')
  })
});

export const createTeacherSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    name: z.string()
      .min(2, 'Teacher name must be at least 2 characters')
      .max(50, 'Teacher name cannot exceed 50 characters'),
    email: z.string()
      .email('Invalid email format')
      .min(5, 'Email must be at least 5 characters')
      .max(100, 'Email cannot exceed 100 characters'),
    subjects: z.array(
      z.string().uuid('Invalid subject ID')
    ).optional()
      .default([])
  })
});

export const deleteStudentSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID'),
    studentId: z.string().uuid('Invalid student ID')
  })
});

export const deleteTeacherSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID'),
    teacherId: z.string().uuid('Invalid teacher ID')
  })
});

// Add/Remove Class
export const createClassSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    name: z.string().min(1, 'Class name is required')
  })
});

export const deleteClassSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID'),
    classId: z.string().uuid('Invalid class ID')
  })
});

// Add/Remove Section
export const createSectionSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    name: z.string().min(1, 'Section name is required'),
    classId: z.string().uuid('Invalid class ID')
  })
});

export const deleteSectionSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID'),
    sectionId: z.string().uuid('Invalid section ID')
  })
});

// Add/Remove Subject
export const createSubjectSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    name: z.string().min(1, 'Subject name is required'),
    classId: z.string().uuid('Invalid class ID')
  })
});

export const deleteSubjectSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID'),
    subjectId: z.string().uuid('Invalid subject ID')
  })
});

// Announcement
export const createAnnouncementSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    message: z.string().min(1, 'Message is required'),
    urgency: z.enum(['low', 'medium', 'high'])
  })
});

// Exam Scheduling
export const createExamSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    examName: z.string().min(1, 'Exam name is required'),
    date: z.string().datetime('Invalid date format'),
    sectionId: z.string().uuid('Invalid section ID'),
    subjectId: z.string().uuid('Invalid subject ID'),
    teacherIds: z.array(z.string().uuid()).min(1, 'At least one teacher must be assigned')
  })
});

// Substitute Teacher
export const createSubstituteSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID')
  }),
  body: z.object({
    requestorId: z.string().uuid('Invalid teacher ID'),
    responderId: z.string().uuid('Invalid teacher ID'),
    scheduleId: z.string().uuid('Invalid schedule ID')
  })
});

export const deleteSubstituteSchema = z.object({
  params: z.object({
    schoolId: z.string().uuid('Invalid school ID'),
    substituteId: z.string().uuid('Invalid substitution request ID')
  })
});
