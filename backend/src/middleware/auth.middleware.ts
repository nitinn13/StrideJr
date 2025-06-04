import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'

export interface JwtPayload {
  userId: string
  role: string
  schoolId?: string
}

export function authenticateToken(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Missing token' })

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err || typeof payload !== 'object') {
      return res.status(401).json({ error: 'Invalid token' })
    }
    // @ts-ignore
    req.user = { userId: payload.userId, role: payload.role, schoolId: payload.schoolId }
    next()
  })
}
