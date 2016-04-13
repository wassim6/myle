var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Restaurant = require('../models/Restaurant');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

//retourner tout les restaurant
function getAll(request, response){
    Restaurant.find({},function(error, restaurants) {
            if (error) console.error('Could not retrieve Restaurants b/c:', error);
           response.json(restaurants);
        });
};



module.exports = {
    getAll:getAll
};