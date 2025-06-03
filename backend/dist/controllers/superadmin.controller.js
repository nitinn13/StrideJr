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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSystemSettings = exports.getSystemHealth = exports.getSchoolStats = exports.getSystemAnalytics = exports.batchCreateUsers = exports.createSchoolAdmin = exports.deleteSchool = exports.updateSchool = exports.createSchool = void 0;
const errorhandling_middleware_1 = require("../middleware/errorhandling.middleware");
const superadmin_service_1 = require("../services/superadmin.service");
const superAdminService = new superadmin_service_1.SuperAdminService();
exports.createSchool = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const school = yield superAdminService.createSchool(req.body);
    res.status(201).json(school);
}));
exports.updateSchool = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId } = req.params;
    const school = yield superAdminService.updateSchool(schoolId, req.body);
    res.json(school);
}));
exports.deleteSchool = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId } = req.params;
    yield superAdminService.deleteSchool(schoolId);
    res.status(204).send();
}));
exports.createSchoolAdmin = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId } = req.params;
    const admin = yield superAdminService.createSchoolAdmin(schoolId, req.body);
    res.status(201).json(admin);
}));
exports.batchCreateUsers = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId } = req.params;
    const result = yield superAdminService.batchCreateUsers(schoolId, req.body.users);
    res.status(201).json(result);
}));
exports.getSystemAnalytics = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const analytics = yield superAdminService.getSystemAnalytics(req.query);
    res.json(analytics);
}));
exports.getSchoolStats = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId } = req.params;
    const stats = yield superAdminService.getSchoolStats(schoolId);
    res.json(stats);
}));
exports.getSystemHealth = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const health = yield superAdminService.getSystemHealth();
    res.json(health);
}));
exports.updateSystemSettings = (0, errorhandling_middleware_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield superAdminService.updateSystemSettings(req.body);
    res.json(settings);
}));
