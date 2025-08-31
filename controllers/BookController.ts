import z from "zod";
import { Controller } from "../libs/Controller";
import { bookSchema } from "../libs/validation/bookSchema";
import { Book } from "../models/Book";
import { BookRepository } from "../repositories/BookRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { PublisherRepository } from "../repositories/PublisherRepository";
import { Request, Response } from "express";
import { Flash, FlashEnum } from "../middlewares/flash";
import { AuthorRepository } from "../repositories/AuthorRepository";

export class BookController extends Controller {
  private bookRepository: BookRepository; // Répertoire très utilisé dans le contrôleur

  constructor(request: Request, response: Response) {
    super(request, response); // Requis par la classe `Controller` parente

    this.bookRepository = new BookRepository();
  }

  // Route GET `/books` - liste des livres
  public async browseBooks() {
    const books = await this.bookRepository.findAll();

    this.response.render("pages/books/browse.ejs", {
      books,
    });
  }

  // Route GET `/books/:id` - détail d'un livre
  public async readBook() {
    const requestedBookId = this.request.params.id;

    const book = await this.bookRepository.findById(parseInt(requestedBookId));

    this.response.render("pages/books/read.ejs", {
      book,
    });
  }

  // Route GET `/books/create` - formulaire de création d'un livre
  public async createBook() {
    const authorRepository = new AuthorRepository();
    const publisherRepository = new PublisherRepository();
    const categoryRepisotiry = new CategoryRepository();

    const authors = await authorRepository.findAll();
    const publishers = await publisherRepository.findAll();
    const categories = await categoryRepisotiry.findAll();

    this.response.render("pages/books/form.ejs", {
      type: "create",
      values: {},
      authors,
      publishers,
      categories,
      formErrors: {},
      submitError: false,
    });
  }

  // Route POST `/books/create` - soumission du formulaire de création d'un livre
  public async createBookSubmission() {
    const authorRepository = new AuthorRepository();
    const publisherRepository = new PublisherRepository();
    const categoryRepository = new CategoryRepository();

    // [1] Récupérer les données reçues via le formulaire
    const formData = {
      title: this.request.body?.title,
      author_id: this.request.body?.author_id,
      publisher_id: this.request.body?.publisher_id,
      category_id: this.request.body?.category_id,
      publication_year: this.request.body?.publication_year,
    };

    // [2] Valider les données
    const validation = bookSchema.safeParse(formData);

    // [2] Si les données sont invalides, on affiche le formulaire avec ses erreurs
    if (!validation.success) {
      const errors = z.treeifyError(validation.error);

      const authors = await authorRepository.findAll();
      const publishers = await publisherRepository.findAll();
      const categories = await categoryRepository.findAll();

      return this.response.status(400).render("pages/books/form.ejs", {
        type: "create",
        values: formData,
        authors,
        publishers,
        categories,
        formErrors: errors.properties,
        submitError: false,
      });
    }

    // [3] Les données sont valides, on créer l'objet `Book` pour l'enregistrement
    const newBook = new Book(
      null, // ID inconnu car non enregistré dans la base de données pour l'instant
      formData.title,
      formData.author_id,
      formData.publisher_id,
      formData.category_id,
      formData.publication_year
    );

    // [3] On soumet les données à la base de données
    const book = await this.bookRepository.create(newBook);

    // [3] Si l'enregistrement n'a pas fonctionné, on affiche le formulaire avec une erreur de soumission
    if (!book) {
      const authors = await authorRepository.findAll();
      const publishers = await publisherRepository.findAll();
      const categories = await categoryRepository.findAll();

      return this.response.status(400).render("pages/books/form.ejs", {
        type: "create",
        values: formData,
        authors,
        publishers,
        categories,
        formErrors: {},
        submitError: true,
      });
    }

    const flash: Flash = {
      type: FlashEnum.SUCCESS,
      message: "Livre créé avec succès",
    };

    // Ici, les données ont étaient validées et l'enregistrement s'est déroulé avec succès,
    // alors on redirige l'utilisateur vers la liste des livres
    return this.response.redirect(303, `/books?${this.addFlash(flash)}`);
  }

