import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'
import { JwtPayload } from '../middleware/auth.middleware'

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}
