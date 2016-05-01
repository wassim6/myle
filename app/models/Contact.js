var mongoose = require('mongoose');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var ContactSchema = new Schema({
  to:String,
  subject:String,
  body:String
});


ContactSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Contact', ContactSchema);