import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Role",
  tableName: "roles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    users: {
      target: "User",
      type: "one-to-many",
      cascade: true,
      inverseSide: "roles",
    },
  },
});