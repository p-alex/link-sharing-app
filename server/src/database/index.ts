import { DataSource, EntityManager } from "typeorm";
import { injectable } from "inversify";
import { AppDataSource } from "../data-source";

@injectable()
export class Database {
  private readonly _datasource: DataSource;
  readonly client: DataSource;
  readonly manager: EntityManager;
  constructor() {
    this._datasource = AppDataSource;
    this.client = this._datasource;
    this.manager = this.client.manager;
  }
  async initialize() {
    return await this._datasource.initialize();
  }
}
