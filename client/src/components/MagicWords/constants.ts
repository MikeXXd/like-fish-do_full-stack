import { z } from "zod";
import { IMPORTANCE } from "../../constants";

export const magicWordSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" })
    .max(255, { message: "Title must have at most 255 characters" }),

  note: z
    .string()
    .min(3, { message: "Description must have at least 3 characters" })
    .optional(),
  importance: z.union([z.enum(IMPORTANCE), z.null()]).nullable()
});

export type MagicWordFormData = z.infer<typeof magicWordSchema>;
