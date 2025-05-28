import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

export const MachineTypes = sequelize.define("MachineTypes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
},{
    freezeTableName:true,
    timestamps:false,
});
