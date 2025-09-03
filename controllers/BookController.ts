import { Controller } from "../libs/Controller";
import { AuthorRepository } from "../repositories/AuthorRepository";
import { BookRepository } from "../repositories/BookRepository";

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
    const authorRepository = new AuthorRepository()
    const authors = await authorRepository.findAll()

    this.response.render("pages/books/form.ejs", {
      type: "create",
      values: {},
      authors: authors,
      publishers: [],
      categories: [],
      formErrors: {},
      submitError: false,
    });
  }

  // Route POST `/books/create` - soumission du formulaire de création d'un livre
  public async createBookSubmission() {
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
