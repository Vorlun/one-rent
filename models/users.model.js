import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Full name is required" },
        len: {
          args: [3, 100],
          msg: "Full name must be between 3 and 100 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: "unique_email",
        msg: "Email address already in use",
      },
      validate: {
        isEmail: { msg: "Email address must be valid" },
        notEmpty: { msg: "Email is required" },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: "Password length should be between 6 and 100 characters",
        },
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: {
        name: "unique_phone",
        msg: "Phone number already in use",
      },
      validate: {
        notEmpty: { msg: "Phone number is required" },
        is: {
          args: /^\+998\d{9}$/,
          msg: "Phone number must match +998XXXXXXXXX format",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "operator", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);
