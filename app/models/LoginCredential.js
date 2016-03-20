var mongoose = require('mongoose');
/*var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;*/
var sha1 = require('sha1');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var LoginCredentialSchema = new Schema({
  mail: {type:String, index:true, unique:true, required:true},
  pass: {type:String, required:true},
  blocked:{type:Boolean, required:true, default: false },
  active:{type:Boolean, required:true, default: true},
  role:String,
  connectionDate:[Date],    
  created_at: Date
});


LoginCredentialSchema.pre('save', function(next){
  this.created_at = new Date();
    var user = this;
    if (!user.isModified('pass')) return next();
    user.pass = sha1(user.pass);
    next();   
});

LoginCredentialSchema.methods.comparePassword = function(candidatePassword, cb) {
    if(sha1(candidatePassword)===this.pass)
        cb(null, true);
    else
        cb(null, false);

};

module.exports = mongoose.model('LoginCredential', LoginCredentialSchema);