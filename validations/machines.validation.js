import Joi from "joi";

export const createMachineSchema = Joi.object({
  owner_id: Joi.number().integer().required().messages({
    "number.base": `"owner_id" butun son bo'lishi kerak`,
    "any.required": `"owner_id" majburiy maydon`,
  }),
  type: Joi.number().integer().required().messages({
    "number.base": `"type" butun son bo'lishi kerak`,
    "any.required": `"type" majburiy maydon`,
  }),
  name: Joi.string().max(100).required().messages({
    "string.empty": `"name" bo'sh bo'lishi mumkin emas`,
    "string.max": `"name" 100 ta belgidan oshmasligi kerak`,
  }),
  description: Joi.string().allow(null, "").messages({
    "string.base": `"description" matn bo'lishi kerak`,
  }),
  location: Joi.string().max(255).allow(null, "").messages({
    "string.max": `"location" 255 ta belgidan oshmasligi kerak`,
  }),
  image_url: Joi.string().uri().allow(null, "").messages({
    "string.uri": `"image_url" to'g'ri URL formatida bo'lishi kerak`,
  }),
  status: Joi.string()
    .valid("active", "inactive", "maintenance")
    .default("active")
    .messages({
      "any.only": `"status" faqat 'active', 'inactive', yoki 'maintenance' bo'lishi mumkin`,
    }),
  price_per_hour: Joi.number().positive().required().messages({
    "number.base": `"price_per_hour" raqam bo'lishi kerak`,
    "number.positive": `"price_per_hour" musbat son bo'lishi kerak`,
    "any.required": `"price_per_hour" majburiy maydon`,
  }),
  min_price: Joi.number().positive().allow(null).messages({
    "number.positive": `"min_price" musbat son bo'lishi kerak`,
  }),
  daily_price: Joi.number().positive().allow(null).messages({
    "number.positive": `"daily_price" musbat son bo'lishi kerak`,
  }),
  awailable: Joi.boolean().default(true),
});

export const updateMachineSchema = Joi.object({
  owner_id: Joi.number().integer().messages({
    "number.base": `"owner_id" butun son bo'lishi kerak`,
  }),
  type: Joi.number().integer().messages({
    "number.base": `"type" butun son bo'lishi kerak`,
  }),
  name: Joi.string().max(100).messages({
    "string.max": `"name" 100 ta belgidan oshmasligi kerak`,
  }),
  description: Joi.string().allow(null, "").messages({
    "string.base": `"description" matn bo'lishi kerak`,
  }),
  location: Joi.string().max(255).allow(null, "").messages({
    "string.max": `"location" 255 ta belgidan oshmasligi kerak`,
  }),
  image_url: Joi.string().uri().allow(null, "").messages({
    "string.uri": `"image_url" to'g'ri URL formatida bo'lishi kerak`,
  }),
  status: Joi.string().valid("active", "inactive", "maintenance").messages({
    "any.only": `"status" faqat 'active', 'inactive', yoki 'maintenance' bo'lishi mumkin`,
  }),
  price_per_hour: Joi.number().positive().messages({
    "number.positive": `"price_per_hour" musbat son bo'lishi kerak`,
  }),
  min_price: Joi.number().positive().allow(null).messages({
    "number.positive": `"min_price" musbat son bo'lishi kerak`,
  }),
  daily_price: Joi.number().positive().allow(null).messages({
    "number.positive": `"daily_price" musbat son bo'lishi kerak`,
  }),
  awailable: Joi.boolean(),
});
