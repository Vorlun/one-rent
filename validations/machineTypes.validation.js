import Joi from "joi";

export const createMachineTypeSchema = Joi.object({
  type_name: Joi.string().max(50).required().messages({
    "string.empty": `"type_name" maydon bo'sh bo'lishi mumkin emas`,
    "string.max": `"type_name" 50 ta belgidan oshmasligi kerak`,
    "any.required": `"type_name" majburiy maydon`,
  }),
  // description modelda yo'q, agar kerak bo'lsa, qo'shish mumkin
});

export const updateMachineTypeSchema = Joi.object({
  type_name: Joi.string().max(50).messages({
    "string.max": `"type_name" 50 ta belgidan oshmasligi kerak`,
  }),
  // description modelda yo'q, agar kerak bo'lsa, qo'shish mumkin
});
