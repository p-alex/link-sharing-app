import { controller, httpGet, httpPatch } from "inversify-express-utils";
import ProfileService from "./profile.service";
import { CustomRequest } from "../../server";
import { Response } from "express";
import { lowRateLimit } from "../../middleware/rateLimiting";
import requireAuth from "../../middleware/requireAuth";
import { validateResource } from "../../middleware/validateResource";
import {
  GetProfileByUserIdInput,
  RemoveProfilePictureInput,
  UpdateProfileDetailsInput,
  getProfileByUserIdSchema,
  removeProfilePictureSchema,
  updateProfileDetailsSchema,
} from "./profile.schema";
import { HttpResponse } from "../../utils/httpResponse";

@controller("/profiles")
class ProfileController {
  constructor(private readonly _service: ProfileService) {}

  @httpGet("/:userId", lowRateLimit, requireAuth, validateResource(getProfileByUserIdSchema))
  async getByUserId(req: CustomRequest<object, object, GetProfileByUserIdInput>, res: Response) {
    const result = await this._service.get(req.body.userId);
    return HttpResponse.success(res, result);
  }

  @httpPatch("/", lowRateLimit, requireAuth, validateResource(updateProfileDetailsSchema))
  async update(req: CustomRequest<object, object, UpdateProfileDetailsInput>, res: Response) {
    const profileData = req.body;
    await this._service.update(profileData);
    return HttpResponse.success(res, profileData);
  }

  @httpPatch(
    "/:profileId/remove-profile-picture",
    lowRateLimit,
    requireAuth,
    validateResource(removeProfilePictureSchema),
  )
  async removeProfilePicture(
    req: CustomRequest<object, object, RemoveProfilePictureInput>,
    res: Response,
  ) {
    const { profileId } = req.body;
    await this._service.removeProfilePicture(profileId);
    return HttpResponse.success(res);
  }
}

export default ProfileController;
