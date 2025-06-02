import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public operational = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

interface ErrorResponse {
  status: string;
  message: string;
  errors?: any;
  stack?: string;
}

export const errorHandler = (
  err: Error | AppError | ZodError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: ErrorResponse = {
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
  if (err instanceof ZodError) {
    response = {
      status: 'fail',
      message: 'Validation error',
      errors: err.flatten()
    };
    return res.status(400).json(response);
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
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

// Catch async errors
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};