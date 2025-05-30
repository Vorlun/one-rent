import { Machines } from "./machine.model.js";
import { Contracts } from "./contract.model.js";
import { MachinesContract } from "./machine_contract.model.js";
import { MachineTypes } from "./machineTypes.model.js";
import { Payments } from "./payment.model.js";
import { Reviews } from "./review.model.js";
import { Users } from "./users.model.js";

Machines.belongsToMany(Contracts, {
  through: MachinesContract,
  foreignKey: "machine_id",
  otherKey: "contract_id",
  as: "contracts",
});

Contracts.belongsToMany(Machines, {
  through: MachinesContract,
  foreignKey: "contract_id",
  otherKey: "machine_id",
  as: "machines",
});

Contracts.belongsTo(Users, {
  foreignKey: "customer_id",
  as: "customer", // Qo‘shish tavsiya etiladi
});
Users.hasMany(Contracts, {
  foreignKey: "customer_id",
  as: "contracts",
});

MachineTypes.hasMany(Machines, {
  foreignKey: "type",
  as: "machines",
});
Machines.belongsTo(MachineTypes, {
  foreignKey: "type",
  as: "machine_type",
});

Machines.belongsTo(Users, {
  foreignKey: "owner_id",
  as: "owner", // KERAKLI
});
Users.hasMany(Machines, {
  foreignKey: "owner_id",
  as: "machines", // optional
});

Payments.belongsTo(Contracts, {
  foreignKey: "contract_id",
  as: "contract",
});
Contracts.hasMany(Payments, {
  foreignKey: "contract_id",
  as: "payments",
});

Reviews.belongsTo(Machines, {
  foreignKey: "machine_id",
  as: "machine",
});
Reviews.belongsTo(Users, {
  foreignKey: "customer_id",
  as: "customer",
});

MachineTypes.hasMany(Reviews, {
  foreignKey: "type", // agar `type` foreignKey bo‘lsa
  as: "reviews",
});
Users.hasMany(Reviews, {
  foreignKey: "customer_id",
  as: "reviews",
});
