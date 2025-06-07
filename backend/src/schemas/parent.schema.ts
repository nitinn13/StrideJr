import { z } from 'zod';


export const applyLeaveSchema = z.object({
  body: z.object({
    reason: z.string().min(1, 'Reason is required'),
    fromDate: z.string().datetime('Invalid from date format'),
    toDate: z.string().datetime('Invalid to date format'),
    studentId: z.string().uuid('Invalid student ID'),
  }),
});

export const payFeesSchema = z.object({
  body: z.object({
    feeId: z.string().uuid('Invalid fee ID'),
    paidAt: z.string().datetime('Invalid paidAt date format'),
  }),
});
export const validateLeaveRequest = (data: unknown) => {
  return applyLeaveSchema.safeParse(data);
};

export const validateFeePayment = (data: unknown) => {
  return payFeesSchema.safeParse(data);
};
