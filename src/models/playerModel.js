const mongoose = require ('mongoose');

const {Schema} = mongoose;
const playerModel = new Schema ({
    Name: { type: String },
    Club: { type: String },
    League: { type: String },
    Overral: { type: Number }
})

module.exports = mongoose.model('Player', playerModel, 'Player');

