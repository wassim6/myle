var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({

    
    username: String,
    password: String,
    email: String,
    codePostale: String,



  firstName: String,
  lastName: String,
  profileImage:{type:String,default:"default.png"},
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
  historyAppointment:[ { businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business'} } ]
    
 

});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);