const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    //email: process.env.USER_EMAIL,
    //password: process.env.USER_PASSWORD,
}