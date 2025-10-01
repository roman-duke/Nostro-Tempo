import { NextFunction, Request, Response } from "express";

// TODO: Read the Mostly Adequate Guide to Functional Programming book and then come back to this function
export const asyncHandler =
  (fn: (req: Request, res: Response, n: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
