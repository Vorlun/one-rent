import sequelize from "../config/db.js";
import { Users } from "./users.model.js";
import { Machines } from "./machines.model.js";
import { MachineTypes } from "./machineTypes.model.js";
import { Contracts } from "./contract.model.js";
import { MachinesContract } from "./machine_contract.model.js";

// 1. Users ↔ Machines (one-to-many)
Users.hasMany(Machines, {
  foreignKey: "owner_id",
  as: "machines",
});
Machines.belongsTo(Users, {
  foreignKey: "owner_id",
  as: "owner",
});

// 2. MachineTypes ↔ Machines (one-to-many)
MachineTypes.hasMany(Machines, {
  foreignKey: "type",
  as: "machines",
});
Machines.belongsTo(MachineTypes, {
  foreignKey: "type",
  as: "machine_type",
});

// 3. Contracts ↔ Users (many-to-one)
Contracts.belongsTo(Users, {
  foreignKey: "customer_id",
  as: "customer",
});

// 4. Contracts ↔ Machines (many-to-many via MachinesContract)
Contracts.belongsToMany(Machines, {
  through: MachinesContract,
  foreignKey: "contract_id",
  otherKey: "machine_id",
  as: "machines",
});
Machines.belongsToMany(Contracts, {
  through: MachinesContract,
  foreignKey: "machine_id",
  otherKey: "contract_id",
  as: "contracts",
});

export {
  sequelize,
  Users,
  Machines,
  MachineTypes,
  Contracts,
  MachinesContract,
};
