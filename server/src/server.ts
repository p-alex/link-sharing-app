import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./di-container";
import { config } from "./config";
import { Database } from "./database";
import cookieParser from "cookie-parser";
import { exceptionHandler } from "./middleware/exceptionHandler";

export interface CustomRequest<
  TParams = undefined,
  TResBody = undefined,
  TReqBody = undefined,
  TQuery = undefined,
> extends Request<TParams, TResBody, TReqBody, TQuery> {
  user: { id: string; email: string };
}

import "./modules/user/user.controller";
import "./modules/auth/auth.controller";
import "./modules/session/session.controller";

class Server {
  setup() {
    const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });

    server.setErrorConfig((app) => {
      app.use(exceptionHandler);
    });

    server.setConfig((app) => {
      app.use(helmet());
      app.use(
        cors({
          credentials: true,
          origin:
            config.NODE_ENV === "development"
              ? ["http://localhost:5173", "http://localhost:4173"]
              : [""],
        }),
      );
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
