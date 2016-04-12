var mongoose = require('mongoose');
var Business = require('./Business');
var User = require('./User');
var Account = require('./Account');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var CommentSchema = new Schema({
  content:String,
  rate:Number,
  utile:{type:Number, default:0},
  inutile:{type:Number, default:0},
  cool:{type:Number, default:0},
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