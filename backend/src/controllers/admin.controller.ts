import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { catchAsync } from '../middleware/errorhandling.middleware';

const adminService = new AdminService();

export const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const student = await adminService.createStudent(schoolId, req.body);
  res.status(201).json(student);
});

export const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { schoolId, studentId } = req.params;
  await adminService.deleteStudent(schoolId, studentId);
  res.status(204).send();
});

export const createClass = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const newClass = await adminService.createClass(schoolId, req.body.name);
  res.status(201).json(newClass);
});

export const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const { schoolId, classId } = req.params;
  await adminService.deleteClass(schoolId, classId);
  res.status(204).send();
});

export const createSection = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const section = await adminService.createSection(schoolId, req.body);
  res.status(201).json(section);
});

export const deleteSection = catchAsync(async (req: Request, res: Response) => {
  const { schoolId, sectionId } = req.params;
  await adminService.deleteSection(schoolId, sectionId);
  res.status(204).send();
});

export const createSubject = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const subject = await adminService.createSubject(schoolId, req.body);
  res.status(201).json(subject);
});

export const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const { schoolId, subjectId } = req.params;
  await adminService.deleteSubject(schoolId, subjectId);
  res.status(204).send();
});

export const createAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const announcement = await adminService.createAnnouncement(schoolId, req.body);
  res.status(201).json(announcement);
});

export const createExam = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const exams = await adminService.createExam(schoolId, req.body);
  res.status(201).json(exams);
});

export const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const teacher = await adminService.createTeacher(schoolId, req.body);
  res.status(201).json(teacher);
});

export const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const { schoolId, teacherId } = req.params;
  await adminService.deleteTeacher(schoolId, teacherId);
  res.status(204).send();
});
