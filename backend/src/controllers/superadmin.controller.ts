import { Request, Response } from 'express'
import { catchAsync } from '../middleware/errorhandling.middleware'
import { SuperAdminService } from '../services/superadmin.service'

const superAdminService = new SuperAdminService()

export const createSchool = catchAsync(async (req: Request, res: Response) => {
  const school = await superAdminService.createSchool(req.body)
  res.status(201).json(school)
})

export const updateSchool = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params
  const school = await superAdminService.updateSchool(schoolId, req.body)
  res.json(school)
})

export const deleteSchool = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params
  await superAdminService.deleteSchool(schoolId)
  res.status(204).send()
})

export const createSchoolAdmin = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params
  const admin = await superAdminService.createSchoolAdmin(schoolId, req.body)
  res.status(201).json(admin)
})

export const batchCreateUsers = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params
  const result = await superAdminService.batchCreateUsers(schoolId, req.body.users)
  res.status(201).json(result)
})

export const getSystemAnalytics = catchAsync(async (req: Request, res: Response) => {
  const analytics = await superAdminService.getSystemAnalytics(req.query)
  res.json(analytics)
})

export const getSchoolStats = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.params
  const stats = await superAdminService.getSchoolStats(schoolId)
  res.json(stats)
})

export const getSystemHealth = catchAsync(async (req: Request, res: Response) => {
  const health = await superAdminService.getSystemHealth()
  res.json(health)
})

export const updateSystemSettings = catchAsync(async (req: Request, res: Response) => {
  const settings = await superAdminService.updateSystemSettings(req.body)
  res.json(settings)
})