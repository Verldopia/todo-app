import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema ({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        lastName: {
            type: "varchar"
        }
    },
    relations: {
        user_meta: {
            target: "UserMeta",
            type: "one-to-one",
            cascade: true,
            joinColumn: true
        },
        tasks: {
            target: "Task",
            type: "many-to-many",
            cascade: true,
            joinTable: true,
        }
    }
})