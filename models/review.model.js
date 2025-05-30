import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { Users } from "./users.model.js"; // Users modelini import qilamiz
import { Machines } from "./machines.model.js"; // Machines modelini import qilamiz

export const Reviews = sequelize.define(
  "Reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users, // model obyekt sifatida beriladi
        key: "id",
      },
    },
    machine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Machines, // model obyekt sifatida beriladi
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "reviews", // jadval nomini aniq belgilash
    freezeTableName: true,
    underscored: true,
  }
);
