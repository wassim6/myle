var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Gouvernera = require('../models/Gouvernera');
var Delegation = require('../models/Delegation');
var Schema = mongoose.Schema; // allows us to create a constructor for our model



function getAllGouvernera(request, response){
    Gouvernera.find({},function(error, gouverneras) {
            if (error) console.error('Could not retrieve gouverneras b/c:', error);
            response.json(gouverneras);
        });
};

function getAllDelegation(request, response){
    Delegation.find({},function(error, delegations) {
            if (error) console.error('Could not retrieve Delegation b/c:', error);
            response.json(delegations); 
    });
};

function getAllDelegationSansCodePostal(request, response){
    Delegation.find({},'_id name',function(error, delegations) {
            if (error) console.error('Could not retrieve Delegation b/c:', error);
            response.json(delegations); 
    }).limit(500);
};

function show(request, response){
    Gouvernera.find({'_id':request.params.id},function(error, gouvernera) {
            if (error) console.error('Could not retrieve gouvernera b/c:', error);
            response.json(gouvernera);
        });
};


function searchGouverneraAndDelegation(request, response){
    var res = request.query.q.replace(" ", "|");
    var xx=new RegExp(request.query.q, 'i');
    var re = new RegExp(res, 'i');
    Gouvernera.find({'name':{'$regex': re} },function(error, gouverneras) {
            if (error) console.error('Could not retrieve gouverneras b/c:', error);
            var gs=[];
            for(var i=0;i<gouverneras.length;i++){
                gs.push({ _id:gouverneras[i]._id, name:gouverneras[i].name, type:1 });  
            };
            //console.log(gs);
        
            Delegation.find({'name':{'$regex': xx} },function(error, delegations) {
            if (error) console.error('Could not retrieve delegations b/c:', error);
                for(var i=0;i<delegations.length;i++){
                    gs.push({ _id:delegations[i]._id, name:delegations[i].name, type:2 });  
                };
                
                //var newArray = gouverneras.concat(delegations);
                //console.log(newArray);
                response.json(gs);
            });
        
            
        });
};

module.exports = {
    getAllGouvernera:getAllGouvernera,
    show:show,
    searchGouverneraAndDelegation:searchGouverneraAndDelegation,
    getAllDelegation:getAllDelegation,
    getAllDelegationSansCodePostal:getAllDelegationSansCodePostal
};