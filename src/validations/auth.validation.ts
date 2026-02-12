import Joi from "joi";
import { UserRole } from "../models/User";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(8).required(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(8).required(),
});
