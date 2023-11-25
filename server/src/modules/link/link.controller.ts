import { controller, httpDelete, httpGet, httpPut } from "inversify-express-utils";
import { CustomRequest } from "../../server";
import Link from "./link.entity";
import LinkService from "./link.service";
import { HttpResponse } from "../../utils/httpResponse";
import { Response } from "express";
import requireAuth from "../../middleware/requireAuth";
import { validateResource } from "../../middleware/validateResource";
import { deleteLinkSchema, saveLinksSchema } from "./link.schema";
import { lowRateLimit } from "../../middleware/rateLimiting";

@controller("/links")
class LinkController {
  constructor(private readonly _linkService: LinkService) {}

  @httpGet("/", lowRateLimit, requireAuth)
  async findAllUserLinks(req: CustomRequest, res: Response) {
    const links = await this._linkService.findAllUserLinks(req.user.id);
    return HttpResponse.success(res, { links }, 200);
  }

  @httpDelete("/", lowRateLimit, requireAuth, validateResource(deleteLinkSchema))
  async delete(req: CustomRequest<object, object, { link: Partial<Link> }>, res: Response) {
    await this._linkService.delete(req.body.link);
    return HttpResponse.success(res);
  }

  @httpPut("/", lowRateLimit, requireAuth, validateResource(saveLinksSchema))
  async saveAll(req: CustomRequest<object, object, { links: Partial<Link>[] }>, res: Response) {
    await this._linkService.saveMany(req.user.id, req.body.links);
    return HttpResponse.success(res);
  }
}

export default LinkController;
