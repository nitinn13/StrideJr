import { Request, Response, NextFunction } from 'express'
import { Role } from '@prisma/client'

type RoleConfig = {
  allowedRoles: Role[];
  requireSchool?: boolean;
}

export const checkRole = (config: RoleConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists in request (set by auth middleware)
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' })
      }

      // Check if user's role is allowed
      if (!config.allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: 'Insufficient permissions',
          required: config.allowedRoles,
          current: req.user.role
        })
      }

      // Check school context if required
      if (config.requireSchool && !req.user.schoolId) {
        return res.status(400).json({ 
          message: 'School context required for this operation' 
        })
      }

      next()
    } catch (error) {
      return res.status(500).json({ message: 'Role verification failed' })
    }
  }
}

export const roleMiddleware = {
  // Super Admin only operations
  superadminOnly: checkRole({
    allowedRoles: [Role.SUPERADMIN]
  }),

  // School management operations
  schoolAdmin: checkRole({
    allowedRoles: [Role.ADMIN, Role.SUPERADMIN],
    requireSchool: true
  }),

  // Teaching staff operations
  teacherAndAbove: checkRole({
    allowedRoles: [Role.TEACHER, Role.ADMIN, Role.SUPERADMIN],
    requireSchool: true
  }),

  // Parent access operations
  parentOnly: checkRole({
    allowedRoles: [Role.PARENT],
    requireSchool: true
  }),

  // Any authenticated school user
  anySchoolUser: checkRole({
    allowedRoles: [Role.TEACHER, Role.ADMIN, Role.PARENT],
    requireSchool: true
  }),

  // Custom role checker
  custom: (roles: Role[], requireSchool = true) => checkRole({
    allowedRoles: roles,
    requireSchool
  })
}