import { Router } from 'express'
import {
  getAttendance,
  applyLeave,
  getCalendar,
  getMarks,
  getFees,
  payFees,
  getAnnouncements
} from '../controllers/parent.controller.js'
import { roleMiddleware } from '../middleware/role.middleware'
import validate from '../middleware/validation.middleware'
import { applyLeaveSchema, payFeesSchema } from '../schemas/parent.schema'
import { catchAsync } from '../middleware/errorhandling.middleware'

const router = Router()

router.get(
  '/attendance/:studentId',
  roleMiddleware.parentOnly,
  catchAsync(getAttendance)
)

router.post(
  '/leave-request',
  roleMiddleware.parentOnly,
  validate(applyLeaveSchema),
  catchAsync(applyLeave)
)

router.get(
  '/calendar',
  roleMiddleware.parentOnly,
  catchAsync(getCalendar)
)

router.get(
  '/marks/:studentId',
  roleMiddleware.parentOnly,
  catchAsync(getMarks)
)

router.get(
  '/fees/:studentId',
  roleMiddleware.parentOnly,
  catchAsync(getFees)
)

router.post(
  '/fees/:studentId/pay',
  roleMiddleware.parentOnly,
  validate(payFeesSchema),
  catchAsync(payFees)
)

router.get(
  '/announcements',
  roleMiddleware.parentOnly,
  catchAsync(getAnnouncements)
)

export default router