import bcrypt from "bcryptjs";
import md5 from "md5";
import { config } from "../config";
import { injectable } from "inversify";

@injectable()
class Hash {
  fastHash(string: string) {
    return md5(string);
  }
  async slowHash(string: string) {
    return await bcrypt.hash(string, config.PASSWORD_SALT_ROUNDS);
  }
  async verifySlowHash(string: string, hash: string) {
    return await bcrypt.compare(string, hash);
  }
}

export default Hash;
