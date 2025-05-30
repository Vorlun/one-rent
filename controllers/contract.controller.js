import { Contracts } from "../models/contract.model.js";
import { Machines } from "../models/machines.model.js";
import { MachineTypes } from "../models/machineTypes.model.js";
import { Users } from "../models/users.model.js";

const findById = async (id) => {
  return await Contracts.findByPk(id, {
    include: [
      {
        model: Users,
        as: "customer",
        attributes: ["id", "full_name", "email", "phone", "role"],
      },
      {
        model: Machines,
        as: "machines",
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
    const contract = await Contracts.create(req.body);
    res.status(201).json({
      success: true,
      message: "Contract created successfully",
      data: contract,
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

    const { count, rows } = await Contracts.findAndCountAll({
      order: [["created_at", "DESC"]],
      limit,
      offset,
      include: [
        {
          model: Users,
          as: "customer", 
          attributes: ["id", "full_name", "email", "phone", "role"],
        },
        {
          model: Machines,
          as: "machines", 
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
    const { id } = req.params;
    const contract = await findById(id);

    if (!contract) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data: contract });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.findByPk(id);
    if (!contract) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await contract.update(req.body);
    res.status(200).json({ success: true, message: "Updated", data: contract });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.findByPk(id);
    if (!contract) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await contract.destroy();
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    next(error);
  }
};
