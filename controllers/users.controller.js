import bcrypt from "bcrypt";
import { Users } from "../models/users.model.js";
import { Sequelize } from "sequelize";

const findById = async (id) => {
  return await Users.findByPk(id);
};

export const create = async (req, res, next) => {
  try {
    const { full_name, email, password, phone, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Email or phone already exists",
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

    const { count, rows } = await Users.findAndCountAll({
      attributes: { exclude: ["password"] },
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

    const user = await findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...userData } = user.toJSON();

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, email, password, phone, role } = req.body;

    const user = await findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedFields = {
      full_name: full_name ?? user.full_name,
      email: email ?? user.email,
      phone: phone ?? user.phone,
      role: role ?? user.role,
    };

    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedFields);

    const { password: pw, ...updatedUser } = user.toJSON();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Email or phone already exists",
      });
    }
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};




export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await Users.count();
    const roles = await Users.findAll({
      attributes: [
        "role",
        [Sequelize.fn("COUNT", Sequelize.col("role")), "count"],
      ],
      group: ["role"],
    });

    const latestUser = await Users.findOne({
      order: [["created_at", "DESC"]],
      attributes: { exclude: ["password"] },
    });

    const recentUsers = await Users.count({
      where: {
        created_at: {
          [Sequelize.Op.gte]: Sequelize.literal("NOW() - INTERVAL '7 DAY'"),
        },
      },
    });

    const domainStats = await Users.findAll({
      attributes: [
        [
          Sequelize.fn(
            "substring",
            Sequelize.col("email"),
            Sequelize.literal("position('@' in email) + 1")
          ),
          "domain",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      group: [
        Sequelize.literal("substring(email from position('@' in email) + 1)"),
      ],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        roles: roles.map((r) => ({ role: r.role, count: r.dataValues.count })),
        latestUser,
        recentUsers,
        topDomains: domainStats.map((d) => ({
          domain: d.dataValues.domain,
          count: d.dataValues.count,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
