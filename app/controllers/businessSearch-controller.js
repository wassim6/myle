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
        }).populate("gouvernera").populate("delegation");
    }
    else{
        Business.find({delegation:request.body.a._id, tag: request.body.t} , function(error, business){
            response.json(business);
            response.end();
        }).populate("gouvernera").populate("delegation");
    }
};



function searchByLatLong(request, response){
    var userLat=request.body.lat;
    var userLon=request.body.lon;
    Business.find({tag: request.body.t._id}, function(error, business)
    {
        var bn=[];
        for(var i=0;i<business.length;i++){
            //e9leb ba3éd !
            //var d=getDistanceFromLatLonInKm(userLat, userLon, business[i].longitude, business[i].latitude);
            var d=getDistanceFromLatLonInKm(userLat, userLon, business[i].latitude, business[i].longitude);
            if(d<=10){
                bn.push(business[i]);
            }
        }
        response.json(bn);
        response.end();
    }).populate("gouvernera").populate("delegation");

};


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


module.exports = {
    search:search,
    searchByLatLong:searchByLatLong
};
