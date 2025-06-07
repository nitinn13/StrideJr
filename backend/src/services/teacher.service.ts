import { PrismaClient, AttendanceStatus, RequestStatus } from '@prisma/client';
import { ApiError } from '../utils/api-error.utils';

const prisma = new PrismaClient();

export class TeacherService {
  // Attendance Management
  async markAttendance(scheduleId: string, data: { date: Date; attendance: Array<{ studentId: string; status: AttendanceStatus }> }) {
    return await prisma.$transaction(async (tx) => {
      const schedule = await tx.schedule.findUnique({
        where: { id: scheduleId },
        include: { 
          section: { include: { students: true } },
          subject: true
        }
      });

      if (!schedule) {
        throw new ApiError(404, 'Schedule not found');
      }

      // Validate all students belong to the section
      const sectionStudentIds = new Set(schedule.section.students.map(s => s.id));
      const invalidStudents = data.attendance.filter(record => !sectionStudentIds.has(record.studentId));
      
      if (invalidStudents.length > 0) {
        throw new ApiError(400, `Students ${invalidStudents.map(s => s.studentId).join(', ')} do not belong to this section`);
      }

      // Check for duplicate attendance
      const existingAttendance = await tx.attendance.findFirst({
        where: {
          subjectId: schedule.subjectId,
          date: data.date,
          student: {
            id: { in: data.attendance.map(a => a.studentId) }
          }
        }
      });

      if (existingAttendance) {
        throw new ApiError(400, 'Attendance already marked for this date and subject');
      }

      // Create attendance records
      const attendanceRecords = await tx.attendance.createMany({
        data: data.attendance.map(record => ({
          studentId: record.studentId,
          subjectId: schedule.subjectId,
          status: record.status,
          date: data.date
        }))
      });

      return attendanceRecords;
    });
  }

  // Schedule Management
  async getSchedule(teacherId: string, query: { date?: Date; week?: string }) {
    const today = query.date || new Date();
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - dayOfWeek);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return await prisma.schedule.findMany({
      where: {
        teacherId,
        ...(query.week && {
          date: {
            gte: startDate,
            lte: endDate
          }
        })
      },
      include: {
        subject: true,
        section: {
          include: {
            class: true
          }
        }
      },
      orderBy: [
        { day: 'asc' },
        { time: 'asc' }
      ]
    });
  }

  // Test Management
  async createTest(teacherId: string, data: { 
    name: string; 
    date: Date; 
    subjectId: string; 
    sectionId: string;
    maxMarks?: number;
  }) {
    // Validate teacher teaches this subject & section
    const teacherSubject = await prisma.teacherSubject.findFirst({
      where: {
        teacherId,
        subjectId: data.subjectId
      }
    });

    if (!teacherSubject) {
      throw new ApiError(403, 'You are not authorized to create tests for this subject');
    }

    // Check for existing tests on same date
    const existingTest = await prisma.test.findFirst({
      where: {
        sectionId: data.sectionId,
        date: data.date
      }
    });

    if (existingTest) {
      throw new ApiError(400, 'Another test is already scheduled for this date');
    }

    return await prisma.test.create({
      data: {
        ...data,
        teacherId
      },
      include: {
        subject: true,
        section: {
          include: {
            class: true
          }
        }
      }
    });
  }

  // Marks Management
  async uploadMarks(testId: string, data: { marks: Array<{ studentId: string; score: number }> }) {
    return await prisma.$transaction(async (tx) => {
      const test = await tx.test.findUnique({
        where: { id: testId },
        include: { 
          section: { include: { students: true } }
        }
      });

      if (!test) {
        throw new ApiError(404, 'Test not found');
      }

      // Validate all students belong to the section
      const sectionStudentIds = new Set(test.section.students.map(s => s.id));
      const invalidStudents = data.marks.filter(mark => !sectionStudentIds.has(mark.studentId));

      if (invalidStudents.length > 0) {
        throw new ApiError(400, `Students ${invalidStudents.map(s => s.studentId).join(', ')} do not belong to this section`);
      }

      // Check for existing marks
      const existingMarks = await tx.marks.findFirst({
        where: {
          testId,
          studentId: { in: data.marks.map(m => m.studentId) }
        }
      });

      if (existingMarks) {
        throw new ApiError(400, 'Marks already uploaded for some students');
      }

      // Upload marks
      const marksRecords = await tx.marks.createMany({
        data: data.marks.map(mark => ({
          testId,
          studentId: mark.studentId,
          score: mark.score
        }))
      });

      return marksRecords;
    });
  }

  // Substitute Management
  async createSubstituteRequest(data: { 
    scheduleId: string; 
    responderId: string; 
    reason: string;
    date: Date;
  }) {
    // Validate schedule exists
    const schedule = await prisma.schedule.findUnique({
      where: { id: data.scheduleId },
      include: { teacher: true }
    });

    if (!schedule) {
      throw new ApiError(404, 'Schedule not found');
    }

    // Check if already requested
    const existingRequest = await prisma.substituteRequest.findFirst({
      where: {
        scheduleId: data.scheduleId,
        status: RequestStatus.PENDING
      }
    });

    if (existingRequest) {
      throw new ApiError(400, 'A substitute request already exists for this schedule');
    }

    return await prisma.substituteRequest.create({
      data: {
        scheduleId: data.scheduleId,
        requestorId: schedule.teacherId,
        responderId: data.responderId,
        status: RequestStatus.PENDING
      },
      include: {
        schedule: {
          include: {
            subject: true,
            section: true
          }
        },
        responder: {
          include: {
            user: true
          }
        }
      }
    });
  }

  // Student Report Generation
  async getStudentReport(studentId: string, query: { 
    fromDate?: Date; 
    toDate?: Date;
    includeAttendance?: boolean;
    includeMarks?: boolean;
  }) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        section: {
          include: {
            class: true
          }
        },
        attendance: query.includeAttendance ? {
          where: {
            date: {
              gte: query.fromDate,
              lte: query.toDate
            }
          },
          include: {
            subject: true
          }
        } : false,
        marks: query.includeMarks ? {
          include: {
            test: {
              include: {
                subject: true
              }
            }
          }
        } : false
      }
    });

    if (!student) {
      throw new ApiError(404, 'Student not found');
    }

    return student;
  }

  // Respond to Substitute Request
  async respondToSubstituteRequest(requestId: string, data: { 
    status: RequestStatus;
    response?: string;
  }) {
    const request = await prisma.substituteRequest.findUnique({
      where: { id: requestId },
      include: {
        schedule: true,
        requestor: {
          include: {
            user: true
          }
        }
      }
    });

    if (!request) {
      throw new ApiError(404, 'Substitute request not found');
    }

    if (request.status !== RequestStatus.PENDING) {
      throw new ApiError(400, 'This request has already been processed');
    }

    const updatedRequest = await prisma.substituteRequest.update({
      where: { id: requestId },
      data: {
        status: data.status
      },
      include: {
        schedule: {
          include: {
            subject: true,
            section: true
          }
        },
        requestor: {
          include: {
            user: true
          }
        }
      }
    });

    return updatedRequest;
  }
}