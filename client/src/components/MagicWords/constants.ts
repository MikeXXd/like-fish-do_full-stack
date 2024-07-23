import { z } from "zod";
import { IMPORTANCE } from "../../constants";

export const magicWordSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must have at least 1 characters" })
    .max(128, { message: "Title must have at most 128 characters" }),
  note: z
    .string()
    .max(254, { message: "Description must have at most 254 characters" }),
  importance: z.union([z.enum(IMPORTANCE), z.null()]).nullable()
});

export type MagicWordFormData = z.infer<typeof magicWordSchema>;
