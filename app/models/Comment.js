var mongoose = require('mongoose');
var Business = require('./Business');
var User = require('./User');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var CommentSchema = new Schema({
  content:String,
  rate:Number,
  utile:Number,
  drole:Number,
  cool:Number,
  businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business'},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
    commentImage:[ { uri:String } ],
    
  created_at: Date
});


CommentSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);