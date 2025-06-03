import { JwtPayload } from '../middlewares/auth.middleware'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
      // optionally: schoolId?: string
    }
  }
}
