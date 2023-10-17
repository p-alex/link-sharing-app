import { NextFunction, Response } from "express";
import { CustomRequest } from "../server";
import { HttpResponse } from "../utils/httpResponse";
import { validateCaptchaToken } from "../utils/validateCaptcha";

export const validateCaptcha = async (
  req: CustomRequest<object, object, { captchaToken: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await validateCaptchaToken(req.body.captchaToken);
    if (result.success) {
      next();
    } else {
      HttpResponse.error(res, 401, result["error-codes"]);
    }
  } catch (error) {
    console.error(error);
    return HttpResponse.error(res, 500, ["Something went wrong"]);
  }
};
