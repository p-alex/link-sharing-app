import { injectable } from "inversify";

export type CloudImageFormat = "webp" | "jpg" | "jpeg" | "png";

@injectable()
abstract class CloudApi {
  abstract uploadImage(dataUrl: string, name: string): Promise<{ secure_url: string }>;
  abstract deleteImage(id: string): Promise<boolean>;
}

export default CloudApi;
