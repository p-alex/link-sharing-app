import express from "express";
import cors from "cors";
import helmet from "helmet";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./di-container";
import { config } from "./config";
import { Database } from "./database";

import "./modules/user/user.controller";

class Server {
  setup() {
    const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });
    server.setConfig((app) => {
      app.use(
        cors({
          credentials: true,
          origin:
            config.NODE_ENV === "development"
              ? ["http://localhost:5173", "http://localhost:4173"]
              : [""],
        }),
      );
      app.use(helmet());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
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
