import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateResource = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    const validData = schema.parse(req.body);
    req.body = validData;
    next();
  };
};
