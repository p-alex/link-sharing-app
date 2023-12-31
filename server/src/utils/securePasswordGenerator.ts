import { injectable } from "inversify";
import { config } from "../config";

@injectable()
class SecurePasswordGenerator {
  generate() {
    const length = config.SECURE_PASSWORD_GENERATOR_LENGTH;
    let password = "";
    const charList: string[] = config.SECURE_PASSWORD_CHARACTERS.split(",");
    for (let i = 0; i < length; i++) {
      if (i < charList.length) {
        password += charList[i].charAt(Math.floor(Math.random() * charList[i].length));
      } else {
        const RNG = Math.floor(Math.random() * charList.length);
        password += charList[RNG].charAt(Math.floor(Math.random() * charList[RNG].length));
      }
    }
    return password;
  }
}

export default SecurePasswordGenerator;
