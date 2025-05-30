import { Machines } from "./machines.model.js";
import { MachinesContract } from "./machine_contract.model.js";
import { Users } from "./users.model.js";
import { MachineTypes } from "./machineTypes.model.js";
import { Reviews } from "./review.model.js";
import { Contracts } from "./contract.model.js";
import { Payments } from "./payment.model.js";

Users.hasMany(Contracts, {
  foreignKey: "customer_id",
  as: "contracts",
});
Contracts.belongsTo(Users, {
  foreignKey: "customer_id",
  as: "customer",
});

Users.hasMany(Machines, {
  foreignKey: "owner_id",
  as: "machines",
});
Machines.belongsTo(Users, {
  foreignKey: "owner_id",
  as: "owner",
});

MachineTypes.hasMany(Machines, {
  foreignKey: "type",
  as: "machines",
});
Machines.belongsTo(MachineTypes, {
  foreignKey: "type",
  as: "machine_type",
});

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

Users.hasMany(Reviews, {
  foreignKey: "customer_id",
  as: "reviews",
});
Reviews.belongsTo(Users, {
  foreignKey: "customer_id",
  as: "customer",
});

Machines.hasMany(Reviews, {
  foreignKey: "machine_id",
  as: "reviews",
});
Reviews.belongsTo(Machines, {
  foreignKey: "machine_id",
  as: "machine",
});

Contracts.hasMany(Payments, { foreignKey: 'contract_id' });
Payments.belongsTo(Contracts, { foreignKey: 'contract_id' });


export {
  Contracts,
  Machines,
  MachinesContract,
  Users,
  MachineTypes,
  Reviews,
  Payments,
};
