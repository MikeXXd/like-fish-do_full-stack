import { z } from "zod";

export const LS_USER_KEY = "likeFishDo_USER";
export const LS_AUTH = "likeFishDo_AUTH_TOKEN";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type LoginUser = Pick<User, "email" | "password">;

export type SignupUser = Omit<User, "id">;

// login
export const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Title must have at least 5 characters" })
    .max(255, { message: "Title must have at most 255 characters" }),
  password: z
    .string()
    .min(5, { message: "Password must have at least 5 characters" })
    .max(255, { message: "Password must have at most 255 characters" })
});

export type UserLoginFormData = z.infer<typeof userLoginSchema>;

// signup
export const userSignupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must have at least 3 characters" })
    .max(50, { message: "Name must have at most 255 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Title must have at least 5 characters" })
    .max(255, { message: "Title must have at most 255 characters" }),
  password: z
    .string()
    .min(5, { message: "Password must have at least 5 characters" })
    .max(255, { message: "Password must have at most 255 characters" })
});

export type UserSignupFormData = z.infer<typeof userSignupSchema>;
