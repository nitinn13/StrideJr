import { Role,PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export class AdminService {
  async createStudent(schoolId: string, data: { name: string; email: string; sectionId?: string }) {
    const { name, email, sectionId } = data;

    if (sectionId) {
      const section = await prisma.section.findFirst({
        where: {
          id: sectionId,
          class: { schoolId }
        }
      });

      if (!section) throw new Error('Section does not belong to the school');
    }

    const password = await hash('defaultpassword', 10);

     const parentUser = await prisma.user.create({
      data: {
        name: 'Parent of ' + name,
        email: email + '.parent',
        password,
        role: Role.PARENT,
        schoolId,
      },
    });

    const parent = await prisma.parent.create({
      data: {
        userId: parentUser.id,
      },
    });

    // 2. Create Student User and Student with parentId
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: Role.STUDENT, // Note: Added STUDENT to Role enum migrated
        schoolId,
        student: {
          create: {
            sectionId: sectionId!,
            parentId: parent.id,
          },
        },
      },
      include: {
        student: true,
      },
    });

    return user;
  
  }

  async createMultipleStudents(schoolId: string, students: { name: string; email: string; sectionId?: string }[]) {
    const results = await prisma.$transaction(async (tx) => {
      const createdStudents = [];

      for (const studentData of students) {
        const { name, email, sectionId } = studentData;

        if (sectionId) {
          const section = await tx.section.findFirst({
            where: {
              id: sectionId,
              class: { schoolId }
            }
          });

          if (!section) throw new Error(`Section ${sectionId} does not belong to the school`);
        }

        const password = await hash('defaultpassword', 10);

        // Create parent user
        const parentUser = await tx.user.create({
          data: {
            name: 'Parent of ' + name,
            email: email + '.parent',
            password,
            role: Role.PARENT,
            schoolId,
          },
        });

        const parent = await tx.parent.create({
          data: {
            userId: parentUser.id,
          },
        });

        // Create student user
        const user = await tx.user.create({
          data: {
            name,
            email,
            password,
            role: Role.STUDENT,
            schoolId,
            student: {
              create: {
                sectionId: sectionId!,
                parentId: parent.id,
              },
            },
          },
          include: {
            student: true,
          },
        });

        createdStudents.push(user);
      }

      return createdStudents;
    });

    return results;
  }

  async deleteStudent(schoolId: string, studentId: string) {
    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        section: {
          class: {
            schoolId
          }
        }
      }
    });

    if (!student) throw new Error('Student not found in this school');

    await prisma.user.delete({ where: { id: student.userId } });
  }
  

 async getStudentsWithCount(schoolId: string) {
  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where: {
        section: {
          class: {
            schoolId: schoolId
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        },
        section: {
          include: {
            class: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        parent: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        user: {
          name: 'asc'
        }
      }
    }),
    prisma.student.count({
      where: {
        section: {
          class: {
            schoolId: schoolId
          }
        }
      }
    })
  ]);

  const formattedStudents = students.map(student => ({
    id: student.id,
    user: {
      id: student.user.id,
      name: student.user.name,
      email: student.user.email,
      role: student.user.role,
      joinedAt: student.user.createdAt
    },
    academicInfo: {
      class: {
        id: student.section.class.id,
        name: student.section.class.name
      },
      section: {
        id: student.section.id,
        name: student.section.name
      }
    },
    parent: student.parent ? {
      id: student.parent.id,
      name: student.parent.user.name,
      email: student.parent.user.email
    } : null
  }));

  return {
    data: formattedStudents,
    meta: {
      total,
      schoolId,
      retrieved: formattedStudents.length,
      lastUpdated: new Date().toISOString()
    }
  };
}

  async createTeacher(schoolId: string, data: { name: string; email: string }) {
    const { name, email } = data;

    // Check for existing teacher
    const existingTeacher = await prisma.user.findFirst({
      where: { email, role: Role.TEACHER, schoolId }
    });

    if (existingTeacher) throw new Error('Teacher already exists');

    const password = await hash('defaultpassword', 10);

    // Use transaction to ensure both records are created
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          password,
          role: Role.TEACHER,
          schoolId
        }
      });

      // 2. Create teacher record
      const teacher = await tx.teacher.create({
        data: {
          userId: user.id
        }
      });

      // 3. Return complete teacher data
      return await tx.user.findUnique({
        where: { id: user.id },
        include: {
          teacher: true
        }
      });
    });

    return result;
  }

  async createMultipleTeachers(schoolId: string, teachers: { name: string; email: string; subjects?: string[] }[]) {
    const results = await prisma.$transaction(async (tx) => {
      const createdTeachers = [];

      for (const teacherData of teachers) {
        const { name, email } = teacherData;

        // Check for existing teacher
        const existingTeacher = await tx.user.findFirst({
          where: { email, role: Role.TEACHER, schoolId }
        });

        if (existingTeacher) {
          throw new Error(`Teacher with email ${email} already exists`);
        }

        const password = await hash('defaultpassword', 10);

        // Create user and teacher record
        const user = await tx.user.create({
          data: {
            name,
            email,
            password,
            role: Role.TEACHER,
            schoolId,
            teacher: {
              create: {}
            }
          },
          include: {
            teacher: true
          }
        });

        createdTeachers.push(user);
      }

      return createdTeachers;
    });

    return results;
  }

  async deleteTeacher(schoolId: string, teacherId: string) {
    // Use transaction to ensure both records are deleted
    return await prisma.$transaction(async (tx) => {
      // 1. Find teacher with validation
      const teacher = await tx.user.findFirst({
        where: { 
          id: teacherId, 
          role: Role.TEACHER, 
          schoolId 
        },
        include: {
          teacher: true
        }
      });

      if (!teacher) {
        throw new Error('Teacher not found in this school');
      }

      // 2. Delete teacher record first (due to foreign key constraint)
      await tx.teacher.delete({
        where: { 
          userId: teacher.id 
        }
      });

      // 3. Delete user record
      await tx.user.delete({
        where: { 
          id: teacher.id 
        }
      });

      return { message: 'Teacher deleted successfully' };
    });
  }
  async getTeachersWithCount(schoolId: string) {
  const [teachers, total] = await Promise.all([
    prisma.teacher.findMany({
      where: {
        user: {
          schoolId: schoolId
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        },
        subjects: {
          include: {
            subject: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        user: {
          name: 'asc'
        }
      }
    }),
    prisma.teacher.count({
      where: {
        user: {
          schoolId: schoolId
        }
      }
    })
  ]);

  const formattedTeachers = teachers.map(teacher => ({
    id: teacher.id,
    user: {
      id: teacher.user.id,
      name: teacher.user.name,
      email: teacher.user.email,
      role: teacher.user.role,
      joinedAt: teacher.user.createdAt
    },
    subjects: teacher.subjects.map(subject => ({
      id: subject.subject.id,
      name: subject.subject.name
    })),
    meta: {
      subjectCount: teacher.subjects.length
    }
  }));

  return {
    data: formattedTeachers,
    meta: {
      total,
      schoolId,
      retrieved: formattedTeachers.length,
      lastUpdated: new Date().toISOString()
    }
  };
}


  async createClass(schoolId: string, name: string) {
    return await prisma.schoolClass.create({
      data: { name, schoolId }
    });
  }

  async deleteClass(schoolId: string, classId: string) {
    const existingClass = await prisma.schoolClass.findFirst({
      where: { id: classId, schoolId }
    });

    if (!existingClass) throw new Error('Class not found in this school');

    await prisma.schoolClass.delete({ where: { id: classId } });
  }
  async getClasses(schoolId: string) {
  const classes = await prisma.schoolClass.findMany({
    where: { schoolId },
    include: {
      sections: {
        include: {
          students: true  
        }
      },
      subjects: true
    }
  });
  return classes;
}

  async createSection(schoolId: string, data: { name: string; classId: string }) {
    const { name, classId } = data;

    const cls = await prisma.schoolClass.findFirst({
      where: { id: classId, schoolId }
    });

    if (!cls) throw new Error('Class does not belong to the school');

    return await prisma.section.create({
      data: { name, classId }
    });
  }

  async deleteSection(schoolId: string, sectionId: string) {
    const section = await prisma.section.findFirst({
      where: {
        id: sectionId,
        class: { schoolId }
      }
    });

    if (!section) throw new Error('Section not found in this school');

    await prisma.section.delete({ where: { id: sectionId } });
  }

  async createSubject(schoolId: string, data: { name: string; classId: string }) {
    const { name, classId } = data;

    const cls = await prisma.schoolClass.findFirst({
      where: { id: classId, schoolId }
    });

    if (!cls) throw new Error('Class does not belong to the school');

    return await prisma.subject.create({
      data: { name, classId }
    });
  }

  async deleteSubject(schoolId: string, subjectId: string) {
    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        class: { schoolId }
      }
    });

    if (!subject) throw new Error('Subject not found in this school');

    await prisma.subject.delete({ where: { id: subjectId } });
  }

  async createAnnouncement(schoolId: string, data: { message: string; urgency: string }) {
    return await prisma.announcement.create({
      data: { ...data, schoolId }
    });
  }

  async createExam(schoolId: string, data: { examName: string; date: string; teacherIds: string[]; sectionId: string; subjectId: string }) {
    const { examName, date, teacherIds, sectionId, subjectId } = data;

    const section = await prisma.section.findFirst({
      where: { id: sectionId, class: { schoolId } }
    });
    if (!section) throw new Error('Section not found in this school');

    const subject = await prisma.subject.findFirst({
      where: { id: subjectId, class: { schoolId } }
    });
    if (!subject) throw new Error('Subject not found in this school');

    const exams = await Promise.all(teacherIds.map(async teacherId => {
      return await prisma.test.create({
        data: {
          name: examName,
          date: new Date(date),
          teacherId,
          sectionId,
          subjectId
        }
      });
    }));

    return exams;
  }
}