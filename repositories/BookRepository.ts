import { Repository } from "../libs/Repository";
import { Book } from "../models/Book";
import {
  BookBrowseView,
  BookBrowseViewTypeRow,
} from "../models/views/BookBrowseView";
import {
  BookReadView,
  BookReadViewTypeRow,
} from "../models/views/BookReadView";

export class BookRepository extends Repository {
  // Récupère tous les livres
  findAll = async (): Promise<Book[]> => {
    const query = {
      name: "fetch-all-book",
      text: `
      SELECT 
        book.id, book.title, book.publication_year,
        author.id as author_id, author.first_name as author_first_name, author.last_name as author_last_name,
        category.id as category_id, category.name as category_name
      FROM book
        JOIN book_author ON book_author.book_id = book.id
        JOIN author ON author.id = book_author.author_id
        JOIN category ON category.id = book.category_id
      ORDER BY publication_year DESC
      `,
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query<BookBrowseViewTypeRow>(query);

      // [2] Transforme les données brutes en objets `Book`
      const books = result.rows.map((row) => BookBrowseView.fromRow(row));

      // [3] Retourne une promesse d'un tableau de `Book`
      return books;
    } catch (error) {
      console.log(error);
    }

    // Si une erreur se produit, retourne une promesse d'un tableau vide
    return [];
  };

  // Récupère un livre via son ID
  findById = async (id: number): Promise<Book | null> => {
    // Requête préparée avec `$1` qui héritera de la valeur du paramètre `id`
    const query = {
      name: "fetch-book-by-id",
      text: `
      SELECT 
        book.id, book.title, book.publication_year,
        author.id as author_id, author.first_name as author_first_name, author.last_name as author_last_name,
        category.id as category_id, category.name as category_name,
        publisher.id as publisher_id, publisher.name as publisher_name
      FROM book
        JOIN book_author ON book_author.book_id = book.id
        JOIN author ON author.id = book_author.author_id
        JOIN category ON category.id = book.category_id
        JOIN publisher ON publisher.id = book.publisher_id 
      WHERE book.id = $1
      `,
      values: [id],
    };

    try {
      // [1] Soumission de la requête à la base de données
      const result = await this.pool.query<BookReadViewTypeRow>(query);

      if (result.rows[0]) {
        // [2] Transforme les données brutes en un objet `Book`
        const book = BookReadView.fromRow(result.rows[0]);

        // [3] Si un livre avec l'ID demandé a été récupéré, retourne une promesse d'un `Book`
        return book;
      } else {
        // [3] Si aucun livre ne correspond à l'ID demandé, retourne une promesse sans résultat
        return null;
      }
    } catch (error) {
      console.log(error);
    }

    // Si la requête a rencontrée une erreur, retourne une promesse sans résultat
    return null;
  };

  // Insert un nouveau livre
  create = async (book: Book): Promise<Book | null> => {
    // Requête préparée pour créer le livre
    const bookQuery = {
      name: "create-book",
      text: `
      INSERT INTO book (title, publisher_id, category_id, publication_year)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      values: [
        book.getTitle(),
        book.getPublisherId(),
        book.getCategoryId(),
        book.getPublicationYear(),
      ],
    };

    // [1] Création du livre
    try {
      // [2] Soumission de la requête à la base de données
      const resultCreateBook = await this.pool.query<{ id: number }>(bookQuery);

      // [3] Si la création du livre s'est déroulée avec succès,
      //     continue avec la création de la relation entre un livre et un auteur
      try {
        // Requête préparée pour créer la relation entre un livre et un auteur
        const bookAuthorQuery = {
          name: "create-author-book",
          text: `
            INSERT INTO book_author (book_id, author_id)
            VALUES ($1, $2)
          `,
          values: [resultCreateBook.rows[0].id, book.getAuthorId()],
        };

        // [4] Soumission de la requête à la base de données
        await this.pool.query(bookAuthorQuery);

        // [5] Si la création de la relation s'est déroulée avec succès,
        //     retourne une promesse du livre fourni en paramètre pour dire "OK"
        return book;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    // Si la création a rencontrée une erreur, retourne une promesse sans résultat
    return null;
  };

  // Met à jour un livre
  edit = async (book: Book): Promise<Book | null> => {
    // Requête préparée pour éditer le livre
    const bookQuery = {
      name: "edit-book",
      text: `
      UPDATE book
      SET
        title = $2,
        publisher_id = $3,
        category_id = $4,
        publication_year = $5
      WHERE id = $1
      `,
      values: [
        book.getId(),
        book.getTitle(),
        book.getPublisherId(),
        book.getCategoryId(),
        book.getPublicationYear(),
      ],
    };

    // Requête préparée pour éditer la relation entre un auteur et un livre
    const bookAuthorQuery = {
      name: "edit-author-book",
      text: `
      UPDATE book_author
      SET
        book_id = $1,
        author_id = $2
      WHERE book_id = $1
      `,
      values: [book.getId(), book.getAuthorId()],
    };

    // [1] Mise à jour du livre
    try {
      // [2] Soumission de la requête à la base de données
      const result = await this.pool.query(bookQuery);

      if (result.rowCount && result.rowCount > 0) {
        // [3] Si la mise à jour du livre s'est déroulée avec succès,
        //      continue avec la mise à jour de la relation entre un livr et un auteur

        try {
          // [4] Soumission de la requête à la base de données
          await this.pool.query(bookAuthorQuery);

          // [5] Si la mise à jour de la relation s'est déroulée avec succès,
          //     retourne une promesse du livre fourni en paramètre pour dire "OK"
          return book;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    // Si la mise à jour a rencontrée une erreur, retourne une promesse sans résultat
    return null;
  };

  // Supprime un livre
  delete = async (id: number): Promise<number | null> => {
    // Requête préparée pour supprimer la relation entre un livre et un auteur
    const bookAuthorQuery = {
      name: "delete-author-book",
      text: `
      DELETE FROM book_author
      WHERE book_id = $1
      `,
      values: [id],
    };

    // Requête préparée pour supprimer le livre
    const bookQuery = {
      name: "delete-book",
      text: `
      DELETE FROM book
      WHERE id = $1
      `,
      values: [id],
    };

    // [1] Suppression de la relation entre un livre et un auteur
    try {
      // [2] Soumission de la requête à la base de données
      await this.pool.query(bookAuthorQuery);

      // [3] Si la suppression de la reation s'est déroulée avec succès,
      //     continue avec la suppression du livre
      try {
        // [4] Soumission de la requête à la base de données
        await this.pool.query(bookQuery);

        // [5] Si la suppression du livre s'est déroulée avec succès,
        //     retourne une promesse de l'ID fourni en paramètre pour dire "OK"
        return id;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }

    // Si la suppression a rencontrée une erreur, retourne une promesse sans résultat
    return null;
  };
}
