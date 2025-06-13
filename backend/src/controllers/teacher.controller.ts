import { Request, Response } from 'express';
import { TeacherService } from '../services/teacher.service';
import { asyncHandler } from '../utils/api-error.utils';

const teacherService = new TeacherService();

// Attendance Management
export const markAttendance = asyncHandler(async (req: Request, res: Response) => {
  const { scheduleId } = req.params;
  const attendance = await teacherService.markAttendance(scheduleId, req.body);
  res.status(201).json(attendance);
});

// Schedule Management
export const getSchedule = asyncHandler(async (req: Request, res: Response) => {
  const teacherId = req.user.teacher.id; // Assuming user is attached by auth middleware
  const schedule = await teacherService.getSchedule(teacherId, req.query);
  res.json(schedule);
});

// Test Management
export const createTest = asyncHandler(async (req: Request, res: Response) => {
  const teacherId = req.user.teacher.id;
  const test = await teacherService.createTest(teacherId, req.body);
  res.status(201).json(test);
});

// Marks Management
export const uploadMarks = asyncHandler(async (req: Request, res: Response) => {
  const { testId } = req.params;
  const marks = await teacherService.uploadMarks(testId, req.body);
  res.status(201).json(marks);
});

// Substitute Management
export const createSubstituteRequest = asyncHandler(async (req: Request, res: Response) => {
  const request = await teacherService.createSubstituteRequest(req.body);
  res.status(201).json(request);
});

export const respondToSubstitute = asyncHandler(async (req: Request, res: Response) => {
  const { requestId } = req.params;
  const response = await teacherService.respondToSubstituteRequest(requestId, req.body);
  res.json(response);
});

// Student Report Management
export const getStudentReport = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const report = await teacherService.getStudentReport(studentId, req.query);
  res.json(report);
});