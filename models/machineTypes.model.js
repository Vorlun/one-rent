import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const MachineTypes = sequelize.define(
  "MachineTypes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "machine_types",
    timestamps: false,
    freezeTableName: true,
  }
);
