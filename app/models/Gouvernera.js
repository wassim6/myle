var mongoose = require('mongoose');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var GouverneraSchema = new Schema({
  name: {type:String,index: true, unique:true}
});


module.exports = mongoose.model('Gouvernera', GouverneraSchema);

