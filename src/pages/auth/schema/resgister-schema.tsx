import * as z from "zod";

// 1. Define your Zod validation schema
export const registerSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type T_RegisterSchema = z.infer<typeof registerSchema>;
