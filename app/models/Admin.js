var mongoose = require('mongoose');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var AdminSchema = new Schema({
  firstName: {type:String, index:true, unique:true, required:true},
  lastName: {type:String, required:true}    
});


AdminSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);