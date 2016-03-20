var mongoose = require('mongoose');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var RestaurantSchema = new Schema({
    titile: String,
    category:String,
    ville:String,
    addresse:String,
    telephone:String,
    
  created_at: Date
});


RestaurantSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);