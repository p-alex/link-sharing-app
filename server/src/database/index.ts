import { DataSource } from "typeorm";
import { injectable } from "inversify";
import { config } from "../config";

@injectable()
export class Database {
  private readonly _datasource: DataSource;
  readonly client: DataSource;
  constructor() {
    this._datasource = new DataSource({
      type: "postgres",
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
      synchronize: true,
      logging: false,
      entities: [],
      migrations: [],
      subscribers: [],
    });
    this.client = this._datasource;
  }
  async initialize() {
    await this._datasource.initialize();
  }
}
