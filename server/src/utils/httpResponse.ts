import { Response } from "express";
import DefaultResponse from "../lib/defaultResponse";

export class HttpResponse {
  static success<TData>(res: Response, data?: TData, status_code: number = 200) {
    if (!data) {
      status_code = 204;
    }
    res.status(status_code).json(new DefaultResponse(true, 200, data));
  }
  static error(res: Response, status_code: number, errors: string[]) {
    res.status(status_code).json(new DefaultResponse(false, status_code, null, errors));
  }
}
