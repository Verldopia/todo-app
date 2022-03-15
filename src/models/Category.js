import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    slug: {
      type:"varchar"
    }
  },
  relations: {
    users: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      inverseSide: "categories",
    },
    tasks: {
      target: "Task",
      type: "one-to-many",
      cascade: true,
      inverseSide: "categories",
    },
  },
});