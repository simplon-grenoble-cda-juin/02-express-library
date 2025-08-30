import { Router } from "express";
import { GlobalsController } from "../controllers/GlobalsController";

const globalRouter = Router();

globalRouter.get("/", (request, response) => {
  const controller = new GlobalsController(request, response);
  controller.homepage();
});

export default globalRouter;
