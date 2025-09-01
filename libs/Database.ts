import { Pool } from "pg";
import dotenv from "dotenv";

export class Database {
  private static pool: Pool;

  // Méthode static pour récupérer la connexion à la base de données
  static getPool(): Pool {
    if (!Database.pool) {
        
      // Exploite le fichier d'environnement avec `.dotenv`
      dotenv.config();

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
