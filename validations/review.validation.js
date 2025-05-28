import Joi from "joi";

export const createReviewSchema = Joi.object({
  customer_id: Joi.number().integer().required(),
  machine_id: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow("", null),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string().allow("", null),
});
