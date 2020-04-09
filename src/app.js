const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/APIPlayer', { useUnifiedTopology: true , useNewUrlParser: true});
const Player = require('./models/playerModel');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Welcome to my test api");
})

const test = express.Router();

test.route('/test')
    .get((req, res) => {
    Player.find((err, data) => {
        if (err){
            return res.send(err);
        }
        else{
        console.log(data);
        return res.json(data);
        }
    })
})


app.use('/api', test);
app.listen(port, () => {
    console.log("Running at port: " + port);
})