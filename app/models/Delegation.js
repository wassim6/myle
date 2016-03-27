var mongoose = require('mongoose');

var Schema = mongoose.Schema; // allows us to create a constructor for our model

var DelegationSchema = new mongoose.Schema({
    name: {type:String,index: true},
    postCode:{type:Number,index: true}
});

module.exports = mongoose.model('Delegation', DelegationSchema);


