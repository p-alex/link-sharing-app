import { injectable } from "inversify";

export const CODE_LENGTH = 6;

@injectable()
class CodeGenerator {
  generate(length: number = CODE_LENGTH) {
    const string = "1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * string.length);
    }
    return result;
  }
}

export default CodeGenerator;
