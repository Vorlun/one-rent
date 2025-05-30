import { Machines } from "../models/machines.model.js";
import { Users } from "../models/users.model.js";
import { MachineTypes } from "../models/machineTypes.model.js";

export const create = async (req, res, next) => {
  try {
    // owner_id va type mavjudligini tekshirish
    const userExists = await Users.findByPk(req.body.owner_id);
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "Owner (user) with this owner_id does not exist.",
      });
    }

    const machineTypeExists = await MachineTypes.findByPk(req.body.type);
    if (!machineTypeExists) {
      return res.status(400).json({
        success: false,
        message: "Machine type with this id does not exist.",
      });
    }

    const machine = await Machines.create(req.body);

    res.status(201).json({
      success: true,
      message: "Machine created successfully",
      data: machine,
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

    const { count, rows } = await Machines.findAndCountAll({
      order: [["id", "DESC"]],
      limit,
      offset,
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

    const machine = await Machines.findByPk(id, {
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
    });

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    res.status(200).json({
      success: true,
      data: machine,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const machine = await Machines.findByPk(id);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    await machine.update(req.body);

    res.status(200).json({
      success: true,
      message: "Machine updated successfully",
      data: machine,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const machine = await Machines.findByPk(id);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    await machine.destroy();

    res.status(200).json({
      success: true,
      message: "Machine deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
