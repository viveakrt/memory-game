const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require("./models");
const PORT = process.env.PORT;
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));



db.sequelize
    .sync()
    .then((req) => {
        app.listen(PORT, () => {
            console.log(`PORT is ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });