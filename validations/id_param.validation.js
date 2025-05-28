import Joi from "joi";

export const idParamSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});
