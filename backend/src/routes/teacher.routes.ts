import { Router } from 'express';
import validate from '../middleware/validation.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import {
  markAttendance,
  getSchedule,
  createTest,
  uploadMarks,
  createSubstituteRequest,
  respondToSubstitute,
  getStudentReport
} from '../controllers/teacher.controller';
import {
  markAttendanceSchema,
  viewScheduleSchema,
  createTestSchema,
  uploadMarksSchema,
  createSubstituteRequestSchema,
  respondToSubstituteSchema,
  viewStudentReportSchema
} from '../schemas/teacher.schema';

const router = Router();

// Attendance Routes
router.post(
  '/:schoolId/schedule/:scheduleId/attendance',
  roleMiddleware.teacherAndAbove,
  validate(markAttendanceSchema),
  markAttendance
);

// Schedule Routes
router.get(
  '/:schoolId/schedule',
  roleMiddleware.teacherAndAbove,
  validate(viewScheduleSchema),
  getSchedule
);

// Test Routes
router.post(
  '/:schoolId/tests',
  roleMiddleware.teacherAndAbove,
  validate(createTestSchema),
  createTest
);

// Marks Routes
router.post(
  '/:schoolId/tests/:testId/marks',
  roleMiddleware.teacherAndAbove,
  validate(uploadMarksSchema),
  uploadMarks
);

// Substitute Request Routes
router.post(
  '/:schoolId/substitute-requests',
  roleMiddleware.teacherAndAbove,
  validate(createSubstituteRequestSchema),
  createSubstituteRequest
);

router.patch(
  '/:schoolId/substitute-requests/:requestId',
  roleMiddleware.teacherAndAbove,
  validate(respondToSubstituteSchema),
  respondToSubstitute
);

// Student Report Routes
router.get(
  '/:schoolId/students/:studentId/report',
  roleMiddleware.teacherAndAbove,
  validate(viewStudentReportSchema),
  getStudentReport
);

export default router;