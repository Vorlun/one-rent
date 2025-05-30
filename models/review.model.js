import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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
        model: "Users",
        key: "id",
      },
    },
    machine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Machines",
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
  }
);



Reviews.associate = (models) => {
  Reviews.belongsTo(models.Machines, {
    foreignKey: "machine_id",
    as: "machine",
  });

  Reviews.belongsTo(models.Users, {
    foreignKey: "customer_id",
    as: "customer",
  });

  Reviews.belongsTo(models.MachineTypes, {
    foreignKey: "type",
    as: "machine_type", // optional
  });
};
