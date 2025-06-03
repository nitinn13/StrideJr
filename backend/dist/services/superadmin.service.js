"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const password_utils_1 = require("../utils/password.utils");
const client_1 = require("@prisma/client");
class SuperAdminService {
    createSchool(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.school.create({
                data
            });
        });
    }
    updateSchool(schoolId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.school.update({
                where: { id: schoolId },
                data
            });
        });
    }
    deleteSchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.school.delete({
                where: { id: schoolId }
            });
        });
    }
    createSchoolAdmin(schoolId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, password_utils_1.hashPassword)(data.password);
            return prisma_1.default.user.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword, role: client_1.Role.ADMIN, schoolId }),
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    schoolId: true
                }
            });
        });
    }
    batchCreateUsers(schoolId, users) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUsers = users.map((user) => __awaiter(this, void 0, void 0, function* () {
                const hashedPassword = yield (0, password_utils_1.hashPassword)(user.password);
                return prisma_1.default.user.create({
                    data: Object.assign(Object.assign({}, user), { password: hashedPassword, schoolId })
                });
            }));
            return Promise.all(createUsers);
        });
    }
    getSystemAnalytics(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = yield prisma_1.default.$transaction([
                prisma_1.default.school.count(),
                prisma_1.default.user.count(),
                prisma_1.default.user.groupBy({
                    by: ['role'],
                    _count: true,
                    orderBy: undefined
                })
            ]);
            return {
                totalSchools: stats[0],
                totalUsers: stats[1],
                usersByRole: stats[2]
            };
        });
    }
    getSchoolStats(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [users, students, teachers] = yield prisma_1.default.$transaction([
                prisma_1.default.user.count({ where: { schoolId } }),
                prisma_1.default.student.count({ where: { user: { schoolId } } }),
                prisma_1.default.teacher.count({ where: { user: { schoolId, role: client_1.Role.TEACHER } } })
            ]);
            return {
                totalUsers: users,
                totalStudents: students,
                totalTeachers: teachers
            };
        });
    }
    getSystemHealth() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbStatus = yield prisma_1.default.$queryRaw `SELECT 1`;
            return {
                status: 'healthy',
                timestamp: new Date(),
                database: dbStatus ? 'connected' : 'error'
            };
        });
    }
    updateSystemSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement system settings storage/update logic
            // Could use a Settings table in database or external configuration
            return settings;
        });
    }
}
exports.SuperAdminService = SuperAdminService;
