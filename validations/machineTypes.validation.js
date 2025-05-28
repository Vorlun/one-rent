import Joi from "joi";

export const createMachineTypeSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().allow("", null),
});

export const updateMachineTypeSchema = Joi.object({
  name: Joi.string().max(50),
  description: Joi.string().allow("", null),
});
