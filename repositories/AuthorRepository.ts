import { Repository } from "../libs/Repository";
import { Author } from "../models/Author";

export class AuthorRepository extends Repository {
  // Récupère tous les auteurs
  async findAll(): Promise<Author[]> {
    const query = {
      name: "fetch-all-author",
      text: `SELECT * FROM author`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `Book`
      const data = result.rows.map((row) => {
        return new Author(row.id, row.first_name, row.last_name);
      });

      // [3] Retourne une promesse d'un tableau de `Author`
      return data;
    } catch (error) {
      return [];
    }
  }
}
