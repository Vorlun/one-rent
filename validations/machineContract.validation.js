import Joi from "joi";

export const createMachineContractSchema = Joi.object({
  machine_id: Joi.number().integer().required(),
  contract_id: Joi.number().integer().required(),
});

export const updateMachineContractSchema = Joi.object({
  machine_id: Joi.number().integer().optional(),
  contract_id: Joi.number().integer().optional(),
});
