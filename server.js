const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require("./models");
const nodemailer = require('nodemailer');
const {
    userName,
    scoreData
} = require("./models");
const mailGun = require('nodemailer-mailgun-transport');



const PORT = process.env.PORT;
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.post('/post', (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        score: req.body.score,
    };

    userName.create(userData)
        .then(() => {
            res
                .redirect('/');
        })
        .catch((err) => {
            console.log(err);

            res.end();
        });

    const output = `
    <style>      
    body {
        background-color: #f6f6f6;
        width: 100%; 
    }
    h1 {
        color : green;
    }
    </style>
    <h1> Hello ${req.body.name} !!</h1>
    <h2>You Scored ${req.body.score} in previous game</h2>
    <h2>Where your Personal best is ${req.body.bestScore} </h2>
    `;

    const auth = {
        auth: {
            api_key: process.env.API_KEY,
            domain: process.env.DOMAIN
        },

    };
    const transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
        from: {
            name: 'Match Toon',
            address: 'noreply@memory-game-vivek.com'
        },
        to: {
            name: req.body.name,
            address: req.body.email
        },
        subject: 'Your Score',
        text: `Hi ${req.body.name}, You have a new score: ${req.body.score}`,
        html: output,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('MESSAGE SEND!!!');
        }
    });

});

app.get('/user', (req, res) => {
    userName.findAll({
            limit: 5,
            order: [
                ['score', 'ASC']
            ]
        }).then((user) => {
            res
                .json(user);
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