import { Repository } from "../libs/Repository";
import { Category, CategoryTypeRow } from "../models/Category";

export class CategoryRepository extends Repository {
  // Récupère toutes les catégories
  findAll = async (): Promise<Category[]> => {
    const query = {
      name: "fetch-all-category",
      text: `SELECT * FROM category ORDER BY name`,
    };

    const result = await this.pool.query<CategoryTypeRow>(query);
    const categories = result.rows.map((row) => Category.fromRow(row));

    return categories;
  };
}
