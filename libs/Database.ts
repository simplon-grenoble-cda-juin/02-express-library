import { Pool } from "pg";

export class Database {
  private static pool: Pool;

  static getPool(): Pool {
    if (!Database.pool) {
      Database.pool = new Pool({
        user: "kevin",
        password: "123",
        host: "localhost",
        port: 5433,
        database: "library",
      });
    }

    return Database.pool;
  }
}
