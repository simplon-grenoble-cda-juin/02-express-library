import { Pool } from "pg";

export abstract class Database {
  protected static pool: Pool | undefined;

  static getPool(): Pool {
    if (!Database.pool) {
      Database.pool = new Pool({
        host: "localhost",
        port: 5433,
        database: "library",
        user: "kevin",
        password: "123",
      });
    }

    return Database.pool;
  }
}
