import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./modules/user/user.entity";
import { config } from "./config";
import Session from "./modules/session/session.entity";
import VerificationToken from "./modules/verificationToken/verificationToken.entity";
import Link from "./modules/link/link.entity";
import Identity from "./modules/identity/identity.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Session, VerificationToken, Link, Identity],
  migrations: [],
  subscribers: [],
});
