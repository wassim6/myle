//var mongoose = require('../config/db.js');

var mongoose = require('mongoose');


var HotelSchema = mongoose.Schema({
    title: String,
    decription: String,
    address: String,
    picture: String
});




module.exports = mongoose.model('Hotel', HotelSchema);

