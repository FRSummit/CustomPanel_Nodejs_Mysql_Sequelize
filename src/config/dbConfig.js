// require("dotenv").config()

// module.exports = {
//     HOST: process.env.DB_HOST,
//     USER: process.env.DB_USE,
//     PASSWORD: process.env.DB_PASS,
//     DB: process.env.DB_NAME,
//     dialect: process.env.DB_DIALECT,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }

module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '6472',
    DB: 'c_panel',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}