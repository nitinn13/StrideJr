import { Router } from 'express'
import { roleMiddleware } from '../middleware/role.middleware'
import validate from '../middleware/validation.middleware'
import { 
  createSchoolSchema, 
  updateSchoolSchema, 
  createAdminSchema,
  getAnalyticsSchema,
  batchCreateUsersSchema 
} from '../schemas/superadmin.schema'
import {
  createSchool,
  updateSchool,
  deleteSchool,
  createSchoolAdmin,
  batchCreateUsers,
  getSystemAnalytics,
  getSchoolStats,
  getSystemHealth,
  updateSystemSettings
} from '../controllers/superadmin.controller'

const router = Router()

// Apply superadmin role check to all routes
router.use(roleMiddleware.superadminOnly)

// School Management Routes
router.post(
  '/schools', 
  validate(createSchoolSchema), 
  createSchool
)

router.put(
  '/schools/:schoolId', 
  validate(updateSchoolSchema), 
  updateSchool
)

router.delete(
  '/schools/:schoolId', 
  deleteSchool
)

// School Admin Management Routes
router.post(
  '/schools/:schoolId/admins', 
  validate(createAdminSchema), 
  createSchoolAdmin
)

router.post(
  '/schools/:schoolId/bulk-create', 
  validate(batchCreateUsersSchema), 
  batchCreateUsers
)

// Analytics & Statistics Routes
router.get(
  '/analytics', 
  validate(getAnalyticsSchema), 
  getSystemAnalytics
)

router.get(
  '/schools/:schoolId/stats', 
  getSchoolStats
)

// System Management Routes
router.get(
  '/system/health', 
  getSystemHealth
)

router.put(
  '/system/settings', 
  updateSystemSettings
)

export default router