"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = exports.errorHandler = exports.AppError = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
class AppError extends Error {
    constructor(statusCode, message, operational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.operational = operational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    let response = {
        status: 'error',
        message: 'Internal server error'
    };
    // Handle custom AppError
    if (err instanceof AppError) {
        response = {
            status: err.statusCode < 500 ? 'fail' : 'error',
            message: err.message
        };
        return res.status(err.statusCode).json(response);
    }
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        response = {
            status: 'fail',
            message: 'Validation error',
            errors: err.flatten()
        };
        return res.status(400).json(response);
    }
    // Handle Prisma errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                response = {
                    status: 'fail',
                    message: 'Unique constraint violation',
                    errors: err.meta
                };
                return res.status(409).json(response);
            case 'P2025':
                response = {
                    status: 'fail',
                    message: 'Record not found',
                    errors: err.meta
                };
                return res.status(404).json(response);
            default:
                response = {
                    status: 'error',
                    message: 'Database error',
                    errors: err.message
                };
                return res.status(500).json(response);
        }
    }
    // Add stack trace in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }
    res.status(500).json(response);
};
exports.errorHandler = errorHandler;
// Catch async errors
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.catchAsync = catchAsync;
