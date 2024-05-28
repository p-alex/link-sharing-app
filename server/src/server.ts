import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./di-container";
import { config } from "./config";
import { Database } from "./database";
import cookieParser from "cookie-parser";
import { exceptionHandler } from "./middleware/exceptionHandler";
import { IAccessTokenPayload } from "./utils/jwt";
import vercelRouter from "./modules/vercel.router";

export interface CustomRequest<
  TParams = undefined,
  TResBody = undefined,
  TReqBody = undefined,
  TQuery = undefined,
> extends Request<TParams, TResBody, TReqBody, TQuery> {
  user: IAccessTokenPayload;
}

import "./modules/user/user.controller";
import "./modules/auth/auth.controller";
import "./modules/session/session.controller";
import "./modules/link/link.controller";
import "./modules/profile/profile.controller";

//ping

class Server {
  setup() {
    const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });

    server.setErrorConfig((app) => {
      app.use(exceptionHandler);
    });

    server.setConfig((app) => {
      app.set("trust proxy", 1);
      app.use("/", vercelRouter);
      app.use(
        cors({
          credentials: true,
          origin: config.CLIENT_BASE_URL,
        }),
      );
      app.use(helmet());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cookieParser());
    });

    const app = server.build();

    const database = new Database();

    database
      .initialize()
      .then(() => {
        console.log("🛢  Database connected!");
        app.listen(config.PORT, () =>
          console.log(`🚀 Server listening at http://localhost:${config.PORT}`),
        );
      })
      .catch((error) => console.error(error));
  }
}

export default Server;
