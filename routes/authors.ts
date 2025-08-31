import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";

const authorRouter = Router();

// BROWSE
authorRouter.get("/", (request, response) => {
  const controller = new AuthorController(request, response);
  controller.browseAuthors();
});

// READ
authorRouter.get("/:id", (request, response) => {
  const controller = new AuthorController(request, response);
  controller.readAuthor();
});

export default authorRouter;
