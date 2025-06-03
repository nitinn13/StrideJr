"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchoolConfigSchema = exports.getSchoolStatsSchema = exports.batchCreateUsersSchema = exports.getAnalyticsSchema = exports.createAdminSchema = exports.updateSchoolSchema = exports.createSchoolSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
// School Management Schema
exports.createSchoolSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'School name must be at least 2 characters long'),
        address: zod_1.z.string().min(5, 'Address must be at least 5 characters long').optional(),
        phone: zod_1.z.string().regex(/^\+?\d{10,}$/, 'Phone number must be at least 10 digits').optional(),
        email: zod_1.z.string().email('Invalid email format').optional()
    })
});
exports.updateSchoolSchema = zod_1.z.object({
    params: zod_1.z.object({
        schoolId: zod_1.z.string().uuid('Invalid school ID format')
    }),
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(2, 'School name must be at least 2 characters').optional(),
        address: zod_1.z.string().min(5, 'Address must be at least 5 characters').optional(),
        phone: zod_1.z
            .string()
            .regex(/^\+?\d{10,}$/, 'Phone number must be at least 10 digits')
            .optional(),
        email: zod_1.z.string().email('Invalid email format').optional()
    })
});
// Admin Management Schema
exports.createAdminSchema = zod_1.z.object({
    params: zod_1.z.object({
        schoolId: zod_1.z.string().uuid('Invalid school ID')
    }),
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters')
    })
});
// System Management Schema
exports.getAnalyticsSchema = zod_1.z.object({
    query: zod_1.z.object({
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        schoolId: zod_1.z.string().uuid('Invalid school ID').optional()
    })
});
// Batch Operations Schema
exports.batchCreateUsersSchema = zod_1.z.object({
    params: zod_1.z.object({
        schoolId: zod_1.z.string().uuid('Invalid school ID')
    }),
    body: zod_1.z.object({
        users: zod_1.z
            .array(zod_1.z.object({
            email: zod_1.z.string().email('Invalid email format'),
            name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
            role: zod_1.z.enum([client_1.Role.ADMIN, client_1.Role.TEACHER, client_1.Role.PARENT]),
            password: zod_1.z.string().min(8, 'Password must be at least 8 characters')
        }))
            .min(1, 'At least one user is required')
    })
});
exports.getSchoolStatsSchema = zod_1.z.object({
    params: zod_1.z.object({
        schoolId: zod_1.z.string().uuid('Invalid school ID format')
    })
});
// School Configuration Schema
exports.updateSchoolConfigSchema = zod_1.z.object({
    params: zod_1.z.object({
        schoolId: zod_1.z.string().uuid('Invalid school ID format')
    }),
    body: zod_1.z.object({
        academicYear: zod_1.z.object({
            startDate: zod_1.z.string().datetime('Invalid start date format'),
            endDate: zod_1.z.string().datetime('Invalid end date format')
        }).optional(),
        features: zod_1.z.object({
            enableAttendance: zod_1.z.boolean().optional(),
            enableFees: zod_1.z.boolean().optional(),
            enableExams: zod_1.z.boolean().optional(),
        }).optional(),
    })
});
