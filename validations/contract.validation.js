import Joi from "joi";

export const createContractSchema = Joi.object({
  customer_id: Joi.number().integer().required(),

  start_time: Joi.date().iso().required(),

  end_time: Joi.date().iso().greater(Joi.ref("start_time")).required(),

  commission: Joi.number().precision(2).min(0).default(0),

  total_price: Joi.number().precision(2).positive().required(),

  total_hours: Joi.number().precision(2).positive().required(),

  status: Joi.string()
    .valid("pending", "active", "completed", "cancelled")
    .default("pending"),
});

export const updateContractSchema = Joi.object({
  customer_id: Joi.number().integer(),

  start_time: Joi.date().iso(),

  end_time: Joi.date().iso().greater(Joi.ref("start_time")),

  commission: Joi.number().precision(2).min(0),

  total_price: Joi.number().precision(2).positive(),

  total_hours: Joi.number().precision(2).positive(),

  status: Joi.string().valid("pending", "active", "completed", "cancelled"),
});

