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
        name: {
            type: "varchar"
        }
    }
})