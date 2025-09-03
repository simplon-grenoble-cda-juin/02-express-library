import dotenv from "dotenv";
import { Pool } from "pg";

export abstract class Database {
  protected static pool: Pool | undefined;

  static getPool(): Pool {
    dotenv.config();

    if (!Database.pool) {
      Database.pool = new Pool({
        host: process.env.PGHOST,
        port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 1234,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
      });
    }

    return Database.pool;
  }
}
