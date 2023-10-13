import { controller, httpDelete, httpPatch, httpPost } from "inversify-express-utils";
import UserService from "./user.service";
import { Response } from "express";
import { validateResource } from "../../middleware/validateResource";
import {
  CreateUserInput,
  DeleteUserInput,
  ForgetPasswordInput,
  ResetPasswordConfirmationInput,
  ResetPasswordInput,
  UpdateUserInput,
  createUserSchema,
  deleteUserSchema,
  forgetPasswordSchema,
  resetPasswordConfirmationSchema,
  resetPasswordSchema,
  updateUserSchema,
} from "./user.schema";
import { HttpResponse } from "../../utils/httpResponse";
import requireAuth from "../../middleware/requireAuth";
import { highRateLimit, mediumRateLimit, veryHighRateLimit } from "../../middleware/rateLimiting";
import { CustomRequest } from "../../server";

@controller("/users")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @httpPost("/", highRateLimit, validateResource(createUserSchema))
  async create(req: CustomRequest<object, object, CreateUserInput>, res: Response) {
    const result = await this._userService.create(req.body);
    return HttpResponse.success(res, result, 201);
  }

  @httpPatch("/:id", mediumRateLimit, requireAuth, validateResource(updateUserSchema))
  async update(req: CustomRequest<object, object, UpdateUserInput>, res: Response) {
    await this._userService.update(req.body);
    return HttpResponse.success(res);
  }

  @httpDelete("/:id", mediumRateLimit, requireAuth, validateResource(deleteUserSchema))
  async delete(req: CustomRequest<object, object, DeleteUserInput>, res: Response) {
    await this._userService.delete(req.body.id);
    return HttpResponse.success(res);
  }

  @httpPost("/forget-password", veryHighRateLimit, validateResource(forgetPasswordSchema))
  async forgetPassword(req: CustomRequest<object, object, ForgetPasswordInput>, res: Response) {
    await this._userService.forgetPassword(req.body.email);
    return HttpResponse.success(res, null, 200);
  }

  @httpPost(
    "/reset-password-confirmation",
    veryHighRateLimit,
    validateResource(resetPasswordConfirmationSchema),
  )
  async resetPasswordConfirmation(
    req: CustomRequest<object, object, ResetPasswordConfirmationInput>,
    res: Response,
  ) {
    await this._userService.resetPasswordConfirmation(req.body.token);
    return HttpResponse.success(res, null, 200);
  }

  @httpPost("/reset-password", veryHighRateLimit, validateResource(resetPasswordSchema))
  async resetPassword(req: CustomRequest<object, object, ResetPasswordInput>, res: Response) {
    await this._userService.resetPassword(req.body.password, req.body.token);
    return HttpResponse.success(res, null, 200);
  }
}
