const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Items

const Coin = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
},
{
    collation: 'coins'
});

module.exports = mongoose.model('Coin',Coin);