  // Route GET `/books/edit/:id` - formulaire d'édition d'un livre
  public async editBook() {
    const editedBookId = this.request.params.id;
    const book = await this.bookRepository.findById(parseInt(editedBookId));

    const authorRepository = new AuthorRepository();
    const publisherRepository = new PublisherRepository();
    const categoryRepisotiry = new CategoryRepository();

    const authors = await authorRepository.findAll();
    const publishers = await publisherRepository.findAll();
    const categories = await categoryRepisotiry.findAll();

    this.response.render("pages/books/form.ejs", {
      type: "edit",
      values: book?.toJSON(),
      authors,
      publishers,
      categories,
      formErrors: {},
      submitError: false,
    });
  }

  // Route POST `/books/edit/:id` - soumission du formulaire d'édition d'un livre
  public async editBookSubmission() {
    const editedBookId = this.request.params.id;

    const authorRepository = new AuthorRepository();
    const publisherRepository = new PublisherRepository();
    const categoryRepository = new CategoryRepository();

    // [1] Récupérer les données reçues via le formulaire
    const formData = {
      title: this.request.body?.title,
      author_id: this.request.body?.author_id,
      publisher_id: this.request.body?.publisher_id,
      category_id: this.request.body?.category_id,
      publication_year: this.request.body?.publication_year,
    };

    // [2] Valider les données
    const validation = bookSchema.safeParse(formData);

    // [2] Si les données sont invalides, on affiche le formulaire avec ses erreurs
    if (!validation.success) {
      const errors = z.treeifyError(validation.error);

      const authors = await authorRepository.findAll();
      const publishers = await publisherRepository.findAll();
      const categories = await categoryRepository.findAll();

      return this.response.status(400).render("pages/books/form.ejs", {
        type: "edit",
        values: formData,
        authors,
        publishers,
        categories,
        formErrors: errors.properties,
        submitError: false,
      });
    }

    // [3] Les données sont valides, on créer l'objet `Book` pour l'enregistrement
    const editedBook = new Book(
      parseInt(editedBookId), // ID du livre édité récupéré dans les paramètres de l'URL
      formData.title,
      formData.author_id,
      formData.publisher_id,
      formData.category_id,
      formData.publication_year
    );

    // [3] On soumet les données à la base de données
    const book = await this.bookRepository.edit(editedBook);

    // [3] Si la mise à jour n'a pas fonctionnée, on affiche le formulaire avec une erreur de soumission
    if (!book) {
      const authors = await authorRepository.findAll();
      const publishers = await publisherRepository.findAll();
      const categories = await categoryRepository.findAll();

      return this.response.status(400).render("pages/books/form.ejs", {
        type: "edit",
        values: formData,
        authors,
        publishers,
        categories,
        formErrors: {},
        submitError: true,
      });
    }

    const flash: Flash = {
      type: FlashEnum.SUCCESS,
      message: "Livre édité avec succès",
    };

    // Ici, les données ont étaient validées et la mise à jour s'est déroulée avec succès,
    // alors on redirige l'utilisateur vers la liste des livres
    return this.response.redirect(303, `/books?${this.addFlash(flash)}`);
  }

  // Route POST `/books/delete/:id` - demande de suppression d'un livre
  public async deleteBook() {
    const editedBookId = this.request.params.id;

    const result = await this.bookRepository.delete(parseInt(editedBookId));

    if (!result) {
      const flash: Flash = {
        type: FlashEnum.ERROR,
        message: "Impossible de supprimer le livre",
      };

      return this.response.redirect(
        303,
        `/books/${editedBookId}?${this.addFlash(flash)}`
      );
    }

    const flash: Flash = {
      type: FlashEnum.SUCCESS,
      message: "Livre supprimé avec succès",
    };

    return this.response.redirect(303, `/books?${this.addFlash(flash)}`);
  }
}
