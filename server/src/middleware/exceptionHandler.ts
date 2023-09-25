import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AlreadyExistsException from "../exceptions/AlreadyExistsException";
import { HttpResponse } from "../utils/httpResponse";
import InvalidCredentialsException from "../exceptions/InvalidCredentialsException";

export const exceptionHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errors = err.errors.map((e) => e.message);
      return HttpResponse.error(res, 400, errors);
    }
    if (err instanceof InvalidCredentialsException) {
      return HttpResponse.error(res, 401, [err.message]);
    }
    if (err instanceof AlreadyExistsException) {
      return HttpResponse.error(res, 409, [err.message]);
    }
    if (err instanceof Error) {
      return HttpResponse.error(res, 500, [err.message]);
    }
  }

  next();
};
