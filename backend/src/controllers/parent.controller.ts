import { Request, Response } from 'express';
import { ParentService } from '../services/parent.service';
import { applyLeaveSchema, payFeesSchema } from '../schemas/parent.schema';
import { catchAsync } from '../middleware/errorhandling.middleware';

const parentService = new ParentService();

export const getAttendance = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await parentService.fetchAttendance(studentId);
  res.json(result);
});
export const applyLeave = catchAsync(async (req: Request, res: Response) => {
  const parsed = applyLeaveSchema.safeParse({ body: req.body });
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { reason, fromDate, toDate, studentId } = parsed.data.body;
  const result = await parentService.submitLeaveRequest({ reason, fromDate, toDate, studentId });
  res.status(201).json(result);
});

export const getCalendar = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.query;
  const result = await parentService.fetchHolidays(schoolId as string);
  res.json(result);
});

export const getMarks = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await parentService.fetchMarks(studentId);
  res.json(result);
});

export const getFees = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await parentService.fetchFees(studentId);
  res.json(result);
});

export const payFees = catchAsync(async (req: Request, res: Response) => {
  const parsed = payFeesSchema.safeParse({ body: req.body });
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { feeId, paidAt } = parsed.data.body;
  const result = await parentService.processFeePayment(feeId, paidAt);
  res.json(result);
});


export const getAnnouncements = catchAsync(async (req: Request, res: Response) => {
  const { schoolId } = req.query;
  const result = await parentService.fetchAnnouncements(schoolId as string);
  res.json(result);
});
