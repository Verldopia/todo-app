import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema ({
    name: "Task",
    tableName: "tasks",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        done: {
            type: "varchar"
        }
    }
});