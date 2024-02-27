
module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
    console.log("🚀 ~ process.env.DB_PORT:", process.env.DB_PORT)
    console.log("🚀 ~ process.env.DB_NAME:", process.env.DB_NAME)
    console.log("🚀 ~ process.env.DB_PASSWORD:", process.env.DB_PASSWORD)
    console.log("🚀 ~ process.env.DB_USER:", process.env.DB_USER)
    console.log("🚀 ~ process.env.DB_HOST:", process.env.DB_HOST)
