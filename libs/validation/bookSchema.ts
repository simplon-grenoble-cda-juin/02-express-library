import z, { string } from "zod";

export const bookSchema = z.object({
  title: string().min(3, "Trop court").max(50, "Trop long"),
});
