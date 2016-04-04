//var mongoose = require('../config/db.js');

var mongoose = require('mongoose');

var ChallengeSchema = mongoose.Schema({
    title: String,
    decription: String,
    address: String,
    picture: String,
    user: String
});




module.exports = mongoose.model('Challenge', ChallengeSchema);

