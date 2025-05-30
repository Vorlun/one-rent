import { MachinesContract } from "../models/machine_contract.model.js";
import { Machines } from "../models/machines.model.js";
import { Contracts } from "../models/contract.model.js";
import { Users } from "../models/users.model.js";
import { MachineTypes } from "../models/machineTypes.model.js";

const findByIds = async (machine_id, contract_id) => {
  return await MachinesContract.findOne({
    where: { machine_id, contract_id },
    include: [
      {
        model: Contracts,
        attributes: ["id", "start_time", "end_time", "total_price", "status"],
        include: [
          {
            model: Users,
            as: "customer",
            attributes: ["id", "full_name", "email", "phone"],
          },
        ],
      },
      {
        model: Machines,
        attributes: ["id", "name", "location", "price_per_hour", "status"],
        include: [
          {
            model: Users,
            as: "owner",
            attributes: ["id", "full_name", "email", "phone"],
          },
          {
            model: MachineTypes,
            as: "machine_type",
            attributes: ["id", "type_name"],
          },
        ],
      },
    ],
  });
};

export const create = async (req, res, next) => {
  try {
    const newLink = await MachinesContract.create(req.body);
    res.status(201).json({
      success: true,
      message: "Machine linked to contract",
      data: newLink,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await MachinesContract.findAndCountAll({
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const { machine_id, contract_id } = req.params;
    const record = await findByIds(machine_id, contract_id);

    if (!record) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { machine_id, contract_id } = req.params;
    const record = await MachinesContract.findOne({
      where: { machine_id, contract_id },
    });

    if (!record) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await record.update(req.body);
    res.status(200).json({ success: true, message: "Updated", data: record });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { machine_id, contract_id } = req.params;
    const record = await MachinesContract.findOne({
      where: { machine_id, contract_id },
    });

    if (!record) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await record.destroy();
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    next(error);
  }
};
