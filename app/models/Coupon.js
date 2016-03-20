var mongoose = require('mongoose');
var Business = require('./Business');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var CouponSchema = new Schema({
  startDate:Date,
  endDate:Date,
  title:String,
  prixInitial:Number,
  remise:Number,
  economie:Number,
  prix:Number,    
  image:String,
  description:String,
  condition:String,
  businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business'},
    
    couponImage:[ { uri:String } ],
    
  created_at: Date
});


CouponSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Coupon', CouponSchema);