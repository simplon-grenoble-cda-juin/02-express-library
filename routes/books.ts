import { Router } from "express";
import { BookController } from "../controllers/BookController";

const bookRouter = Router();

bookRouter.get("/", (request, response) => {
  const controller = new BookController(request, response);
  controller.browseBooks();
});

bookRouter.get("/add", (request, response) => {
  const controller = new BookController(request, response);
  controller.createBook();
});

bookRouter.post("/", (request, response) => {
  const controller = new BookController(request, response);
  controller.addBook();
});

bookRouter.get("/:id", (request, response) => {
  const controller = new BookController(request, response);
  controller.readBook();
});

export default bookRouter;
