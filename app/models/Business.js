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
  dateCreation:String,
  rate:Number,
  longitude:String,
  latitude:String,
  adress:String,
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
    
  facebookPage:String,
  profileImage:String,
  coverImage:String,
    
    claimed:Boolean,
    
    openingTime:[ { dayNumber:Number, openingHour:String, closingHour:String } ],
    businessImage:[ { uri:String, created_at:{ type:Date, daufault:new Date() } } ],
    appointments:[ { userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}, date:Date, created_at:{ type:Date, daufault:new Date() }} ],
    reservations:[ { userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}, personNumber:Number,  date:Date, created_at:{ type:Date, daufault:new Date() }} ],
    
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