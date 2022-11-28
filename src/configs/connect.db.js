const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
// config development
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        dialect: 'mysql',
        dialectOptions: {},
    },
);

// config build docker
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     dialect: 'mysql',
//     host: process.env.DB_HOST,
//     operatorAlias: false,
//     logging: false,
//     pool: {
//         max: 5,
//         idle: 30000,
//         acquire: 60000,
//     },
// });

module.exports = { sequelize };
