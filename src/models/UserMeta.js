import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema ({
    name: "UserMeta",
    tableName: "user_meta",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        address: {
            type: "varchar"
        },
        zipCode: {
            type: "varchar"
        },
        city: {
            type: "varchar"
        }
    }
})