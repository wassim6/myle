var mongoose = require('mongoose');

var Schema = mongoose.Schema; // allows us to create a constructor for our model

var DelegationSchema = new mongoose.Schema({
    name: {type:String,index: true, unique:true},
    postCode:{type:String,index: true}
});

module.exports = mongoose.model('Delegation', DelegationSchema);


