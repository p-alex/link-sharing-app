import { injectable } from "inversify";
import crypto from "crypto";

@injectable()
class RandomIdentifier {
  createUUID() {
    return crypto.randomUUID();
  }
}

export default RandomIdentifier;
