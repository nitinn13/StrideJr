"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Missing token' });
    jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET, (err, payload) => {
        if (err || typeof payload !== 'object') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // @ts-ignore
        req.user = { userId: payload.userId, role: payload.role, schoolId: payload.schoolId };
        next();
    });
}
