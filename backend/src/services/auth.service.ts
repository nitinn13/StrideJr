import prisma from '../config/prisma'
import { hashPassword, verifyPassword } from '../utils/password.utils'
import { signJwt } from '../utils/jwt.utils'
import { Role } from '@prisma/client';

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  role: Role;
  schoolId?: string;
}) {
  const { email, password, name, role, schoolId } = data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('User already exists')

  const hashed = await hashPassword(password)
  const newUser = await prisma.user.create({
    data: { email, password: hashed, name, role, schoolId: schoolId || null }
  })

  const token = signJwt({ userId: newUser.id, role: newUser.role, schoolId: newUser.schoolId ?? undefined })

  return {
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const { email, password } = data
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Invalid credentials')

  const valid = await verifyPassword(password, user.password)
  if (!valid) throw new Error('Invalid credentials')

  const token = signJwt({ userId: user.id, role: user.role, schoolId: user.schoolId ?? undefined })
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  }
}
