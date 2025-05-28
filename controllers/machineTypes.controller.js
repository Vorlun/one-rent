import { MachineTypes } from "../models/machineTypes.model.js";

const findById = async (id) => {
  return await MachineTypes.findByPk(id);
};

export const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newMachineType = await MachineTypes.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Machine type created successfully",
      data: newMachineType,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Machine type name must be unique",
      });
    }
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await MachineTypes.findAndCountAll({
      order: [["id", "ASC"]],
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
    const { id } = req.params;

    const machineType = await findById(id);
    if (!machineType) {
      return res.status(404).json({
        success: false,
        message: "Machine type not found",
      });
    }

    res.status(200).json({
      success: true,
      data: machineType,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const machineType = await findById(id);
    if (!machineType) {
      return res.status(404).json({
        success: false,
        message: "Machine type not found",
      });
    }

    await machineType.update({
      name: name ?? machineType.name,
      description: description ?? machineType.description,
    });

    res.status(200).json({
      success: true,
      message: "Machine type updated successfully",
      data: machineType,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Machine type name must be unique",
      });
    }
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const machineType = await findById(id);
    if (!machineType) {
      return res.status(404).json({
        success: false,
        message: "Machine type not found",
      });
    }

    await machineType.destroy();

    res.status(200).json({
      success: true,
      message: "Machine type deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
