import Joi from "joi";

export const createMachineSchema = Joi.object({
  owner_id: Joi.number().integer().required(),
  type: Joi.number().integer().required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().allow(null, ""),
  location: Joi.string().max(255).allow(null, ""),
  image_url: Joi.string().uri().allow(null, ""),
  status: Joi.string().valid("active", "inactive", "maintenance"),
  price_per_hour: Joi.number().positive().required(),
  min_price: Joi.number().positive().allow(null),
  daily_price: Joi.number().positive().allow(null),
  awailable: Joi.boolean(),
});

export const updateMachineSchema = Joi.object({
  owner_id: Joi.number().integer(),
  type: Joi.number().integer(),
  name: Joi.string().max(100),
  description: Joi.string().allow(null, ""),
  location: Joi.string().max(255).allow(null, ""),
  image_url: Joi.string().uri().allow(null, ""),
  status: Joi.string().valid("active", "inactive", "maintenance"),
  price_per_hour: Joi.number().positive(),
  min_price: Joi.number().positive().allow(null),
  daily_price: Joi.number().positive().allow(null),
  awailable: Joi.boolean(),
});
