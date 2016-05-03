var mongoose = require('mongoose');
var Gouvernera = require('./Gouvernera');
var Delegation = require('./Delegation');
var Tag = require('./Tag');
var User = require('./User');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

var BusinessSchema = new Schema({
  name: String,
  description: String,
  tel:String,
  fax:String,
  dateCreation:String,
  rate:{type:Number, default:0},
  nbrRate:{type:Number, default:0},
  totalPoint:{type:Number, default:0},
  longitude:String,
  latitude:String,
  adress:String,
  email:String,
  site:String,
  urlScrape:String,
  
  valid:{type:Boolean, default:true},    
  score:{type:Number, default:0},    
      
  gouvernera:{type: mongoose.Schema.Types.ObjectId, ref: 'Gouvernera'},
  delegation:{type: mongoose.Schema.Types.ObjectId, ref: 'Delegation'},
  tag:[{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    
    category:String,
    sousCategory:String,
    
    cnam:Boolean,
    appointment:Boolean,
    clim:Boolean,
    creditCard:Boolean,
    delivery:Boolean,
    reservation:Boolean,
    takeAway:Boolean,
    terrace:Boolean,
    ticketsRestau:Boolean,
    fauteuilRoulant:Boolean,
    budget:Number,
    budgetRange:Number,
    adapteEnfants:Boolean,
    adapteGroupe:Boolean,
    television:Boolean,
    chiensAutorises:Boolean,
    wifi:Boolean,
    alcool:Boolean,
    happyHour:Boolean,
    fumeur:Boolean,
    espaceNonFumeur:Boolean,
    
    serviceADomicile:Boolean,
    
  facebook:String,
  googleplus:String,    
  profileImage:{type:String, default:'default.png'},
  coverImage:{type:String, default:'cover.jpg'},
    
    claimed:{type:Boolean, default:false},
    
    
    
    openingTime:[ { dayNumber:Number, openingHour:Number, closingHour:Number, open:Number } ],
    businessImage:[ { uri:String, created_at:{ type:Date, daufault:new Date() } } ],
    appointments:[ { userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}, date:Date, heure:String, created_at:{ type:Date, daufault:new Date() }} ],
    reservations:[ { userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}, personNumber:Number,  date:Date,heure:String, created_at:{ type:Date, daufault:new Date() }} ],
   likes:[{userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'}}],
    
  created_at: Date
});

BusinessSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Business', BusinessSchema);

/*
One To Many
var OrderSchema = new mongoose.Schema({
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});

var ItemSchema = new mongoose.Schema({
    price: Number,
    quantity: Number
});*/

/*
Many to Many
var PackageSchema = new Schema({
    id: ObjectId,
    title: { type: String, required: true },
    flashcards: [ {type : mongoose.Schema.ObjectId, ref : 'Flashcard'} ]
});

var FlashcardSchema = new Schema({
    id: ObjectId,
    type: { type: String, default: '' },
    story: { type: String, default: '' },
    packages: [ {type : mongoose.Schema.ObjectId, ref : 'Package'} ]
});*/