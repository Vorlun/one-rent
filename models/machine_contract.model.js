import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const MachinesContract = sequelize.define(
  "MachinesContract",
  {
    machine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "machines", // kichik harf bilan (jadval nomi)
        key: "id",
      },
      primaryKey: true,
    },
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "contracts", // kichik harf bilan
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    tableName: "machine_contract",
    timestamps: false,
    freezeTableName: true,
  }
);
