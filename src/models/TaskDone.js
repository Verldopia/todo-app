import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema ({
    name: "TaskDone",
    tableName: "tasks_done",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    }
})