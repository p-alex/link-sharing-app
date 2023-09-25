import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./modules/user/user.entity";
import { config } from "./config";
import Session from "./modules/session/session.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Session],
  migrations: [],
  subscribers: [],
});