import { injectable } from "inversify";
import User from "./user.entity";
import AlreadyExistsException from "../../exceptions/AlreadyExistsException";
import { CreateUserInput } from "./user.schema";
import UnitOfWork from "../../unitOfWork";
import Hash from "../../utils/hash";
import Mailer from "../../utils/mailer";
import EmailVerificationTemplate from "../../emailTemplates/EmailVerificationTemplate";
import { TimeConverter } from "../../utils/timeConverter";
import Jwt from "../../utils/jwt";

@injectable()
class UserService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _hash: Hash,
    private readonly _mailer: Mailer,
    private readonly _emailVerificationTemplate: EmailVerificationTemplate,
    private readonly _timeConverter: TimeConverter,
    private readonly _jwt: Jwt,
  ) {}

  async create(userInput: CreateUserInput): Promise<{ id: string }> {
    const userWithEmail = await this._unitOfWork.user.findOneByEmail(userInput.email);
    if (userWithEmail) throw new AlreadyExistsException("A user with that email already exists");
    const hashedPassword = await this._hash.slowHash(userInput.password);
    const newUser = await this._unitOfWork.user.create({ ...userInput, password: hashedPassword });

    const verificationTokenExpireMs = this._timeConverter.toMs(24, "hour");

    const verificationToken = this._jwt.signJwt(
      { id: newUser.id },
      "EMAIL_VERIFICATION_TOKEN_SECRET",
      this._timeConverter.toSeconds(verificationTokenExpireMs, "milisecond"),
    );

    await this._unitOfWork.verificationToken.create({
      token: this._hash.fastHash(verificationToken),
      expires_at: verificationTokenExpireMs + Date.now(),
    });

    await this._mailer.send(
      this._emailVerificationTemplate.setup(newUser.email, verificationToken),
    );

    return { id: newUser.id! };
  }

  async update(user: Partial<User>) {
    await this._unitOfWork.user.update(user);
    return true;
  }

  async delete(id: string) {
    await this._unitOfWork.user.deleteById(id);
    return true;
  }
}

export default UserService;
