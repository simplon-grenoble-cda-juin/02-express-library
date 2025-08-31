import Express from "express";
import router from "./routes";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { flashFromQuery } from "./middlewares/flash";

const app = Express();
const PORT = 3000;

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(Express.static(path.join(__dirname, "public")));

app.use(Express.urlencoded({ extended: true }));

app.use(flashFromQuery);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Le serveur a démarré sur le port ${PORT}`);
});
