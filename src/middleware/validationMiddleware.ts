import { NextFunction, Request, Response } from "express";
import z, { ZodDiscriminatedUnion, ZodError, ZodObject, ZodRawShape } from "zod";
import { ValidationError } from "../utils/errors";
import { SomeType } from "zod/v4/core";

export function zodBodyValidator<T extends SomeType[]>(schema: ZodDiscriminatedUnion<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validate the request object for the next middleware function
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      let message = "Validation Failed";
      let details = {};

      if (err instanceof z.ZodError) {
        const numOfErrors = err.issues.length;
        message = `${message}: ${numOfErrors} error${numOfErrors == 1 ? "" : "s"} detected in body`;
        details = err.issues.map((val) => ({
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

export function zodQueryValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validate and mutate the query field of the req object for the next middleware function
      req.query = schema.parse(req.query) as any;
      next();
    } catch (err) {
      let message = "Query Format Error";
      let details = {};

      if (err instanceof z.ZodError) {
        // message = err.message;
        details = err.issues.map((val) => ({
          [`${val.path}`]: val.message,
        }));
      }

      const invalidRequestError = new ValidationError(message, details);
      next(invalidRequestError);
    }
  };
}

// export function zodParamValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
//   return (req: Request, _res: Response, next: NextFunction) => {

//   }
// }

export function zodIdValidator(idSegment = "id") {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.params[idSegment] = z.uuidv4().parse(req.params[idSegment]) as any;
      next();
    } catch (err) {
      let message = `${idSegment} Format Error`;
      let details = {};

      if (err instanceof ZodError) {
        // message = err.message;
        details = err.issues.map((val) => ({
          [`${val.path}`]: val.message,
        }));
      }

      const invalidRequestError = new ValidationError(message, details);
      next(invalidRequestError);
    }
  };
}
