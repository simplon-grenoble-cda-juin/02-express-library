import { Repository } from "../libs/Repository";
import { Author, AuthorTypeRow } from "../models/Author";
import {
  AuthorBrowseView,
  AuthorBrowseViewTypeRow,
} from "../models/views/AuthorBrowseView";
import {
  AuthorReadView,
  AuthorReadViewTypeRow,
} from "../models/views/AuthorReadView";

export class AuthorRepository extends Repository {
  // Récupère tous les auteurs
  findAll = async (): Promise<Author[]> => {
    const query = {
      name: "fetch-all-author",
      text: `
        SELECT 
          id, first_name, last_name,
          count(book_author) as book_count 
        FROM author
          JOIN book_author ON book_author.author_id = id
        GROUP BY id
        `,
    };

    const result = await this.pool.query<AuthorBrowseViewTypeRow>(query);
    const authors = result.rows.map((row) => AuthorBrowseView.fromRow(row));

    return authors;
  };

  // Récupère un auteur via son ID
  findById = async (id: number): Promise<Author | null> => {
    // Requête préparée avec `$1` qui héritera de la valeur du paramètre `id`
    const query = {
      name: "fetch-author-",
      text: `
        SELECT 
          id, first_name, last_name,
          count(book_author) as book_count 
        FROM author
          JOIN book_author ON book_author.author_id = id
        WHERE id = $1
        GROUP BY id
      `,
      values: [id],
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query<AuthorReadViewTypeRow>(query);

      if (result.rows[0]) {
        // [2] Transforme les données brutes en un objet `Author`
        const book = AuthorReadView.fromRow(result.rows[0]);

        // [3] Si un auteur avec l'ID demandé a été récupéré, retourne une promesse d'un `Author`
        return book;
      } else {
        // [3] Si aucun auteur ne correspond à l'ID demandé, retourne une promesse sans résultat
        return null;
      }
    } catch (error) {
      console.log(error);
    }

    // Si la requête a rencontrée une erreur, retourne une promesse sans résultat
    return null;
  };
}
