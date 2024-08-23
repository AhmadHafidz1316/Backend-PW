require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    // port: process.env.PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    // port: process.env.PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    // port: process.env.PORT,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
};
