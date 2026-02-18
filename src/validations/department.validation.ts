import Joi from "joi";

export const departmentSchema = Joi.object({
  name: Joi.string().required().min(1).max(100),
  description: Joi.string().optional(),
  departmentImageUrl: Joi.string().optional(),
  departmentPublicId: Joi.string().optional(),
});

export const updateDepartmentSchema = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().allow("").optional(),
  departmentImageUrl: Joi.string().optional(),
  departmentPublicId: Joi.string().optional(),
});
