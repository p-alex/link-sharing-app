import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateResource = <T>(schema: ZodSchema<T>, withParams: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (withParams) {
      req.body = {
        ...req.body,
        ...req.params,
      };
    }
    const validData = schema.parse(req.body);
    req.body = validData;
    next();
  };
};
