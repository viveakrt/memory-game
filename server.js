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
    <h3> Hello ${req.body.name} !!</h3>
    <h2>You Scored ${req.body.score} </h2>
    `;

    const auth = {
        auth: {
            api_key: 'pubkey-dbe29dd0ca136e57a6a9c9d7b445afef',
            domain: 'sandboxc71f9084ef894708bdee6c61c0a41487.mailgun.org'
        }
    };
    const transporter = nodemailer.createTransport(mailGun(auth));

    const mailOptions = {
        from: 'noreply@memory-game-vivek.com',
        to: req.body.email,
        subject: 'Your Score in Match Toon ',
        text: `Hi ${req.body.name}, You have a new score: ${req.body.score}`,
        html: output,
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if(err){
            console.log('Error While sending Mail');
        }else{
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