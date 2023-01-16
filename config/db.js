import Sequelize from "sequelize";

const createDB = new Sequelize("test-db", "user", "pass", {
    dialect:"sqlite",
    host: "./config/db.sqlite",
})

export default createDB