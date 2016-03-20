var mongoose = require('mongoose');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var MedicamentSchema = new Schema({
    
    codePct:String,
    nom:String,
    prixPublique:String,
    category:String,

  created_at: Date
});


MedicamentSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Medicament', MedicamentSchema);