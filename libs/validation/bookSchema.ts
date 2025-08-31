import { z } from "zod";

const currentYear = new Date().getFullYear();

export const bookSchema = z.object({
  title: z
    .string()
    .min(3, "Titre trop court (minimum 3 caractères)")
    .max(50, "Titre trop long (maximum 50 caractères)"),

  author_id: z.coerce.number().int().min(1, "L'auteur est requis"),

  publisher_id: z.coerce.number().int().min(1, "L'éditeur est requis"),

  category_id: z.coerce.number().int().min(1, "Une catégorie est requise"),

  publication_year: z.coerce
    .number({ error: "Année invalide" })
    .int()
    .min(1980, "Nous ne traitons pas les livres publiés avant 1980")
    .max(currentYear, "Nous ne traitons pas les publications futures"),
});

export type BookInput = z.infer<typeof bookSchema>;
