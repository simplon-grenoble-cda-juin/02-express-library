import { Router } from "express";
import globalRouter from "./globals";
import bookRouter from "./books";
import authorRouter from "./authors";

const router = Router();

router.use(globalRouter);
router.use('/books', bookRouter);
router.use('/authors', authorRouter);

export default router;
