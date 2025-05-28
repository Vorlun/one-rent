import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Machines = sequelize.define(
  "Machines",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MachineTypes",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING(255),
    },
    image_url: {
      type: DataTypes.STRING(500),
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "maintenance"),
      defaultValue: "active",
    },
    price_per_hour: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    min_price: {
      type: DataTypes.FLOAT,
    },
    daily_price: {
      type: DataTypes.FLOAT,
    },
    awailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);
