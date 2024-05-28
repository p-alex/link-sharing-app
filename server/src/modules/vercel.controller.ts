import { controller, httpGet } from "inversify-express-utils";
import { CustomRequest } from "../server";
import { Response } from "express";

@controller("/")
class VercelController {
  @httpGet("/")
  getVercel(req: CustomRequest, res: Response) {
    return res.send("Express on Vercel");
  }
}

export default VercelController;
