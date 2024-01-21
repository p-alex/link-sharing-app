import bcrypt from "bcryptjs";
import { config } from "../config";
import { injectable } from "inversify";
import { createHash, createCipheriv, createDecipheriv, randomBytes } from "crypto";

@injectable()
class Cryptography {
  fastHash(string: string) {
    return createHash(config.FASTHASH_ALGORITHM).update(string).digest("hex");
  }
  async slowHash(string: string) {
    return await bcrypt.hash(string, config.PASSWORD_SALT_ROUNDS);
  }
  async verifySlowHash(string: string, hash: string) {
    return await bcrypt.compare(string, hash);
  }
  cipher(text: string, cipherKey: keyof typeof config.cipherKeys) {
    const key = config.cipherKeys[cipherKey];
    const iv = randomBytes(12).toString("hex");

    const algorithm = config.CIPHER_ALGORITHM;

    const cipher = createCipheriv(algorithm, key, iv);
    const ecryptedString =
      cipher.update(text.normalize("NFC"), "utf-8", "hex") + cipher.final("hex");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const authTag = cipher.getAuthTag().toString("hex");

    return [authTag, iv, ecryptedString].join(":");
  }
  decipher(cipherText: string, cipherKey: keyof typeof config.cipherKeys) {
    const key = config.cipherKeys[cipherKey];

    const [authTag, iv, encrypted] = cipherText.split(":");

    const algorithm = config.CIPHER_ALGORITHM;

    const decipher = createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    decipher.setAuthTag(Buffer.from(authTag, "hex"));

    const decryptedText = decipher.update(encrypted, "hex", "utf-8") + decipher.final("utf-8");

    return decryptedText;
  }
}

export default Cryptography;
