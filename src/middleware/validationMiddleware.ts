import { NextFunction, Request, Response } from "express";
import z, { ZodObject, ZodRawShape } from "zod";
import { ValidationError } from "../utils/errors.js";

export function zodBodyValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Mutate the request object for the next middleware function
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      let message = "Validation Failed";
      let details = {};

      if (err instanceof z.ZodError) {
        const numOfErrors = err.issues.length;
        message = `${message}: ${numOfErrors} error${numOfErrors == 1 ? "" : "s"} detected in body`;
        details = err.issues.map(val => ({
          [`${val.path}`]: val.message,
        }));
      } else if (err instanceof Error) {
        // Investigate possible scenarios that would result in code execution getting here
        message = `TODO: Handle default error case`;
      }

      const invalidRequestError = new ValidationError(message, details);

      next(invalidRequestError);
    }
  };
}
