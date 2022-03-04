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
        }
    },
    relations: {
        tasks: {
            target: "Task",
            type: "many-to-many",
            cascade: true,
            joinTable: true,
        },
        categories: {
            target: "Category",
            type: "many-to-many",
            cascade: true,
            joinTable: true,
        }
    }
})