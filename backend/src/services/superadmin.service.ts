import prisma from '../config/prisma'
import { hashPassword } from '../utils/password.utils'
import { Role } from '@prisma/client'

export class SuperAdminService {
  async createSchool(data: {
    name: string
    address: string
    phone: string
    email: string
  }) {
    return prisma.school.create({
      data
    })
  }

  async updateSchool(schoolId: string, data: {
    name?: string
    address?: string
    phone?: string
    email?: string
  }) {
    return prisma.school.update({
      where: { id: schoolId },
      data
    })
  }

  async deleteSchool(schoolId: string) {
    return prisma.school.delete({
      where: { id: schoolId }
    })
  }

  async createSchoolAdmin(schoolId: string, data: {
    email: string
    password: string
    name: string
  }) {
    const hashedPassword = await hashPassword(data.password)
    
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: Role.ADMIN,
        schoolId
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        schoolId: true
      }
    })
  }

  async batchCreateUsers(schoolId: string, users: Array<{
    email: string
    password: string
    name: string
    role: Role
  }>) {
    const createUsers = users.map(async user => {
      const hashedPassword = await hashPassword(user.password)
      return prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
          schoolId
        }
      })
    })

    return Promise.all(createUsers)
  }

  async getSystemAnalytics(filters: {
    startDate?: Date
    endDate?: Date
    schoolId?: string
  }) {
    const stats = await prisma.$transaction([
      prisma.school.count(),
      prisma.user.count(),
      prisma.user.groupBy({
          by: ['role'],
          _count: true,
          orderBy: undefined
      })
    ])

    return {
      totalSchools: stats[0],
      totalUsers: stats[1],
      usersByRole: stats[2]
    }
  }

  async getSchoolStats(schoolId: string) {
    const [users, students, teachers] = await prisma.$transaction([
      prisma.user.count({ where: { schoolId } }),
      prisma.student.count({ where: { user: { schoolId } } }),
      prisma.teacher.count({ where: { user: { schoolId, role: Role.TEACHER } } })
    ])

    return {
      totalUsers: users,
      totalStudents: students,
      totalTeachers: teachers
    }
  }

  async getSystemHealth() {
    const dbStatus = await prisma.$queryRaw`SELECT 1`
    
    return {
      status: 'healthy',
      timestamp: new Date(),
      database: dbStatus ? 'connected' : 'error'
    }
  }

  async updateSystemSettings(settings: any) {
    // Implement system settings storage/update logic
    // Could use a Settings table in database or external configuration
    return settings
  }
}