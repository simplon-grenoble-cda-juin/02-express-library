import { Controller } from "../libs/Controller";
import { AuthorRepository } from "../repositories/AuthorRepository";
import { Request, Response } from "express";

export class AuthorController extends Controller {
  private authorRepository: AuthorRepository; // Répertoire très utilisé dans le contrôleur

  constructor(request: Request, response: Response) {
    super(request, response); // Requis par la classe `Controller` parente

    this.authorRepository = new AuthorRepository();
  }

  // Route GET `/authors` - liste des auteurs
  public async browseAuthors() {
    const authors = await this.authorRepository.findAll();

    this.response.render("pages/authors/browse.ejs", {
      authors,
    });
  }

  // Route GET `/authors/:id` - détail d'un auteur
  public async readAuthor() {
    const requestedAuthorId = this.request.params.id;

    const author = await this.authorRepository.findById(
      parseInt(requestedAuthorId)
    );

    this.response.render("pages/authors/read.ejs", {
      author,
    });
  }
}
