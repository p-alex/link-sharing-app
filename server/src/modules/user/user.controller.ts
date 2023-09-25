import { controller, httpDelete, httpPatch, httpPost } from "inversify-express-utils";
import UserService from "./user.service";
import { Request, Response } from "express";
import { validateResource } from "../../middleware/validateResource";
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "./user.schema";
import { HttpResponse } from "../../utils/httpResponse";
import requireAuth from "../../middleware/requireAuth";
import { highRateLimit, mediumRateLimit } from "../../middleware/rateLimiting";

@controller("/users")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @httpPost("/", highRateLimit, validateResource(createUserSchema))
  async create(req: Request<object, object, CreateUserInput>, res: Response) {
    const result = await this._userService.create(req.body);
    return HttpResponse.success(res, result, 201);
  }

  @httpPatch("/:id", mediumRateLimit, requireAuth, validateResource(updateUserSchema))
  async update(req: Request<object, object, UpdateUserInput>, res: Response) {
    await this._userService.update(req.body);
    return HttpResponse.success(res);
  }

  @httpDelete("/:id", mediumRateLimit, requireAuth, validateResource(deleteUserSchema))
  async delete(req: Request<object, object, DeleteUserInput>, res: Response) {
    await this._userService.delete(req.body.id);
    return HttpResponse.success(res);
  }
}
