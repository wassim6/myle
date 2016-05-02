var mongoose = require('mongoose');
var Gouvernera = require('./Gouvernera');
var Delegation = require('./Delegation');
var Business = require('./Business');
var bcrypt   = require('bcrypt-nodejs');
var crypto = require("crypto");
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  profileImage:{type:String, default:"default.png"},
  age:Number,
  score:Number,
  facebook:String,
  google:String,
  adresse:String,
  tel:String,
  codePostale:Number,
  gouvernera:{type: mongoose.Schema.Types.ObjectId, ref: 'Gouvernera'},
  delegation:{type: mongoose.Schema.Types.ObjectId, ref: 'Delegation'},
  
  searchedTag:[{name:String, created_at:{type:Date, default:new Date()} }],
  favorite:[ {businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business'}, created_at:{type:Date, default:new Date()}} ],
  searchedAddress:[ { name:String, type:Number, created_at:{type:Date, default:new Date()} } ],
  historyReservation:[ { businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business'} } ],    
  historyAppointment:[ { businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business'} } ],          
    
  created_at: Date,
    
    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});


UserSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.setPassword = function (password, cb) {

    if (!password) {
        return cb(new BadRequestError(options.missingPasswordError));
    }

    var self = this;

    crypto.randomBytes(options.saltlen, function(err, buf) {
        if (err) {
            return cb(err);
        }

        var salt = buf.toString('hex');

        crypto.pbkdf2(password, salt, options.iterations, options.keylen, function(err, hashRaw) {
            if (err) {
                return cb(err);
            }

            self.set(options.hashField, new Buffer(hashRaw, 'binary').toString('hex'));
            self.set(options.saltField, salt);

            cb(null, self);
        });
    });
};


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);

