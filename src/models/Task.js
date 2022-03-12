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
        title: {
            type: "varchar"
        },
        checked: {
            type: "boolean",
        },
    },
    relations: {
        categories: {
            target: "Category",
            type: "many-to-one",
            joinColumn: true,
            inverseSide: "tasks"
        },
    }
})