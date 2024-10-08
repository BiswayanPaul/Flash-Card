import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email Required" }),
  password: z.string().min(1, { message: "Password required" }),
  code: z.optional(z.string()),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email Required" }),
});
export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email Required" }),
  password: z.string().min(6, { message: "Min 6 characters required" }),
  name: z.string().min(1, {
    message: "Name Required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Min 6 characters required" }),
});

export const CardInputSchema = z.object({
  title: z.string().min(1, {
    message: "Title Required",
  }),
  definition: z.string(),
  userId: z.string(),
});
