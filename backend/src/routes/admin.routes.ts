import { Router, Request, Response, NextFunction } from 'express'
import { AdminService } from '../services/admin.service'
import validate from '../middleware/validation.middleware'
import { roleMiddleware } from '../middleware/role.middleware'
import {
  createStudentSchema,
  deleteStudentSchema,
  createClassSchema,
  deleteClassSchema,
  createSectionSchema,
  deleteSectionSchema,
  createSubjectSchema,
  deleteSubjectSchema,
  createAnnouncementSchema,
  createExamSchema,
  createSubstituteSchema,
  deleteSubstituteSchema,
  createTeacherSchema,
  deleteTeacherSchema
} from '../schemas/admin.schema'
import { catchAsync } from '../middleware/errorhandling.middleware'

const router = Router()
const adminService = new AdminService()

// Students
router.post(
  '/:schoolId/students',
  roleMiddleware.schoolAdmin,
  validate(createStudentSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params
    const studentData = req.body
    const student = await adminService.createStudent(schoolId, studentData)
    res.status(201).json(student)
  })
)

router.delete(
  '/:schoolId/students/:studentId',
  roleMiddleware.schoolAdmin,
  validate(deleteStudentSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId, studentId } = req.params
    await adminService.deleteStudent(schoolId, studentId)
    res.status(204).send()
  })
)

// Classes
router.post(
  '/:schoolId/classes',
  roleMiddleware.schoolAdmin,
  validate(createClassSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params
    const { name } = req.body
    const newClass = await adminService.createClass(schoolId, name)
    res.status(201).json(newClass)
  })
)

router.delete(
  '/:schoolId/classes/:classId',
  roleMiddleware.schoolAdmin,
  validate(deleteClassSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId, classId } = req.params
    await adminService.deleteClass(schoolId, classId)
    res.status(204).send()
  })
)

// Sections
router.post(
  '/:schoolId/sections',
  roleMiddleware.schoolAdmin,
  validate(createSectionSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params
    const sectionData = req.body
    const section = await adminService.createSection(schoolId, sectionData)
    res.status(201).json(section)
  })
)

router.delete(
  '/:schoolId/sections/:sectionId',
  roleMiddleware.schoolAdmin,
  validate(deleteSectionSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId, sectionId } = req.params
    await adminService.deleteSection(schoolId, sectionId)
    res.status(204).send()
  })
)

// Subjects
router.post(
  '/:schoolId/subjects',
  roleMiddleware.schoolAdmin,
  validate(createSubjectSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params
    const subjectData = req.body
    const subject = await adminService.createSubject(schoolId, subjectData)
    res.status(201).json(subject)
  })
)

router.delete(
  '/:schoolId/subjects/:subjectId',
  roleMiddleware.schoolAdmin,
  validate(deleteSubjectSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId, subjectId } = req.params
    await adminService.deleteSubject(schoolId, subjectId)
    res.status(204).send()
  })
)

// Announcements
router.post(
  '/:schoolId/announcements',
  roleMiddleware.schoolAdmin,
  validate(createAnnouncementSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params
    const announcementData = req.body
    const announcement = await adminService.createAnnouncement(schoolId, announcementData)
    res.status(201).json(announcement)
  })
)

// Exams
router.post(
  '/:schoolId/exams',
  roleMiddleware.schoolAdmin,
  validate(createExamSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params
    const examData = req.body
    const exams = await adminService.createExam(schoolId, examData)
    res.status(201).json(exams)
  })
)

// Substitute teacher requests
router.post(
  '/:schoolId/substitutes',
  roleMiddleware.teacherAndAbove,
  validate(createSubstituteSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(501).json({ message: 'Not implemented yet' })
  })
)

router.delete(
  '/:schoolId/substitutes/:substituteId',
  roleMiddleware.teacherAndAbove,
  validate(deleteSubstituteSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(501).json({ message: 'Not implemented yet' })
  })
)

// Teachers
router.post(
  '/:schoolId/teachers',
  roleMiddleware.schoolAdmin,
  validate(createTeacherSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId } = req.params
    const teacherData = req.body
    const teacher = await adminService.createTeacher(schoolId, teacherData)
    res.status(201).json(teacher)
  })
)

router.delete(
  '/:schoolId/teachers/:teacherId',
  roleMiddleware.schoolAdmin,
  validate(deleteTeacherSchema),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId, teacherId } = req.params
    await adminService.deleteTeacher(schoolId, teacherId)
    res.status(204).send()
  })
)

export default router
