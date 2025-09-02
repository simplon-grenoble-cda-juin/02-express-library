import { Repository } from "../libs/Repository";
import { Book } from "../models/Book";

export class BookRepository extends Repository {
  // Récupère tous les livres
  async findAll(): Promise<Book[]> {
    const query = {
      name: "fetch-all-book",
      text: `SELECT * FROM book`,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query(query);

      // [2] Transforme les données brutes en objets `Book`
      const clearResult = result.rows.map((row) => {
        return new Book(
          row.id,
          row.title,
          row.publisher_id,
          row.category_id,
          row.publication_year
        );
      });

      // [3] Retourne une promesse d'un tableau de `Book`
      return clearResult;
    } catch (error) {
      return [];
    }
  }

  findById() {}
}
