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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const prisma_1 = __importDefault(require("../config/prisma"));
const password_utils_1 = require("../utils/password.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
function registerUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { email, password, name, role, schoolId } = data;
        const existing = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existing)
            throw new Error('User already exists');
        const hashed = yield (0, password_utils_1.hashPassword)(password);
        const newUser = yield prisma_1.default.user.create({
            data: { email, password: hashed, name, role, schoolId: schoolId || null }
        });
        const token = (0, jwt_utils_1.signJwt)({ userId: newUser.id, role: newUser.role, schoolId: (_a = newUser.schoolId) !== null && _a !== void 0 ? _a : undefined });
        return {
            token,
            user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
        };
    });
}
function loginUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { email, password } = data;
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            throw new Error('Invalid credentials');
        const valid = yield (0, password_utils_1.verifyPassword)(password, user.password);
        if (!valid)
            throw new Error('Invalid credentials');
        const token = (0, jwt_utils_1.signJwt)({ userId: user.id, role: user.role, schoolId: (_a = user.schoolId) !== null && _a !== void 0 ? _a : undefined });
        return {
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        };
    });
}
