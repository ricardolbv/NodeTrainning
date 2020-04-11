const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const db = mongoose.connect('mongodb://localhost/APIPlayer', { useUnifiedTopology: true , useNewUrlParser: true});
const port = process.env.PORT || 3000;
const Player = require('./models/playerModel');
const plrRoute = require('./routes/playerRoute')(Player);

app.use('/api', plrRoute);
app.get('/', (req, res) => {
    res.send("Welcome to my test api");
})


app.listen(port, () => {
    console.log("Running at port: " + port);
})