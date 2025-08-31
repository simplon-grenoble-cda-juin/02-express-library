import { Pool } from "pg";
import dotenv from "dotenv";

export class Database {
  private static pool: Pool;

  static getPool(): Pool {
    if (!Database.pool) {
      dotenv.config()

      Database.pool = new Pool({
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : undefined,
        database: process.env.PGDATABASE,
      });
    }

    return Database.pool;
  }
}
