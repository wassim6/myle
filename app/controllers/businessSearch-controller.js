var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Gouvernera = require('../models/Gouvernera');
var Delegation = require('../models/Delegation');
var Business = require('../models/Business');
var Schema = mongoose.Schema; // allows us to create a constructor for our model



function search(request, response){
    /*console.log("cc");
    console.log(request.body);
    response.json('cc');
    return;*/
    if(request.body.a.type==1){
        Business.find({tag: request.body.t._id, gouvernera:request.body.a._id }, function(error, business)
        {
            response.json(business);
            response.end();
        });
    }
    else{
        Business.find({delegation:request.body.a._id, tag: request.body.t} , function(error, business){
            response.json(business);
            response.end();
        });
    }
};

module.exports = {
    search:search
};