var mongoose = require('mongoose');
var User = require('./User');
var Comment = require('./Comment');

var Schema = mongoose.Schema;

var ReportedCommentSchema = new Schema({
    
  commentId:{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type:Number,
    
  created_at: Date
});


ReportedCommentSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('ReportedComment', ReportedCommentSchema);

