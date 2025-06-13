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
    const schools = await prisma.school.findMany();

    return {
      Schools: schools
    };
  }

  async getSchoolStats(schoolId: string) {
  const users = await prisma.user.findMany({
    where: { schoolId },
    select: {
      email: true,
      name: true,
      role: true,
      createdAt: true,
    }
  });

  // Categorize users by role
  const categorizedUsers = users.reduce((acc, user) => {
    if (!acc[user.role]) {
      acc[user.role] = [];
    }
    acc[user.role].push(user);
    return acc;
  }, {} as Record<string, typeof users>);

  return {
    totalUsers: users.length,
    usersByRole: categorizedUsers
  };
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