var mongoose = require('mongoose');
var Business = require('./Business');
var Coupon = require('./Coupon');
var User = require('./User');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var CouponVenduSchema = new Schema({
    
    couponId:{type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    businessId:{type: mongoose.Schema.Types.ObjectId, ref: 'Business'},
    
  created_at: Date
});


CouponVenduSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('CouponVendu', CouponVenduSchema);