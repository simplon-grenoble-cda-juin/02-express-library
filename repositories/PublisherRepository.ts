import { Repository } from "../libs/Repository";
import { Publisher } from "../models/Publisher";

export class PublisherRepository extends Repository {
  // Récupère toutes les maisons d'éditions
  async findAll(): Promise<Publisher[]> {
    const query = {
      name: "fetch-all-publisher",
      text: `SELECT * FROM publisher`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `Publisher`
      const data = result.rows.map((row) => {
        return new Publisher(row.id, row.name);
      });

      // [3] Retourne une promesse d'un tableau de `Publisher`
      return data;
    } catch (error) {
      return [];
    }
  }
}
