import { injectable } from "inversify";
import UnitOfWork from "../../unitOfWork";
import Link from "./link.entity";

@injectable()
class LinkService {
  constructor(private readonly _unitOfWork: UnitOfWork) {}

  async findAllUserLinks(userId: string) {
    const result = await this._unitOfWork.link.findAllByUserId(userId);
    return result;
  }

  async delete(link: Partial<Link>) {
    const result = await this._unitOfWork.link.deleteById(link);
    return result;
  }

  async saveMany(userId: string, links: Partial<Link>[]) {
    const user = await this._unitOfWork.user.findOneById(userId);
    if (!user) throw new Error("User does not exist");
    const newLinks = links.map((link) => {
      link.user = user;
      return link;
    });
    const result = await this._unitOfWork.link.saveMany(newLinks);
    return result;
  }
}

export default LinkService;
