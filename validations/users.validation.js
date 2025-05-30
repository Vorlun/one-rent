import Joi from "joi";

export const createUsersSchema = Joi.object({
  full_name: Joi.string().min(3).max(100).required().messages({
    "string.empty": `"full_name" maydon bo'sh bo'lmasligi kerak`,
    "string.min": `"full_name" kamida 3 ta belgidan iborat bo'lishi kerak`,
    "string.max": `"full_name" 100 ta belgidan oshmasligi kerak`,
  }),

  email: Joi.string().email().required().messages({
    "string.email": `"email" noto'g'ri formatda`,
    "any.required": `"email" majburiy maydon`,
  }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.min": `"password" kamida 6 ta belgidan iborat bo'lishi kerak`,
    "string.empty": `"password" bo'sh bo'lmasligi kerak`,
  }),

  phone: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": `"phone" +998XXXXXXXXX formatda bo'lishi kerak`,
      "any.required": `"phone" majburiy maydon`,
    }),

  role: Joi.string()
    .valid("admin", "manager", "operator", "user")
    .default("user")
    .messages({
      "any.only": `"role" faqat [admin, manager, operator, user] bo'lishi mumkin`,
    }),
});

export const updateUsersSchema = Joi.object({
  full_name: Joi.string().min(3).max(100).messages({
    "string.min": `"full_name" kamida 3 ta belgidan iborat bo'lishi kerak`,
    "string.max": `"full_name" 100 ta belgidan oshmasligi kerak`,
  }),

  email: Joi.string().email().messages({
    "string.email": `"email" noto'g'ri formatda`,
  }),

  password: Joi.string().min(6).max(100).messages({
    "string.min": `"password" kamida 6 ta belgidan iborat bo'lishi kerak`,
  }),

  phone: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .messages({
      "string.pattern.base": `"phone" +998XXXXXXXXX formatda bo'lishi kerak`,
    }),

  role: Joi.string().valid("admin", "manager", "operator", "user").messages({
    "any.only": `"role" faqat [admin, manager, operator, user] bo'lishi mumkin`,
  }),
});
