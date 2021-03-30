const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require("./models");
const {
	userName,scoreData
} = require("./models");

const PORT = process.env.PORT;
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.post('/post', (req,res)=>{
    const userData = {
        name : req.body.name,
        email : req.body.email,
        score : req.body.score,
    };

    userName.create(userData)
    .then((user) => {
        res
            .redirect('/');
    })
    .catch((err) => {
        console.log(err);

        res.end();
    });

});



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