import z from "zod";
import { IsActive, Role } from "./user.interface";

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
export const updateUSerZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string" })
    .min(2, { message: "Name is short minimum 2 character long" })
    .max(50, { message: "Name too long" })
    .optional(),

  email: z.string().email().optional(),
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
    })
    .optional(),
  phone: z.string().min(11),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
});
