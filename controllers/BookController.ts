import z from "zod";
import { Controller } from "../libs/Controller";
import { bookSchema } from "../libs/validation/bookSchema";
import { AuthorRepository } from "../repositories/AuthorRepository";
import { BookRepository } from "../repositories/BookRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { PublisherRepository } from "../repositories/PublisherRepository";
import { Book } from "../models/Book";

export class BookController extends Controller {
  // Route GET `/books` - liste des livres
  public async browseBooks() {
    const repository = new BookRepository();
    repository.findAll();

    this.response.render("pages/books/browse.ejs", {
      books: [],
    });
  }

  // Route GET `/books/:id` - détail d'un livre
  public async readBook() {
    this.response.render("pages/books/read.ejs", {
      book: null,
    });
  }

  // Route GET `/books/create` - formulaire de création d'un livre
  public async createBook() {
    const authorRepository = new AuthorRepository();
    const categoryRepository = new CategoryRepository();
    const publisherRepository = new PublisherRepository();

    const authors = await authorRepository.findAll();
    const categories = await categoryRepository.findAll();
    const publishers = await publisherRepository.findAll();

    this.response.render("pages/books/form.ejs", {
      type: "create",
      values: {},
      authors: authors,
      publishers: publishers,
      categories: categories,
      formErrors: {},
      submitError: false,
    });
  }

  // Route POST `/books/create` - soumission du formulaire de création d'un livre
  public async createBookSubmission() {
    // [1] Récupérer les données reçues via le formulaire
    const formData = {
      title: this.request.body?.title,
      author_id: this.request.body?.author_id,
      publisher_id: this.request.body?.publisher_id,
      category_id: this.request.body?.category_id,
      publication_year: this.request.body?.publication_year,
    };

    // [2] Valider les données
    const validationResult = bookSchema.safeParse(formData);

    // [2] Si les données sont invalides, on affiche le formulaire avec ses erreurs
    if (!validationResult.success) {
      const errors = z.treeifyError(validationResult.error);

      const authorRepository = new AuthorRepository();
      const categoryRepository = new CategoryRepository();
      const publisherRepository = new PublisherRepository();

      const authors = await authorRepository.findAll();
      const categories = await categoryRepository.findAll();
      const publishers = await publisherRepository.findAll();

      return this.response.render("pages/books/form.ejs", {
        type: "create",
        values: this.request.body,
        authors: authors,
        publishers: publishers,
        categories: categories,
        formErrors: errors.properties,
        submitError: false,
      });
    }

    // [3] Les données sont valides, on créer l'objet `Book` pour l'enregistrement
    const newBook = new Book(
      null,
      this.request.body.title,
      this.request.body.author_id,
      this.request.body.publisher_id,
      this.request.body.category_id,
      this.request.body.publication_year
    );

    // [3] On soumet les données à la base de données
    const bookRepository = new BookRepository();
    const result = await bookRepository.create(newBook);

    // [3] Si l'enregistrement n'a pas fonctionné, on affiche le formulaire avec une erreur de soumission
    if (!result) {
      const authorRepository = new AuthorRepository();
      const categoryRepository = new CategoryRepository();
      const publisherRepository = new PublisherRepository();

      const authors = await authorRepository.findAll();
      const categories = await categoryRepository.findAll();
      const publishers = await publisherRepository.findAll();

      return this.response.render("pages/books/form.ejs", {
        type: "create",
        values: this.request.body,
        authors: authors,
        publishers: publishers,
        categories: categories,
        formErrors: {},
        submitError: true,
      });
    }

    // Ici, les données ont étaient validées et l'enregistrement s'est déroulé avec succès,
    // alors on redirige l'utilisateur vers la liste des livres
    return this.response.redirect(303, `/books`);
  }

  // Route GET `/books/edit/:id` - formulaire d'édition d'un livre
  public async editBook() {
    this.response.render("pages/books/form.ejs", {
      type: "edit",
      values: {},
      authors: [],
      publishers: [],
      categories: [],
      formErrors: {},
      submitError: false,
    });
  }

  // Route POST `/books/edit/:id` - soumission du formulaire d'édition d'un livre
  public async editBookSubmission() {
    return this.response.redirect(303, `/books`);
  }

  // Route POST `/books/delete/:id` - demande de suppression d'un livre
  public async deleteBook() {
    return this.response.redirect(303, `/books`);
  }
}
