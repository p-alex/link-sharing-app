import bcrypt from "bcryptjs";
import { config } from "../config";
import { injectable } from "inversify";
import { createHash } from "crypto";

@injectable()
class Hash {
  fastHash(string: string) {
    return createHash("sha256").update(string).digest("hex");
  }
  async slowHash(string: string) {
    return await bcrypt.hash(string, config.PASSWORD_SALT_ROUNDS);
  }
  async verifySlowHash(string: string, hash: string) {
    return await bcrypt.compare(string, hash);
  }
}

export default Hash;
