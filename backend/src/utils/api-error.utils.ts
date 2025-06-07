export class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: string[];

  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: string[] = [],
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const asyncHandler = (fn: Function) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error?.errors || []);
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  };

  return res.status(error.statusCode).json(response);
};