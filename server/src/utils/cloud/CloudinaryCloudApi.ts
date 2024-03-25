import { injectable } from "inversify";
import { config } from "../../config";
import CloudApi from "./CloudApi";
import { v2 as cloudinary } from "cloudinary";

@injectable()
class CloudinaryCloudApi extends CloudApi {
  private _cloudinary: typeof cloudinary;
  private readonly _uploadPreset: string;

  constructor() {
    super();
    this._cloudinary = cloudinary;
    this._uploadPreset = "devlinks";

    this._cloudinary.config({
      cloud_name: config.cloudinary.CLOUDINARY_CLOUD_NAME,
      api_key: config.cloudinary.CLOUDINARY_API_KEY,
      api_secret: config.cloudinary.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async uploadImage(dataUrl: string, name: string): Promise<{ secure_url: string }> {
    const result = await this._cloudinary.uploader.upload(dataUrl, {
      resource_type: "image",
      upload_preset: this._uploadPreset,
      filename_override: name,
      unique_filename: false,
      use_filename: true,
      overwrite: true,
      public_id: name,
    });
    return {
      secure_url: result.secure_url,
    };
  }

  async deleteImage(id: string): Promise<boolean> {
    await this._cloudinary.uploader.destroy(this._uploadPreset + "/" + id);
    return true;
  }
}

export default CloudinaryCloudApi;
