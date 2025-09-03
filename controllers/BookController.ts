import { Controller } from "../libs/Controller";
import { BookRepository } from "../repositories/BookRepository";

export class BookController extends Controller {
  // Route GET `/books` - liste des livres
  public async browseBooks() {
    const bookRepository = new BookRepository();
    const books = await bookRepository.findAll();

    this.response.render("pages/books/browse.ejs", {
      books: [],
    });
  }

  // Route GET `/books/:id` - détail d'un livre
  public async readBook() {
    const researchedId = this.request.params.id;

    const repository = new BookRepository();
    const book = await repository.findById(researchedId);

    this.response.render("pages/books/read.ejs", {
      book: null,
    });
  }

  // Route GET `/books/create` - formulaire de création d'un livre
  public async createBook() {
    this.response.render("pages/books/form.ejs", {
      type: "create",
      values: {},
      authors: [],
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
