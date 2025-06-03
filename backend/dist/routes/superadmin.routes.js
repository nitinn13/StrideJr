"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_middleware_1 = require("../middleware/role.middleware");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const superadmin_schema_1 = require("../schemas/superadmin.schema");
const superadmin_controller_1 = require("../controllers/superadmin.controller");
const router = (0, express_1.Router)();
// Apply superadmin role check to all routes
router.use(role_middleware_1.roleMiddleware.superadminOnly);
// School Management Routes
router.post('/schools', (0, validation_middleware_1.default)(superadmin_schema_1.createSchoolSchema), superadmin_controller_1.createSchool);
router.put('/schools/:schoolId', (0, validation_middleware_1.default)(superadmin_schema_1.updateSchoolSchema), superadmin_controller_1.updateSchool);
router.delete('/schools/:schoolId', superadmin_controller_1.deleteSchool);
// School Admin Management Routes
router.post('/schools/:schoolId/admins', (0, validation_middleware_1.default)(superadmin_schema_1.createAdminSchema), superadmin_controller_1.createSchoolAdmin);
router.post('/schools/:schoolId/bulk-create', (0, validation_middleware_1.default)(superadmin_schema_1.batchCreateUsersSchema), superadmin_controller_1.batchCreateUsers);
// Analytics & Statistics Routes
router.get('/analytics', (0, validation_middleware_1.default)(superadmin_schema_1.getAnalyticsSchema), superadmin_controller_1.getSystemAnalytics);
router.get('/schools/:schoolId/stats', superadmin_controller_1.getSchoolStats);
// System Management Routes
router.get('/system/health', superadmin_controller_1.getSystemHealth);
router.put('/system/settings', superadmin_controller_1.updateSystemSettings);
exports.default = router;
