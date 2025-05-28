import Joi from "joi";

export const createContractSchema = Joi.object({
  customer_id: Joi.number().integer().required(),
  machine_id: Joi.number().integer().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().greater(Joi.ref("start_time")).required(),
  commission: Joi.number().min(0).required(),
  total_price: Joi.number().min(0).required(),
  total_hours: Joi.number().min(0).required(),
  status: Joi.string().valid("pending", "active", "completed", "cancelled"),
});

export const updateContractSchema = Joi.object({
  start_time: Joi.date(),
  end_time: Joi.date().greater(Joi.ref("start_time")),
  commission: Joi.number().min(0),
  total_price: Joi.number().min(0),
  total_hours: Joi.number().min(0),
  status: Joi.string().valid("pending", "active", "completed", "cancelled"),
});
