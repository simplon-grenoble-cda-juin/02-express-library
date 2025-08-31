import { Router } from "express";
import globalRouter from "./globals";
import bookRouter from "./books";

const router = Router();

router.use(globalRouter);
router.use('/books', bookRouter);

export default router;
