import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ParentService {
  async fetchAttendance(studentId: string) {
    return await prisma.attendance.findMany({
      where: { studentId },
      include: { subject: true },
    });
  }

  async submitLeaveRequest(data: {
    reason: string;
    fromDate: string;
    toDate: string;
    studentId: string;
  }) {
    return await prisma.leaveRequest.create({ data });
  }

  async fetchHolidays(schoolId: string) {
    return await prisma.holiday.findMany({
      where: { schoolId },
      orderBy: { date: 'asc' },
    });
  }

  async fetchMarks(studentId: string) {
    return await prisma.marks.findMany({
      where: { studentId },
      include: { test: true },
    });
  }

  async fetchFees(studentId: string) {
    return await prisma.fee.findMany({
      where: { studentId },
      orderBy: { dueDate: 'asc' },
    });
  }

  async processFeePayment(feeId: string, paidAt: string) {
    return await prisma.fee.update({
      where: { id: feeId },
      data: { paid: true, paidAt: new Date(paidAt) },
    });
  }

  async fetchAnnouncements(schoolId: string) {
    return await prisma.announcement.findMany({
      where: { schoolId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
