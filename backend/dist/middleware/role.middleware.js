"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.checkRole = void 0;
const client_1 = require("@prisma/client");
const checkRole = (config) => {
    return (req, res, next) => {
        try {
            // Check if user exists in request (set by auth middleware)
            if (!req.user) {
                return res.status(401).json({ message: 'Authentication required' });
            }
            // Check if user's role is allowed
            if (!config.allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: 'Insufficient permissions',
                    required: config.allowedRoles,
                    current: req.user.role
                });
            }
            // Check school context if required
            if (config.requireSchool && !req.user.schoolId) {
                return res.status(400).json({
                    message: 'School context required for this operation'
                });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({ message: 'Role verification failed' });
        }
    };
};
exports.checkRole = checkRole;
exports.roleMiddleware = {
    // Super Admin only operations
    superadminOnly: (0, exports.checkRole)({
        allowedRoles: [client_1.Role.SUPERADMIN]
    }),
    // School management operations
    schoolAdmin: (0, exports.checkRole)({
        allowedRoles: [client_1.Role.ADMIN, client_1.Role.SUPERADMIN],
        requireSchool: true
    }),
    // Teaching staff operations
    teacherAndAbove: (0, exports.checkRole)({
        allowedRoles: [client_1.Role.TEACHER, client_1.Role.ADMIN, client_1.Role.SUPERADMIN],
        requireSchool: true
    }),
    // Parent access operations
    parentOnly: (0, exports.checkRole)({
        allowedRoles: [client_1.Role.PARENT],
        requireSchool: true
    }),
    // Any authenticated school user
    anySchoolUser: (0, exports.checkRole)({
        allowedRoles: [client_1.Role.TEACHER, client_1.Role.ADMIN, client_1.Role.PARENT],
        requireSchool: true
    }),
    // Custom role checker
    custom: (roles, requireSchool = true) => (0, exports.checkRole)({
        allowedRoles: roles,
        requireSchool
    })
};
