import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema ({
    name: "Category",
    tableName: "categories",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        slug: {
            type: "varchar"
        }
    },
    relations: {
        tasks: {
            target: "Task",
            type: "one-to-many",
            cascade: true,
            inverseSide: "category"
        }
    }
})