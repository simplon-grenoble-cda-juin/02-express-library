import { Controller } from "../libs/Controller";

export class BookController extends Controller {
  public browseBooks() {
    this.response.render("pages/books.ejs", {
      books: [],
      flash: []
    });
  }

  public readBook() {
    this.response.render("pages/book.ejs", {});
  }

  public createBook() {
    this.response.render("pages/bookCreate.ejs", {
      values: {},
      errors: {},
    });
  }

  public addBook() {}
}
