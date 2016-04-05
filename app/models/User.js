var mongoose = require('mongoose');
var Gouvernera = require('./Gouvernera');
var Delegation = require('./Delegation');
var Business = require('./Business');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  profileImage:String,
  age:Number,
  score:Number,
  facebook:Boolean,
  tel:String,
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

module.exports = mongoose.model('User', UserSchema);

