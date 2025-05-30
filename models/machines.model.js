import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { Users } from "./users.model.js";
import { MachineTypes } from "./machineTypes.model.js";

export const Machines = sequelize.define(
  "Machines",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    price_per_hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    min_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    daily_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "maintenance"),
      allowNull: false,
      defaultValue: "active",
    },
    awailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MachineTypes,
        key: "id",
      },
    },
  },
  {
    tableName: "machines",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);