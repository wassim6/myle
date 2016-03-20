var mongoose = require('mongoose');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var TagSchema = new Schema({
  name: {type:String, index:true, unique:true},
  created_at: Date
});


TagSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Tag', TagSchema);