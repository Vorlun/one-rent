import { Reviews } from "../models/review.model.js";
import { Users } from "../models/users.model.js";
import { Machines } from "../models/machines.model.js"; 
import { MachineTypes } from "../models/machineTypes.model.js";

const findById = async (id) => {
  return await Reviews.findByPk(id, {
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
    const newReview = await Reviews.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
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

    const { count, rows } = await Reviews.findAndCountAll({
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
    const review = await findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.update(req.body);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.destroy();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
