import { injectable } from "inversify";
import UnitOfWork from "../../unitOfWork";
import CloudManager from "../../utils/cloud/CloudManager";
import { UpdateProfileDetailsInput } from "./profile.schema";

@injectable()
class ProfileService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _cloudManager: CloudManager,
  ) {}

  async get(userId: string) {
    const profile = await this._unitOfWork.profile.findOneByUserId(userId);

    return profile;
  }

  async update(profileData: UpdateProfileDetailsInput) {
    const profile = await this._unitOfWork.profile.findOneById(profileData.id);

    if (!profile) throw new Error("Profile does not exist");

    const shouldRemoveProfilePicture = !profileData.profilePicture && profile.profilePicture !== "";
    const shouldUploadProfilePicture = profileData.profilePicture.match(/^data:image/);

    if (shouldRemoveProfilePicture) {
      await this._cloudManager.deleteImage(profile.userId);
    }

    if (shouldUploadProfilePicture) {
      const result = await this._cloudManager.uploadImage(profileData.profilePicture, profile.id);
      profileData.profilePicture = result.secure_url;
    }

    const updatedProfile = { ...profile, ...profileData };

    await this._unitOfWork.profile.update(updatedProfile);

    return true;
  }

  async removeProfilePicture(profileId: string) {
    const profile = await this._unitOfWork.profile.findOneById(profileId);

    if (!profile) throw new Error("Profile does not exist");

    await this._cloudManager.deleteImage(profileId);

    profile.profilePicture = "";

    await this._unitOfWork.profile.update(profile);

    return true;
  }
}

export default ProfileService;
