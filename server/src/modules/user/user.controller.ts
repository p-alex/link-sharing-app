import { controller, httpDelete, httpPatch, httpPost } from "inversify-express-utils";
import UserService from "./user.service";
import { Response } from "express";
import { validateResource } from "../../middleware/validateResource";
import {
  ChangePasswordInput,
  CheckPasswordInput,
  CreateUserInput,
  DeleteUserInput,
  ForgetPasswordInput,
  ResetPasswordConfirmationInput,
  ResetPasswordInput,
  UpdateUserInput,
  changePasswordSchema,
  checkPasswordSchema,
  createUserSchema,
  deleteUserSchema,
  forgetPasswordSchema,
  resetPasswordConfirmationSchema,
  resetPasswordSchema,
  updateUserSchema,
} from "./user.schema";
import { HttpResponse } from "../../utils/httpResponse";
import requireAuth from "../../middleware/requireAuth";
import {
  highRateLimit,
  lowRateLimit,
  mediumRateLimit,
  veryHighRateLimit,
} from "../../middleware/rateLimiting";
import { CustomRequest } from "../../server";
import { validateCaptcha } from "../../middleware/validateCaptcha";

@controller("/users")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @httpPost("/", highRateLimit, validateResource(createUserSchema), validateCaptcha)
  async create(req: CustomRequest<object, object, CreateUserInput>, res: Response) {
    const result = await this._userService.create(req.body);
    return HttpResponse.success(res, result, 201);
  }

  @httpPost(
    "/forget-password",
    veryHighRateLimit,
    validateResource(forgetPasswordSchema),
    validateCaptcha,
  )
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

  @httpPost("/check-password", lowRateLimit, requireAuth, validateResource(checkPasswordSchema))
  async checkPassword(req: CustomRequest<object, object, CheckPasswordInput>, res: Response) {
    const password = req.body.password;
    const userId = req.user.id;
    await this._userService.checkPassword(userId, password);
    return HttpResponse.success(res, null, 200);
  }

  @httpPatch("/change-password", highRateLimit, requireAuth, validateResource(changePasswordSchema))
  async changePassword(req: CustomRequest<object, object, ChangePasswordInput>, res: Response) {
    const { oldPassword, newPassword } = req.body;
    await this._userService.changePassword(
      req.user.id,
      req.user.sessionId,
      oldPassword,
      newPassword,
    );
    return HttpResponse.success(res);
  }

  @httpPatch("/:id", mediumRateLimit, requireAuth, validateResource(updateUserSchema))
  async update(req: CustomRequest<object, object, UpdateUserInput>, res: Response) {
    await this._userService.update(req.body);
    return HttpResponse.success(res);
  }

  @httpDelete("/:id", mediumRateLimit, requireAuth, validateResource(deleteUserSchema))
  async delete(req: CustomRequest<object, object, DeleteUserInput>, res: Response) {
    await this._userService.delete(req.body);
    return HttpResponse.success(res);
  }
}
