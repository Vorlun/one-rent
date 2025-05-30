// models/machine_contract.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const MachinesContract = sequelize.define(
  "MachinesContract",
  {
    machine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "machine_contract",
    timestamps: false,
    freezeTableName: true,
  }
);
