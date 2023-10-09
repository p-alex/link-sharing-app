import { injectable } from "inversify";

export const CODE_LENGTH = 7;

@injectable()
class CodeGenerator {
  generate() {
    const string = "1234567890";
    let result = "";
    for (let i = 0; i < CODE_LENGTH; i++) {
      result += Math.floor(Math.random() * string.length);
    }
    return result;
  }
}

export default CodeGenerator;
