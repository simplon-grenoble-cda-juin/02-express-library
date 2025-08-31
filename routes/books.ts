import { Router } from "express";
import { BookController } from "../controllers/BookController";

const bookRouter = Router();

// BROWSE
bookRouter.get("/", (request, response) => {
  const controller = new BookController(request, response);
  controller.browseBooks();
});

// EDIT
bookRouter.get("/edit/:id", (request, response) => {
  const controller = new BookController(request, response);
  controller.editBook();
});

bookRouter.post("/edit/:id", (request, response) => {
  const controller = new BookController(request, response);
  controller.editBookSubmission();
});

// ADD
bookRouter.get("/create", (request, response) => {
  const controller = new BookController(request, response);
  controller.createBook();
});

bookRouter.post("/create", (request, response) => {
  const controller = new BookController(request, response);
  controller.createBookSubmission();
});

// DELETE
bookRouter.get("/delete/:id", (request, response) => {
  const controller = new BookController(request, response);
  controller.deleteBook();
});

// READ
bookRouter.get("/:id", (request, response) => {
  const controller = new BookController(request, response);
  controller.readBook();
});

export default bookRouter;
