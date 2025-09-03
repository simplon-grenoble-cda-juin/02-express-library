import { Repository } from "../libs/Repository";
import { Category } from "../models/Category";

export class CategoryRepository extends Repository {
  // Récupère toutes les catégories
  async findAll(): Promise<Category[]> {
    const query = {
      name: "fetch-all-category",
      text: `SELECT * FROM category`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `Category`
      const data = result.rows.map((row) => {
        return new Category(row.id, row.name);
      });

      // [3] Retourne une promesse d'un tableau de `Category`
      return data;
    } catch (error) {
      return [];
    }
  }
}
