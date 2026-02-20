import z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password is required")
    .max(8, "password is required"),
});

export type loginSchema = z.infer<typeof LoginSchema>;

export const initialValues: loginSchema = {
  email: "",
  password: "",
};
