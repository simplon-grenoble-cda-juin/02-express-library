import { Pool } from "pg";
import { Database } from "../libs/Database";

export abstract class Repository {
  protected pool: Pool;
  
  constructor() {
    this.pool = Database.getPool();
  }
}