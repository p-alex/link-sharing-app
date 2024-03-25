import { injectable } from "inversify";
import CloudApi from "./CloudApi";
import CloudinaryCloudApi from "./CloudinaryCloudApi";

@injectable()
class CloudManager extends CloudApi {
  constructor(private readonly _cloudApi: CloudinaryCloudApi) {
    super();
    this._cloudApi = _cloudApi;
  }

  async uploadImage(imageDataUrl: string, imageName: string): Promise<{ secure_url: string }> {
    const result = await this._cloudApi.uploadImage(imageDataUrl, imageName);
    return result;
  }
  async deleteImage(profileId: string): Promise<boolean> {
    const result = await this._cloudApi.deleteImage(profileId);
    return result;
  }
}

export default CloudManager;
