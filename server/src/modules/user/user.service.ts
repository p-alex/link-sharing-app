import { injectable } from "inversify";
import User from "./user.entity";
import AlreadyExistsException from "../../exceptions/AlreadyExistsException";
import { CreateUserInput } from "./user.schema";
import UnitOfWork from "../../unitOfWork";
import Hash from "../../utils/hash";

@injectable()
class UserService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _hash: Hash,
  ) {}

  async create(userInput: CreateUserInput): Promise<{ id: string }> {
    const userWithEmail = await this._unitOfWork.user.findByEmail(userInput.email);
    if (userWithEmail) throw new AlreadyExistsException("A user with that email already exists");
    const hashedPassword = await this._hash.slowHash(userInput.password);
    const newUser = await this._unitOfWork.user.create({ ...userInput, password: hashedPassword });
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
