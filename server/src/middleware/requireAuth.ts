import { NextFunction, Response } from "express";
import { CustomRequest } from "../server";
import Jwt from "../utils/jwt";
import { HttpResponse } from "../utils/httpResponse";
import { JsonWebTokenError } from "jsonwebtoken";

const requireAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return HttpResponse.error(res, 400, ["No access token provided"]);
  let tokenPayload;
  try {
    tokenPayload = new Jwt().verifyJwt<{ id: string; email: string }>(
      accessToken,
      "ACCESS_TOKEN_SECRET",
    );
    req.user = tokenPayload;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return HttpResponse.error(res, 403, [error.message]);
    }
  }
};

export default requireAuth;
