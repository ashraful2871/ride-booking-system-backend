import z from "zod";

export const createUSerZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string" })
    .min(2, { message: "Name is short minimum 2 character long" })
    .max(50, { message: "Name too long" }),

  email: z.string().email(),
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});
