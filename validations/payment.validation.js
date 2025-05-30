import Joi from "joi";

export const createPaymentSchema = Joi.object({
  contract_id: Joi.number().integer().required(),
  amount: Joi.number().min(0).required(),
  method: Joi.string().valid("cash", "card", "bank_transfer").required(),
  paid_at: Joi.date().optional(),
});

export const updatePaymentSchema = Joi.object({
  amount: Joi.number().min(0).optional(),
  method: Joi.string().valid("cash", "card", "bank_transfer").optional(),
  paid_at: Joi.date().optional(),
});
